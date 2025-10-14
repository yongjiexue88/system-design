import type { Message } from '../types'

const roleConfig: Record<Message['role'], { container: string; label: string; bubble: string }> = {
  user: {
    container: 'items-end text-right',
    label: 'You',
    bubble: 'bg-sky-500 text-white ml-auto rounded-lg rounded-br-none border border-sky-500/10',
  },
  assistant: {
    container: 'items-start text-left',
    label: 'AI',
    bubble:
      'bg-slate-800 text-slate-100 mr-auto rounded-lg rounded-bl-none border border-slate-700/40',
  },
}

interface ChatMessageProps {
  message: Message
}

function ChatMessage({ message }: ChatMessageProps) {
  const config = roleConfig[message.role]
  const timestamp = new Date(message.createdAt).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <div className={`flex w-full flex-col gap-1 ${config.container}`}>
      <div className="flex items-center gap-3 text-xs uppercase tracking-wide text-slate-500">
        <span>{config.label}</span>
        <span className="text-slate-600">{timestamp}</span>
      </div>
      <div
        className={`max-w-3xl whitespace-pre-wrap rounded-xl px-4 py-3 text-sm leading-relaxed shadow ${config.bubble} ${message.pending ? 'animate-pulse' : ''}`}
      >
        {message.content || (message.pending ? '…' : '')}
      </div>
    </div>
  )
}

export default ChatMessage
