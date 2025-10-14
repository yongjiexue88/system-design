const { verifyToken } = require('../utils/jwt')

function authenticate(req, res, next) {
  const header = req.headers.authorization

  if (!header?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authentication required' })
  }

  const token = header.slice('Bearer '.length)

  try {
    const payload = verifyToken(token)
    req.user = {
      id: payload.sub,
      email: payload.email,
    }
    return next()
  } catch {
    return res.status(401).json({ error: 'Invalid or expired token' })
  }
}

module.exports = {
  authenticate,
}
