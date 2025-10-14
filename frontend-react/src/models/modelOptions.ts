export interface ModelOption {
  value: string
  label: string
  description: string
  rpm: string
  tpm: string
  rpd: string
  contextWindow: {
    input: string
    output: string
  }
  highlights: string[]
  usageNote: string
  chatSupported: boolean
  metadata?: {
    source: string
    fetchedAt: string | null
  }
}

export const FALLBACK_MODEL_OPTIONS: ModelOption[] = [
  {
    value: 'gemini:gemini-2.5-pro',
    label: 'Gemini 2.5 Pro',
    description:
      'Flagship reasoning model tuned for depth, accuracy, and complex multi-turn tasks.',
    rpm: '5',
    tpm: '125,000',
    rpd: '100',
    contextWindow: {
      input: 'Up to 1,048,576 tokens',
      output: 'Up to 65,535 tokens',
    },
    highlights: [
      'Excels at complex reasoning, planning, and code generation.',
      'Full multimodal support: text, images, audio, and video.',
      'Access to the 1M-token context window through Google AI Studio.',
    ],
    usageNote: 'Choose this model when quality matters most and latency is less critical.',
    chatSupported: true,
  },
  {
    value: 'gemini:gemini-2.5-flash',
    label: 'Gemini 2.5 Flash',
    description:
      'Balanced speed and capability for production workloads that still need high-quality output.',
    rpm: '10',
    tpm: '250,000',
    rpd: '250',
    contextWindow: {
      input: 'Up to 1,048,576 tokens',
      output: 'Up to 65,535 tokens',
    },
    highlights: [
      'Great default for responsive chat and tool-assisted workflows.',
      'Supports multimodal prompts with large context windows.',
      'Higher throughput quota than Pro while preserving quality.',
    ],
    usageNote:
      'Use Flash when you need a fast, capable assistant for day-to-day development tasks.',
    chatSupported: true,
  },
  {
    value: 'gemini:gemini-2.5-flash-lite',
    label: 'Gemini 2.5 Flash-Lite',
    description: 'Low-latency model optimized for lightweight tasks and rapid turnarounds.',
    rpm: '15',
    tpm: '250,000',
    rpd: '1,000',
    contextWindow: {
      input: 'Up to 1,048,576 tokens',
      output: 'Up to 65,535 tokens',
    },
    highlights: [
      'Ideal for UI-driven chat, quick summaries, and real-time feedback.',
      'Higher request ceiling for bursty workloads on the free tier.',
      'Multimodal capable with lower compute footprint.',
    ],
    usageNote: 'Pick Flash-Lite when snappy responses matter more than exhaustive detail.',
    chatSupported: true,
  },
  {
    value: 'gemini:gemma-3-27b-it',
    label: 'Gemma 3 & 3n',
    description:
      'Open Gemma models fine-tuned for instruction following and efficient on-device deployment.',
    rpm: '30',
    tpm: '15,000',
    rpd: '14,400',
    contextWindow: {
      input: 'Large context window (varies by variant)',
      output: 'Optimized for concise text responses',
    },
    highlights: [
      'Great for lightweight assistants, chatbots, and content generation.',
      'Faster start-up with smaller memory footprint compared to Gemini.',
      'Supports text-only prompts; ideal for multilingual experimentation.',
    ],
    usageNote:
      'Select Gemma when you need efficient text generation with generous free-tier quotas.',
    chatSupported: true,
  },
  {
    value: 'gemini:text-embedding-004',
    label: 'Gemini Embedding',
    description:
      'Produces dense vector representations tailored for semantic search and retrieval.',
    rpm: '100',
    tpm: '30,000',
    rpd: '1,000',
    contextWindow: {
      input: 'Up to 2,048 tokens',
      output: 'Vector embeddings (no natural language output)',
    },
    highlights: [
      'Optimized for search, clustering, recommendations, and retrieval-augmented generation.',
      'Pairs well with vector databases for similarity queries.',
      'High throughput quota for batch embedding jobs on the free tier.',
    ],
    usageNote:
      'Embeddings-only model—keep a generative model selected when chatting with the assistant.',
    chatSupported: false,
  },
]

export const DEFAULT_MODEL = FALLBACK_MODEL_OPTIONS[1].value

export const createModelLookup = (options: ModelOption[]) =>
  options.reduce<Record<string, ModelOption>>((acc, option) => {
    acc[option.value] = option
    return acc
  }, {})
