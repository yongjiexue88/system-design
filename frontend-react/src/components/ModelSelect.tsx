import type { ModelOption } from '../models/modelOptions'

interface ModelSelectProps {
  value: string
  options: ModelOption[]
  onChange: (model: string) => void
  isLoading?: boolean
  lastSynced?: string | null
}

const formatSyncedLabel = (timestamp?: string | null) => {
  if (!timestamp) {
    return null
  }

  try {
    const date = new Date(timestamp)
    if (Number.isNaN(date.getTime())) {
      return null
    }

    return `Rate limits last synchronized ${date.toLocaleString()}`
  } catch {
    return null
  }
}

function ModelSelect({
  value,
  options,
  onChange,
  isLoading = false,
  lastSynced = null,
}: ModelSelectProps) {
  if (!options.length) {
    return null
  }

  const activeModel = options.find((option) => option.value === value) ?? options[0]
  const syncedLabel = formatSyncedLabel(lastSynced)

  return (
    <section className="mb-6">
      <header className="mb-3">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-400">
          Model selection
        </h2>
        {syncedLabel && <p className="mt-1 text-xs text-slate-500">{syncedLabel}</p>}
      </header>

      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Gemini model family">
        {options.map((option) => {
          const isActive = option.value === activeModel.value

          return (
            <button
              key={option.value}
              type="button"
              role="tab"
              aria-selected={isActive}
              disabled={isLoading}
              onClick={() => onChange(option.value)}
              className={`flex min-w-[14rem] flex-1 flex-col rounded-xl border px-4 py-3 text-left transition focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 ${
                isActive
                  ? 'border-sky-500/50 bg-sky-500/10 text-sky-100'
                  : 'border-slate-800 bg-slate-900/60 text-slate-200 hover:border-slate-700 disabled:hover:border-slate-800'
              } ${isLoading ? 'opacity-70 cursor-wait' : 'cursor-pointer'}`}
            >
              <div className="font-medium">{option.label}</div>
              <p className="mt-1 text-[11px] uppercase tracking-wide text-slate-400">
                {option.rpm} RPM · {option.tpm} TPM · {option.rpd} RPD
              </p>
              {!option.chatSupported && (
                <span className="mt-2 inline-flex w-fit items-center rounded-full border border-amber-400/40 bg-amber-400/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-200">
                  Embeddings only
                </span>
              )}
            </button>
          )
        })}
      </div>

      <div className="mt-4 rounded-xl border border-slate-800 bg-slate-900/70 p-5">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-base font-semibold text-slate-100">{activeModel.label}</h3>
            <p className="mt-1 text-sm text-slate-400">{activeModel.description}</p>
          </div>
          <div className="rounded-lg border border-slate-800 bg-slate-950/80 px-3 py-2 text-xs text-slate-300">
            <div>
              <span className="font-semibold text-slate-100">Input:&nbsp;</span>
              {activeModel.contextWindow.input}
            </div>
            <div className="mt-1">
              <span className="font-semibold text-slate-100">Output:&nbsp;</span>
              {activeModel.contextWindow.output}
            </div>
          </div>
        </div>

        <ul className="mt-4 space-y-2 text-sm text-slate-300">
          {activeModel.highlights.map((point) => (
            <li key={point} className="flex gap-2">
              <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-sky-500" />
              <span>{point}</span>
            </li>
          ))}
        </ul>

        <p className="mt-4 text-sm text-slate-400">{activeModel.usageNote}</p>

        {!activeModel.chatSupported && (
          <p className="mt-3 rounded-lg border border-amber-500/40 bg-amber-500/10 p-3 text-sm text-amber-200">
            This model returns vector embeddings only. Keep a generative model selected when
            chatting with the assistant.
          </p>
        )}
      </div>
    </section>
  )
}

export default ModelSelect
