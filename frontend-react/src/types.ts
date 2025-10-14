export type Role = 'user' | 'assistant'

export interface User {
  id: string
  email: string
}

export interface Conversation {
  id: string
  title: string
  createdAt: string
  updatedAt: string
}

export interface Message {
  id: string
  conversationId: string
  role: Role
  content: string
  createdAt: string
  metadata?: Record<string, unknown> | null
  pending?: boolean
}

export interface StreamingChunk {
  token?: string
  done?: boolean
  content?: string
  messageId?: string
  conversationId?: string
  model?: string
  provider?: string
  error?: string
  status?: number
}

export interface AuthResponse {
  token: string
  user: User
}
