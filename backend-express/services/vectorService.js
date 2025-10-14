const db = require('../db/connection')
const { createEmbedding } = require('../ai-agent')

const DEFAULT_EMBED_MODEL = 'text-embedding-004'

const cosineSimilarity = (a, b) => {
  if (!Array.isArray(a) || !Array.isArray(b) || a.length !== b.length) {
    return -1
  }

  let dot = 0
  let normA = 0
  let normB = 0

  for (let i = 0; i < a.length; i += 1) {
    dot += a[i] * b[i]
    normA += a[i] * a[i]
    normB += b[i] * b[i]
  }

  if (!normA || !normB) {
    return -1
  }

  return dot / (Math.sqrt(normA) * Math.sqrt(normB))
}

async function indexMessageEmbedding({
  messageId,
  content,
  provider = 'gemini',
  model = DEFAULT_EMBED_MODEL,
}) {
  if (!content?.trim()) {
    return null
  }

  const embedding = await createEmbedding(content, { model })

  await db('message_embeddings')
    .insert({
      id: embedding.id,
      message_id: messageId,
      provider,
      dimensions: embedding.vector.length,
      embedding_json: JSON.stringify(embedding.vector),
    })
    .onConflict('message_id')
    .merge()

  return embedding
}

async function searchRelevantMessages({
  userId,
  query,
  limit = 5,
  excludeMessageIds = [],
  model = DEFAULT_EMBED_MODEL,
}) {
  if (!query?.trim()) {
    return []
  }

  const queryEmbedding = await createEmbedding(query, { model })

  const rows = await db('message_embeddings as me')
    .join('messages as m', 'm.id', 'me.message_id')
    .join('conversations as c', 'c.id', 'm.conversation_id')
    .select(
      'm.id as message_id',
      'm.content',
      'm.role',
      'm.created_at',
      'me.embedding_json',
      'c.id as conversation_id',
      'c.title as conversation_title',
    )
    .where('c.user_id', userId)
    .modify((builder) => {
      if (excludeMessageIds.length) {
        builder.whereNotIn('m.id', excludeMessageIds)
      }
    })
    .limit(200)

  const queryVector = queryEmbedding.vector
  const scored = rows
    .map((row) => {
      const vector = JSON.parse(row.embedding_json)
      return {
        message_id: row.message_id,
        conversation_id: row.conversation_id,
        conversation_title: row.conversation_title,
        role: row.role,
        content: row.content,
        created_at: row.created_at,
        score: cosineSimilarity(queryVector, vector),
      }
    })
    .filter((item) => item.score > 0)

  scored.sort((a, b) => b.score - a.score)

  return scored.slice(0, limit)
}

module.exports = {
  indexMessageEmbedding,
  searchRelevantMessages,
}
