const {
  listConversations,
  getConversationById,
  listMessages,
} = require('../services/conversationService')

async function getConversations(req, res) {
  const conversations = await listConversations(req.user.id)
  return res.json({ conversations })
}

async function getConversationMessages(req, res) {
  const { id } = req.params
  const conversation = await getConversationById(id, req.user.id)

  if (!conversation) {
    return res.status(404).json({ error: 'Conversation not found' })
  }

  const messages = await listMessages(id, { limit: null })
  return res.json({ conversation, messages })
}

module.exports = {
  getConversations,
  getConversationMessages,
}
