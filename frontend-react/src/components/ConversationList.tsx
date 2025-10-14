import type { Conversation } from '../types'

interface ConversationListProps {
  conversations: Conversation[]
  activeId: string | null
  onSelect: (conversationId: string) => void
  onNewConversation: () => void
}

function ConversationList({
  conversations,
  activeId,
  onSelect,
  onNewConversation,
}: ConversationListProps) {
  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-400">
          Conversations
        </h2>
        <button
          type="button"
          onClick={onNewConversation}
          className="rounded-md border border-slate-800 px-2 py-1 text-xs text-slate-300 hover:bg-slate-900"
        >
          New
        </button>
      </div>

      <div className="flex-1 space-y-2 overflow-y-auto">
        {conversations.length === 0 ? (
          <p className="text-sm text-slate-500">
            Your conversations will appear here once you start chatting.
          </p>
        ) : (
          conversations.map((conversation) => {
            const isActive = conversation.id === activeId
            return (
              <button
                key={conversation.id}
                type="button"
                onClick={() => onSelect(conversation.id)}
                className={`w-full rounded-xl border px-3 py-3 text-left text-sm transition ${
                  isActive
                    ? 'border-sky-500/40 bg-sky-500/10 text-sky-100'
                    : 'border-slate-800 bg-slate-900/60 text-slate-200 hover:border-slate-700'
                }`}
              >
                <div className="font-medium">{conversation.title}</div>
                <div className="text-xs text-slate-500">
                  Updated{' '}
                  {new Date(conversation.updatedAt).toLocaleString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                    month: 'short',
                    day: 'numeric',
                  })}
                </div>
              </button>
            )
          })
        )}
      </div>
    </div>
  )
}

export default ConversationList
