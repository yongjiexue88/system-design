const path = require('path')
const fs = require('fs')
const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')

const envFiles = [
  path.resolve(__dirname, '../.env'),
  path.resolve(__dirname, '.env'),
  path.resolve(__dirname, '.env.local'),
]

for (const filePath of envFiles) {
  if (fs.existsSync(filePath)) {
    dotenv.config({ path: filePath, override: true })
  }
}

const app = express()
const PORT = process.env.PORT || 5001

const ensureDataDirectory = () => {
  const preferredDir = process.env.DATA_DIRECTORY || path.resolve(__dirname, '../data')

  try {
    fs.mkdirSync(preferredDir, { recursive: true })
    return preferredDir
  } catch (error) {
    if (error.code === 'EEXIST') {
      return preferredDir
    }

    if (error.code === 'EROFS') {
      const fallbackDir = path.join(process.env.TMPDIR || '/tmp', 'agentic-chat-data')

      try {
        fs.mkdirSync(fallbackDir, { recursive: true })
        process.env.DATA_DIRECTORY = fallbackDir
        return fallbackDir
      } catch (fallbackError) {
        console.warn('Failed to create fallback data directory:', fallbackError)
        return fallbackDir
      }
    }

    console.warn('Unable to ensure writable data directory:', error)
    return preferredDir
  }
}

const dataDirectory = ensureDataDirectory()
app.set('dataDirectory', dataDirectory)

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || '*',
  }),
)
app.use(express.json())

const chatRoutes = require('./routes/chatRoutes')
const authRoutes = require('./routes/authRoutes')
const conversationRoutes = require('./routes/conversationRoutes')
const modelRoutes = require('./routes/modelRoutes')

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' })
})

app.use('/api/auth', authRoutes)
app.use('/api/conversations', conversationRoutes)
app.use('/api/chat', chatRoutes)
app.use('/api/models', modelRoutes)

app.use((err, _req, res, _next) => {
  console.error('Unhandled server error:', err)
  res.status(500).json({ error: 'Internal server error' })
})

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Express server listening on port ${PORT}`)
  })
}

module.exports = app
