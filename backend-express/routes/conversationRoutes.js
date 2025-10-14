const { Router } = require('express')
const {
  getConversations,
  getConversationMessages,
} = require('../controllers/conversationController')
const { authenticate } = require('../middleware/authMiddleware')

const router = Router()

router.use(authenticate)

router.get('/', getConversations)
router.get('/:id', getConversationMessages)

module.exports = router
