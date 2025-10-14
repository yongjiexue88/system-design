const jwt = require('jsonwebtoken')

const TOKEN_TTL = '7d'

const getSecret = () => {
  const secret = process.env.JWT_SECRET
  if (!secret) {
    throw new Error('JWT_SECRET is not configured')
  }
  return secret
}

const signToken = (payload, options = {}) =>
  jwt.sign(payload, getSecret(), { expiresIn: TOKEN_TTL, ...options })

const verifyToken = (token) => jwt.verify(token, getSecret())

module.exports = {
  signToken,
  verifyToken,
}
