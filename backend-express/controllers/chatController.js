const { z } = require('zod')
const { runAgent, streamAgent, parseModel } = require('../ai-agent')
const {
  createConversation,
  getConversationById,
  addMessage,
  listMessages,
} = require('../services/conversationService')
const { indexMessageEmbedding, searchRelevantMessages } = require('../services/vectorService')

const chatSchema = z.object({
  message: z.string().min(1),
  conversationId: z.string().optional(),
  model: z.string().optional(),
  systemPrompt: z.string().optional(),
  stream: z.boolean().optional(),
})

const buildTooling = (userId) => ({
  tools: [
    {
      type: 'function',
      function: {
        name: 'search_conversation',
        description: 'Retrieve relevant conversation snippets from the persistent store',
        parameters: {
          type: 'object',
          properties: {
            query: {
              type: 'string',
              description: 'What the assistant should search for in prior context',
            },
            limit: {
              type: 'integer',
              minimum: 1,
              maximum: 10,
              default: 5,
            },
          },
          required: ['query'],
        },
      },
    },
  ],
  handlers: {
    async search_conversation(args) {
      const limit = Math.max(1, Math.min(10, args?.limit ?? 5))
      const matches = await searchRelevantMessages({
        userId,
        query: args?.query ?? '',
        limit,
      })

      return {
        matches,
      }
    },
  },
})

async function resolveConversation({ userId, conversationId, initialMessage }) {
  if (conversationId) {
    const existing = await getConversationById(conversationId, userId)
    if (!existing) {
      const error = new Error('Conversation not found')
      error.status = 404
      throw error
    }
    return existing
  }

  return createConversation({ userId, initialMessage })
}

const buildContextBlock = (matches) => {
  if (!matches?.length) {
    return null
  }

  const snippets = matches
    .map((item, index) => {
      return `(${index + 1}) [${item.role}] ${item.content}`
    })
    .join('\n---\n')

  return `Relevant past conversation snippets that may help answer the question:\n${snippets}`
}

const buildAgentMessages = ({ systemPrompt, contextBlock, history }) => {
  const messages = []

  if (systemPrompt) {
    messages.push({ role: 'system', content: systemPrompt })
  }

  if (contextBlock) {
    messages.push({ role: 'system', content: contextBlock })
  }

  history.forEach((item) => {
    messages.push({
      role: item.role,
      content: item.content,
    })
  })

  return messages
}

async function handleChat(req, res) {
  const parsed = chatSchema.safeParse(req.body ?? {})

  if (!parsed.success) {
    return res.status(400).json({ error: 'A prompt message is required' })
  }

  const { message, conversationId, model, systemPrompt } = parsed.data

  try {
    const conversation = await resolveConversation({
      userId: req.user.id,
      conversationId,
      initialMessage: message,
    })

    const userMessage = await addMessage({
      conversationId: conversation.id,
      role: 'user',
      content: message,
    })

    await indexMessageEmbedding({
      messageId: userMessage.id,
      content: message,
    })

    const contextMatches = await searchRelevantMessages({
      userId: req.user.id,
      query: message,
      excludeMessageIds: [userMessage.id],
      limit: 4,
    })

    const history = await listMessages(conversation.id, { limit: 30 })
    const agentMessages = buildAgentMessages({
      systemPrompt,
      contextBlock: buildContextBlock(contextMatches),
      history,
    })

    const tooling = buildTooling(req.user.id)

    const agentResult = await runAgent({
      messages: agentMessages,
      model,
      tools: tooling.tools,
      toolHandlers: tooling.handlers,
    })

    const assistantMessage = await addMessage({
      conversationId: conversation.id,
      role: 'assistant',
      content: agentResult.content,
      metadata: {
        model: agentResult.model,
        provider: agentResult.provider,
        finishReason: agentResult.finishReason,
        usage: agentResult.usage,
      },
    })

    await indexMessageEmbedding({
      messageId: assistantMessage.id,
      content: assistantMessage.content,
    })

    return res.json({
      reply: assistantMessage.content,
      conversationId: conversation.id,
      messageId: assistantMessage.id,
      usage: agentResult.usage,
      model: agentResult.model,
      provider: agentResult.provider,
    })
  } catch (error) {
    console.error('AI agent error:', error)
    const status = error?.status ?? 500
    const messageText = error?.message ?? 'Unable to retrieve a response from the AI agent'

    return res.status(status).json({ error: messageText })
  }
}

async function handleChatStream(req, res) {
  const parsed = chatSchema.safeParse(req.body ?? {})

  if (!parsed.success) {
    return res.status(400).json({ error: 'A prompt message is required' })
  }

  const { message, conversationId, model, systemPrompt } = parsed.data
  const parsedModel = parseModel(model)

  try {
    const conversation = await resolveConversation({
      userId: req.user.id,
      conversationId,
      initialMessage: message,
    })

    const userMessage = await addMessage({
      conversationId: conversation.id,
      role: 'user',
      content: message,
    })

    await indexMessageEmbedding({
      messageId: userMessage.id,
      content: message,
    })

    const contextMatches = await searchRelevantMessages({
      userId: req.user.id,
      query: message,
      excludeMessageIds: [userMessage.id],
      limit: 4,
    })

    const history = await listMessages(conversation.id, { limit: 30 })
    const agentMessages = buildAgentMessages({
      systemPrompt,
      contextBlock: buildContextBlock(contextMatches),
      history,
    })

    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Cache-Control', 'no-cache')
    res.setHeader('Connection', 'keep-alive')

    const stream = await streamAgent({
      messages: agentMessages,
      model,
    })

    let fullContent = ''
    let closed = false

    req.on('close', () => {
      closed = true
    })

    for await (const chunk of stream) {
      if (closed) {
        break
      }

      if (!chunk?.token) {
        continue
      }

      fullContent += chunk.token
      res.write(`data: ${JSON.stringify({ token: chunk.token })}\n\n`)
    }

    if (!closed) {
      const assistantMessage = await addMessage({
        conversationId: conversation.id,
        role: 'assistant',
        content: fullContent,
        metadata: {
          model: parsedModel.model,
          provider: parsedModel.provider,
          finishReason: 'stream',
        },
      })

      await indexMessageEmbedding({
        messageId: assistantMessage.id,
        content: assistantMessage.content,
      })

      res.write(
        `data: ${JSON.stringify({
          done: true,
          conversationId: conversation.id,
          messageId: assistantMessage.id,
          content: fullContent,
          provider: parsedModel.provider,
          model: parsedModel.model,
        })}\n\n`,
      )
      res.end()
    }
  } catch (error) {
    console.error('AI agent stream error:', error)
    const status = error?.status ?? 500
    res.write(`data: ${JSON.stringify({ error: error?.message ?? 'Stream failed', status })}\n\n`)
    res.end()
  }
}

module.exports = {
  handleChat,
  handleChatStream,
}
