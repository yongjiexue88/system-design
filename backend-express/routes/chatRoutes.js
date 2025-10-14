const { Router } = require('express')
const { handleChat, handleChatStream } = require('../controllers/chatController')
const { authenticate } = require('../middleware/authMiddleware')

const router = Router()

router.use(authenticate)

router.post('/', handleChat)
router.post('/stream', handleChatStream)

module.exports = router
