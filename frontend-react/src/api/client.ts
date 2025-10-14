import type { AuthResponse, Conversation, Message, StreamingChunk } from '../types'
import type { ModelOption } from '../models/modelOptions'

const API_BASE_URL = (import.meta.env.VITE_API_URL ?? 'http://localhost:5001').replace(/\/$/, '')

const jsonHeaders = {
  'Content-Type': 'application/json',
} as const

const toConversation = (input: any): Conversation => ({
  id: input.id,
  title: input.title,
  createdAt: input.created_at ?? input.createdAt ?? '',
  updatedAt: input.updated_at ?? input.updatedAt ?? '',
})

const toMessage = (input: any): Message => ({
  id: input.id,
  conversationId: input.conversation_id ?? input.conversationId ?? '',
  role: input.role,
  content: input.content,
  createdAt: input.created_at ?? input.createdAt ?? '',
  metadata: input.metadata ?? null,
})

class ApiClient {
  private token: string | null

  constructor(token: string | null = null) {
    this.token = token
  }

  setToken(token: string | null) {
    this.token = token
  }

  private buildHeaders(extra?: HeadersInit): Record<string, string> {
    const headers = new Headers(jsonHeaders)

    if (extra) {
      const additional = new Headers(extra)
      additional.forEach((value, key) => {
        headers.set(key, value)
      })
    }

    if (this.token) {
      headers.set('Authorization', `Bearer ${this.token}`)
    }

    return Object.fromEntries(headers.entries())
  }

  private async request<T>(path: string, init?: RequestInit): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      ...init,
      headers: this.buildHeaders(init?.headers as HeadersInit),
    })

    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({}))
      const message = errorBody?.error || response.statusText
      throw new Error(message)
    }

    return response.json() as Promise<T>
  }

  async login(email: string, password: string) {
    return this.request<AuthResponse>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })
  }

  async register(email: string, password: string) {
    return this.request<AuthResponse>('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })
  }

  async listConversations() {
    const result = await this.request<{ conversations: any[] }>('/api/conversations', {
      method: 'GET',
    })

    return result.conversations.map(toConversation)
  }

  async getConversation(conversationId: string) {
    const result = await this.request<{
      conversation: any
      messages: any[]
    }>(`/api/conversations/${conversationId}`, {
      method: 'GET',
    })

    return {
      conversation: toConversation(result.conversation),
      messages: result.messages.map(toMessage),
    }
  }

  async getModelOptions() {
    const result = await this.request<{ models: ModelOption[] }>('/api/models', {
      method: 'GET',
    })

    return result.models
  }

  async sendMessage(payload: {
    message: string
    conversationId?: string
    model?: string
    systemPrompt?: string
  }) {
    const result = await this.request<{
      reply: string
      conversationId: string
      messageId: string
      model?: string
      provider?: string
    }>('/api/chat', {
      method: 'POST',
      body: JSON.stringify(payload),
    })

    return result
  }

  async *streamChat(payload: {
    message: string
    conversationId?: string
    model?: string
    systemPrompt?: string
    signal?: AbortSignal
  }): AsyncGenerator<StreamingChunk, void, void> {
    const response = await fetch(`${API_BASE_URL}/api/chat/stream`, {
      method: 'POST',
      headers: this.buildHeaders(),
      body: JSON.stringify(payload),
      signal: payload.signal,
    })

    if (!response.body) {
      throw new Error('Streaming is not supported by this environment')
    }

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(errorText || 'Streaming request failed')
    }

    const reader = response.body.getReader()
    const decoder = new TextDecoder('utf-8')
    let buffer = ''

    while (true) {
      const { value, done } = await reader.read()

      if (done) {
        break
      }

      buffer += decoder.decode(value, { stream: true })

      const segments = buffer.split('\n\n')
      buffer = segments.pop() ?? ''

      for (const segment of segments) {
        if (!segment.startsWith('data:')) {
          continue
        }

        const payloadText = segment.replace(/^data:\s*/, '').trim()
        if (!payloadText) {
          continue
        }

        try {
          const data = JSON.parse(payloadText) as StreamingChunk
          yield data

          if (data.done) {
            return
          }
        } catch (error) {
          console.error('Failed to parse stream chunk', error)
        }
      }
    }

    if (buffer.trim()) {
      try {
        const data = JSON.parse(buffer.replace(/^data:\s*/, '').trim()) as StreamingChunk
        yield data
      } catch (error) {
        console.error('Failed to parse trailing stream buffer', error)
      }
    }
  }
}

export const apiClient = new ApiClient()
