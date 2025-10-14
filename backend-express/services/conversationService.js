const { randomUUID } = require('crypto')
const db = require('../db/connection')

const CONVERSATION_TITLE_MAX = 100

const parseMetadata = (value) => {
  if (value == null) {
    return null
  }

  if (typeof value === 'object') {
    return value
  }

  if (typeof value === 'string') {
    try {
      return JSON.parse(value)
    } catch (error) {
      console.warn('Failed to parse message metadata string, returning raw value', {
        error: error.message,
      })
      return value
    }
  }

  return value
}

const toTitle = (message) => {
  const trimmed = (message ?? '').trim()
  if (!trimmed) {
    return 'New conversation'
  }

  const noBreak = trimmed.replace(/\s+/g, ' ')
  if (noBreak.length <= CONVERSATION_TITLE_MAX) {
    return noBreak
  }

  return `${noBreak.slice(0, CONVERSATION_TITLE_MAX - 3)}...`
}

async function listConversations(userId) {
  return db('conversations').where({ user_id: userId }).orderBy('updated_at', 'desc')
}

async function getConversationById(conversationId, userId) {
  const conversation = await db('conversations')
    .where({ id: conversationId, user_id: userId })
    .first()

  return conversation ?? null
}

async function createConversation({ userId, initialMessage }) {
  const id = randomUUID()
  const title = toTitle(initialMessage)
  const now = new Date().toISOString()

  await db('conversations').insert({
    id,
    user_id: userId,
    title,
    created_at: now,
    updated_at: now,
  })

  return { id, user_id: userId, title, created_at: now, updated_at: now }
}

async function touchConversation(conversationId) {
  await db('conversations')
    .where({ id: conversationId })
    .update({ updated_at: new Date().toISOString() })
}

async function addMessage({ conversationId, role, content, metadata = null }) {
  const id = randomUUID()
  const createdAt = new Date().toISOString()

  await db('messages').insert({
    id,
    conversation_id: conversationId,
    role,
    content,
    metadata: metadata ? JSON.stringify(metadata) : null,
    created_at: createdAt,
  })

  await touchConversation(conversationId)

  return {
    id,
    conversation_id: conversationId,
    role,
    content,
    metadata,
    created_at: createdAt,
  }
}

async function listMessages(conversationId, { limit = 20 } = {}) {
  const baseQuery = db('messages')
    .where({ conversation_id: conversationId })
    .orderBy('created_at', limit ? 'desc' : 'asc')

  if (limit) {
    baseQuery.limit(limit)
    const rows = await baseQuery
    return rows.reverse().map((row) => ({
      ...row,
      metadata: parseMetadata(row.metadata),
    }))
  }

  const rows = await baseQuery
  return rows.map((row) => ({
    ...row,
    metadata: parseMetadata(row.metadata),
  }))
}

module.exports = {
  listConversations,
  getConversationById,
  createConversation,
  addMessage,
  listMessages,
}
