const { randomUUID } = require('crypto')
const bcrypt = require('bcryptjs')
const { z } = require('zod')
const db = require('../db/connection')
const { signToken } = require('../utils/jwt')

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

async function register(req, res) {
  const parsed = credentialsSchema.safeParse(req.body ?? {})

  if (!parsed.success) {
    return res.status(400).json({ error: 'Invalid registration payload' })
  }

  const { email, password } = parsed.data

  const existing = await db('users').where({ email }).first()
  if (existing) {
    return res.status(409).json({ error: 'Email already registered' })
  }

  const passwordHash = await bcrypt.hash(password, 12)
  const id = randomUUID()
  const now = new Date().toISOString()

  await db('users').insert({
    id,
    email,
    password_hash: passwordHash,
    created_at: now,
  })

  const token = signToken({ sub: id, email })

  return res.status(201).json({
    token,
    user: {
      id,
      email,
    },
  })
}

async function login(req, res) {
  const parsed = credentialsSchema.safeParse(req.body ?? {})

  if (!parsed.success) {
    return res.status(400).json({ error: 'Invalid login payload' })
  }

  const { email, password } = parsed.data

  const user = await db('users').where({ email }).first()

  if (!user) {
    return res.status(401).json({ error: 'Invalid email or password' })
  }

  const matches = await bcrypt.compare(password, user.password_hash)

  if (!matches) {
    return res.status(401).json({ error: 'Invalid email or password' })
  }

  const token = signToken({ sub: user.id, email: user.email })

  return res.json({
    token,
    user: {
      id: user.id,
      email: user.email,
    },
  })
}

async function me(req, res) {
  return res.json({ user: req.user })
}

module.exports = {
  register,
  login,
  me,
}
