const { randomUUID } = require('crypto')
const { GoogleGenAI } = require('@google/genai')

let cachedClient = null
let cachedKey = null

const ensureClient = (apiKey) => {
  const key = apiKey || process.env.GEMINI_API_KEY || process.env.GOOGLE_GEMINI_API_KEY

  if (!key) {
    throw new Error('Missing Gemini API key')
  }

  if (!cachedClient || cachedKey !== key) {
    cachedClient = new GoogleGenAI({ apiKey: key })
    cachedKey = key
  }

  return cachedClient
}

const convertMessages = (messages = []) => {
  const contents = []
  const systemTexts = []

  messages.forEach((message) => {
    if (!message?.content) {
      return
    }

    if (message.role === 'system') {
      systemTexts.push(message.content)
      return
    }

    contents.push({
      role: message.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: message.content }],
    })
  })

  const systemInstruction = systemTexts.length
    ? {
        role: 'system',
        parts: [{ text: systemTexts.join('\n') }],
      }
    : undefined

  return {
    contents,
    systemInstruction,
  }
}

async function chat({ messages, model = 'gemini-1.5-pro', apiKey }) {
  const client = ensureClient(apiKey)
  const { contents, systemInstruction } = convertMessages(messages)

  const request = {
    model,
    contents,
  }

  if (systemInstruction) {
    request.config = { systemInstruction }
  }

  const response = await client.models.generateContent(request)
  const text = response?.text ?? ''

  return {
    content: text,
    finishReason: response?.candidates?.[0]?.finishReason ?? null,
    usage: response?.usageMetadata ?? null,
    model,
    provider: 'gemini',
  }
}

async function* stream({ messages, model = 'gemini-1.5-pro', apiKey }) {
  const client = ensureClient(apiKey)
  const { contents, systemInstruction } = convertMessages(messages)

  const request = {
    model,
    contents,
  }

  if (systemInstruction) {
    request.config = { systemInstruction }
  }

  const stream = await client.models.generateContentStream(request)

  for await (const chunk of stream) {
    const text = chunk?.text ?? ''
    if (text) {
      yield { token: text }
    }
  }
}

async function embed({ input, model = 'text-embedding-004', apiKey }) {
  if (!input?.trim()) {
    throw new Error('Text input is required to create an embedding')
  }

  const client = ensureClient(apiKey)
  const response = await client.models.embedContent({
    model,
    contents: [input],
  })

  const vector = response?.embeddings?.[0]?.values

  if (!Array.isArray(vector) || !vector.length) {
    throw new Error('Gemini did not return an embedding vector')
  }

  return {
    id: `gemini-emb-${randomUUID()}`,
    provider: 'gemini',
    model,
    vector,
  }
}

module.exports = {
  chat,
  stream,
  embed,
}
