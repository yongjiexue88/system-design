const geminiService = require('./services/geminiService')

const PROVIDER_DEFAULTS = {
  gemini: 'gemini-1.5-pro',
}

const DEFAULT_MODEL = `gemini:${PROVIDER_DEFAULTS.gemini}`

const normalizePayload = (input, options = {}) => {
  if (typeof input === 'string') {
    return {
      prompt: input,
      ...options,
    }
  }

  return { ...input }
}

const buildMessages = ({ prompt, messages = [], systemPrompt }) => {
  if (messages.length) {
    return messages
  }

  const built = []

  if (systemPrompt) {
    built.push({ role: 'system', content: systemPrompt })
  }

  if (prompt) {
    built.push({ role: 'user', content: prompt })
  }

  return built
}

const parseModel = (modelInput) => {
  if (!modelInput) {
    return {
      provider: 'gemini',
      model: PROVIDER_DEFAULTS.gemini,
    }
  }

  const value = String(modelInput).trim()

  if (!value) {
    return {
      provider: 'gemini',
      model: PROVIDER_DEFAULTS.gemini,
    }
  }

  if (value.includes(':')) {
    const [provider, ...rest] = value.split(':')
    if (provider && provider !== 'gemini') {
      throw new Error(`Unsupported AI provider: ${provider}`)
    }

    const model = rest.join(':') || PROVIDER_DEFAULTS.gemini
    return {
      provider: 'gemini',
      model,
    }
  }

  return {
    provider: 'gemini',
    model: value,
  }
}

async function runAgent(input, options) {
  const payload = normalizePayload(input, options)
  const { provider, model } = parseModel(payload.model || DEFAULT_MODEL)
  const messages = buildMessages(payload)

  if (provider !== 'gemini') {
    throw new Error(`Unsupported AI provider: ${provider}`)
  }

  return geminiService.chat({
    messages,
    model,
    apiKey: payload.apiKey,
  })
}

async function streamAgent(input, options) {
  const payload = normalizePayload(input, options)
  const { provider, model } = parseModel(payload.model || DEFAULT_MODEL)
  const messages = buildMessages(payload)

  if (provider !== 'gemini') {
    throw new Error(`Unsupported AI provider: ${provider}`)
  }

  return geminiService.stream({
    messages,
    model,
    apiKey: payload.apiKey,
  })
}

async function createEmbedding(input, options = {}) {
  if (!input || typeof input !== 'string') {
    throw new Error('Text input is required to create an embedding')
  }

  return geminiService.embed({
    input,
    apiKey: options.apiKey,
    model: options.model,
  })
}

module.exports = {
  DEFAULT_MODEL,
  runAgent,
  streamAgent,
  createEmbedding,
  parseModel,
}
