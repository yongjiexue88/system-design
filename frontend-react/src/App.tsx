import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import ChatInput from './components/ChatInput'
import ChatMessage from './components/ChatMessage'
import { apiClient } from './api/client'
import type { Conversation, Message, User } from './types'
import AuthCard from './components/AuthCard'
import ConversationList from './components/ConversationList'
import ModelSelect from './components/ModelSelect'
import {
  DEFAULT_MODEL,
  FALLBACK_MODEL_OPTIONS,
  createModelLookup,
  type ModelOption,
} from './models/modelOptions'

type AuthMode = 'login' | 'register'

interface AuthState {
  token: string
  user: User
}

const LOCAL_STORAGE_KEY = 'ai-agent-auth'

const createWelcomeMessage = (): Message => ({
  id: 'welcome-message',
  conversationId: 'welcome',
  role: 'assistant',
  content: 'Welcome! Authenticate below and start chatting with the upgraded AI agent.',
  createdAt: new Date().toISOString(),
})

function App() {
  const [auth, setAuth] = useState<AuthState | null>(null)
  const [authMode, setAuthMode] = useState<AuthMode>('login')
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null)
  const [messages, setMessages] = useState<Message[]>([createWelcomeMessage()])
  const [modelOptions, setModelOptions] = useState<ModelOption[]>(FALLBACK_MODEL_OPTIONS)
  const [modelOptionsSyncedAt, setModelOptionsSyncedAt] = useState<string | null>(null)
  const [isModelOptionsLoading, setIsModelOptionsLoading] = useState(false)
  const [model, setModel] = useState<string>(DEFAULT_MODEL)
  const [systemPrompt, setSystemPrompt] = useState<string>('')
  const [error, setError] = useState<string | null>(null)
  const [isStreaming, setIsStreaming] = useState(false)
  const abortControllerRef = useRef<AbortController | null>(null)

  const modelLookup = useMemo(() => createModelLookup(modelOptions), [modelOptions])

  const resolveModel = useCallback(
    (modelValue: string) => modelLookup[modelValue] ?? modelOptions[0] ?? FALLBACK_MODEL_OPTIONS[0],
    [modelLookup, modelOptions],
  )

  // hydrate auth from storage on first render
  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored) as AuthState
        if (parsed?.token && parsed?.user) {
          setAuth(parsed)
        }
      }
    } catch (storageError) {
      console.error('Unable to load stored auth credentials', storageError)
    }
  }, [])

  useEffect(() => {
    apiClient.setToken(auth?.token ?? null)
    if (auth) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(auth))
    } else {
      localStorage.removeItem(LOCAL_STORAGE_KEY)
      setMessages([createWelcomeMessage()])
      setConversations([])
      setActiveConversationId(null)
    }
  }, [auth])

  useEffect(() => {
    let cancelled = false

    const loadModelOptions = async () => {
      setIsModelOptionsLoading(true)

      try {
        const options = await apiClient.getModelOptions()

        if (!cancelled && Array.isArray(options) && options.length) {
          setModelOptions(options)

          const latestFetchedAt = options.reduce<string | null>((acc, option) => {
            const next = option.metadata?.fetchedAt
            if (!next) {
              return acc
            }

            const nextTimestamp = Date.parse(next)
            if (Number.isNaN(nextTimestamp)) {
              return acc
            }

            if (!acc) {
              return next
            }

            const accTimestamp = Date.parse(acc)
            if (Number.isNaN(accTimestamp) || nextTimestamp > accTimestamp) {
              return next
            }

            return acc
          }, null)

          setModelOptionsSyncedAt(latestFetchedAt)
        }
      } catch (loadError) {
        console.error('Failed to refresh Gemini model options', loadError)
      } finally {
        if (!cancelled) {
          setIsModelOptionsLoading(false)
        }
      }
    }

    loadModelOptions()

    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    if (!modelOptions.length) {
      return
    }

    if (!modelLookup[model]) {
      setModel(modelOptions[0].value)
    }
  }, [modelLookup, modelOptions, model])

  const loadConversations = useCallback(async () => {
    if (!auth) {
      return
    }

    try {
      const list = await apiClient.listConversations()
      setConversations(list)
      if (!activeConversationId && list.length) {
        setActiveConversationId(list[0].id)
      }
    } catch (loadError) {
      console.error('Failed to load conversations', loadError)
      setError('Unable to load conversations. Please try again.')
    }
  }, [auth, activeConversationId])

  useEffect(() => {
    loadConversations()
  }, [loadConversations])

  useEffect(() => {
    const fetchMessages = async () => {
      if (!auth || !activeConversationId) {
        return
      }

      try {
        const data = await apiClient.getConversation(activeConversationId)
        setMessages(data.messages)
      } catch (loadError) {
        console.error('Failed to fetch conversation messages', loadError)
        setError('Unable to load conversation history.')
      }
    }

    fetchMessages()
  }, [auth, activeConversationId])

  const handleAuth = useCallback(
    async (payload: { email: string; password: string }) => {
      setError(null)

      try {
        const result =
          authMode === 'login'
            ? await apiClient.login(payload.email, payload.password)
            : await apiClient.register(payload.email, payload.password)

        setAuth(result)
      } catch (authError) {
        console.error('Authentication failed', authError)
        setError(authError instanceof Error ? authError.message : 'Authentication failed')
      }
    },
    [authMode],
  )

  const handleLogout = useCallback(() => {
    abortControllerRef.current?.abort()
    abortControllerRef.current = null
    setAuth(null)
  }, [])

  const handleSelectConversation = useCallback((conversationId: string) => {
    abortControllerRef.current?.abort()
    abortControllerRef.current = null
    setActiveConversationId(conversationId)
  }, [])

  const handleStartConversation = useCallback(() => {
    abortControllerRef.current?.abort()
    abortControllerRef.current = null
    setActiveConversationId(null)
    setMessages([])
  }, [])

  const refreshConversationState = useCallback(async (conversationId: string) => {
    try {
      const data = await apiClient.getConversation(conversationId)
      setMessages(data.messages)
      setConversations((prev) => {
        const existingIndex = prev.findIndex((c) => c.id === conversationId)
        const updatedList = [...prev]
        if (existingIndex >= 0) {
          updatedList[existingIndex] = data.conversation
          return updatedList.sort(
            (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
          )
        }

        return [data.conversation, ...updatedList]
      })
    } catch (refreshError) {
      console.error('Failed to refresh conversation state', refreshError)
    }
  }, [])

  const sendMessage = useCallback(
    async (text: string) => {
      if (!auth) {
        setError('Please sign in before chatting with the agent.')
        return
      }

      const trimmed = text.trim()
      if (!trimmed || isStreaming) {
        return
      }

      const selectedModel = resolveModel(model)
      if (!selectedModel.chatSupported) {
        setError(
          `${selectedModel.label} returns embeddings only. Choose a generative Gemini model before sending a chat request.`,
        )
        return
      }

      const now = new Date().toISOString()
      const userMessage: Message = {
        id: `temp-user-${Date.now()}`,
        conversationId: activeConversationId ?? 'pending',
        role: 'user',
        content: trimmed,
        createdAt: now,
      }

      const assistantMessage: Message = {
        id: `temp-assistant-${Date.now()}`,
        conversationId: activeConversationId ?? 'pending',
        role: 'assistant',
        content: '',
        createdAt: now,
        pending: true,
      }

      setMessages((prev) => [...prev, userMessage, assistantMessage])
      setIsStreaming(true)
      setError(null)

      const controller = new AbortController()
      abortControllerRef.current = controller

      let workingAssistant = ''
      let finalConversationId = activeConversationId ?? null
      let finalMessageId: string | undefined

      try {
        const stream = apiClient.streamChat({
          message: trimmed,
          conversationId: activeConversationId ?? undefined,
          model,
          systemPrompt: systemPrompt || undefined,
          signal: controller.signal,
        })

        for await (const chunk of stream) {
          if (chunk.error) {
            throw new Error(chunk.error)
          }

          if (chunk.token) {
            workingAssistant += chunk.token
            setMessages((prev) =>
              prev.map((message) =>
                message.id === assistantMessage.id
                  ? {
                      ...message,
                      content: workingAssistant,
                    }
                  : message,
              ),
            )
          }

          if (chunk.done) {
            finalConversationId = chunk.conversationId ?? finalConversationId
            finalMessageId = chunk.messageId ?? undefined
            break
          }
        }

        const resolvedConversationId = finalConversationId
        if (resolvedConversationId) {
          setActiveConversationId(resolvedConversationId)
        }

        setMessages((prev) =>
          prev.map((message) => {
            if (message.id === assistantMessage.id) {
              return {
                ...message,
                id: finalMessageId ?? message.id,
                conversationId: resolvedConversationId ?? message.conversationId,
                content: workingAssistant || message.content,
                pending: false,
              }
            }

            if (message.id === userMessage.id) {
              return {
                ...message,
                conversationId: resolvedConversationId ?? message.conversationId,
              }
            }

            return message
          }),
        )

        if (resolvedConversationId) {
          await refreshConversationState(resolvedConversationId)
        } else {
          await loadConversations()
        }
      } catch (streamError) {
        if (streamError instanceof DOMException && streamError.name === 'AbortError') {
          return
        }
        console.error('Streaming failed', streamError)
        setError(
          streamError instanceof Error ? streamError.message : 'The assistant failed to respond.',
        )

        setMessages((prev) =>
          prev.map((message) =>
            message.id === assistantMessage.id
              ? {
                  ...message,
                  content:
                    message.content || 'I was unable to complete that request. Please try again.',
                  pending: false,
                }
              : message,
          ),
        )
      } finally {
        setIsStreaming(false)
        abortControllerRef.current = null
      }
    },
    [
      auth,
      activeConversationId,
      isStreaming,
      model,
      systemPrompt,
      refreshConversationState,
      loadConversations,
      resolveModel,
    ],
  )

  const sortedMessages = useMemo(
    () =>
      [...messages].sort(
        (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      ),
    [messages],
  )

  if (!auth) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-12">
        <AuthCard
          mode={authMode}
          onSubmit={handleAuth}
          onToggleMode={() => setAuthMode((prev) => (prev === 'login' ? 'register' : 'login'))}
          error={error}
        />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100">
      <aside className="hidden w-80 flex-shrink-0 border-r border-slate-900 bg-slate-950/60 px-5 py-6 md:flex md:flex-col">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">Signed in as</p>
            <p className="text-sm font-semibold text-white">{auth.user.email}</p>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-md border border-slate-800 px-3 py-1 text-xs font-medium text-slate-300 hover:bg-slate-900"
          >
            Log out
          </button>
        </div>

        <ModelSelect
          value={model}
          options={modelOptions}
          onChange={(next) => setModel(next)}
          isLoading={isModelOptionsLoading}
          lastSynced={modelOptionsSyncedAt}
        />

        <ConversationList
          conversations={conversations}
          activeId={activeConversationId}
          onSelect={handleSelectConversation}
          onNewConversation={handleStartConversation}
        />
      </aside>

      <main className="flex w-full flex-col gap-4 px-4 py-6 md:px-8">
        <header className="flex flex-col gap-2 rounded-2xl border border-slate-900 bg-slate-950/60 p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className="text-2xl font-semibold text-white">Conversational AI Agent</h1>
              <p className="text-sm text-slate-400">
                Switch between OpenAI and Gemini models, stream responses, and keep your
                conversations persistent locally.
              </p>
            </div>
            <button
              type="button"
              onClick={handleStartConversation}
              className="rounded-lg bg-sky-500 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-sky-400"
            >
              New conversation
            </button>
          </div>
          <label className="flex flex-col gap-2">
            <span className="text-xs uppercase tracking-wide text-slate-500">
              System prompt (optional)
            </span>
            <textarea
              value={systemPrompt}
              onChange={(event) => setSystemPrompt(event.target.value)}
              placeholder="e.g. You are a helpful assistant specializing in product documentation."
              className="min-h-[90px] rounded-lg border border-slate-800 bg-slate-900/70 px-3 py-2 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none"
            />
          </label>
        </header>

        <section className="flex-1 overflow-y-auto rounded-2xl border border-slate-900 bg-slate-950/70 p-6">
          <div className="flex flex-col gap-4">
            {sortedMessages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {isStreaming ? (
              <div className="text-xs uppercase tracking-wide text-slate-500">
                Streaming response…
              </div>
            ) : null}
            {error ? (
              <div className="rounded-lg border border-rose-500/40 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
                {error}
              </div>
            ) : null}
          </div>
        </section>

        <ChatInput onSend={sendMessage} disabled={isStreaming} />
      </main>
    </div>
  )
}

export default App
