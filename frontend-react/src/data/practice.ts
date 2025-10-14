import type { PracticeDetailContent, PracticeQuestion } from '../types/content'

export const practiceQuestions: PracticeQuestion[] = [
  {
    slug: 'leetcode',
    name: 'Design LeetCode',
    companies: 3,
    difficulty: 'Easy',
    status: 'Start Now',
    summary: 'Model content delivery, submissions, and leaderboards for a coding interview platform.',
  },
  {
    slug: 'url-shortener',
    name: 'Design URL Shortener',
    companies: 7,
    difficulty: 'Easy',
    status: 'Start Now',
    summary: 'Create a resilient TinyURL-style service with tight latency and massive read throughput.',
  },
  {
    slug: 'webhook',
    name: 'Design Webhook',
    companies: 5,
    difficulty: 'Medium',
    status: 'Start Now',
    summary: 'Guarantee reliable event delivery with retry policies, ordering, and observability.',
  },
  {
    slug: 'collaborative-editing-system',
    name: 'Design a Collaborative Editing System',
    companies: 1,
    difficulty: 'Medium',
    status: 'Coming Soon',
    summary: 'Coordinate edits, conflict resolution, and offline sync for a real-time editor.',
  },
  {
    slug: 'spotify-top-k-songs',
    name: 'Design Spotify Top K Songs',
    companies: 1,
    difficulty: 'Hard',
    status: 'Coming Soon',
    summary: 'Stream aggregate listening telemetry to maintain global and regional leaderboards.',
  },
]

export const practiceDetailContent: Record<string, PracticeDetailContent> = {
  leetcode: {
    slug: 'leetcode',
    overview:
      'Design the infrastructure powering a competitive coding platform where millions of developers browse problems, submit solutions, and compare progress.',
    sections: [
      {
        title: 'Key Requirements',
        description:
          'Capture core use cases: browsing curated problems, running code in isolated sandboxes, and tracking personal statistics in real-time.',
        bullets: [
          'Serve read-heavy traffic with low latency across global regions.',
          'Execute untrusted code safely with deterministic resource limits.',
          'Maintain accurate leaderboards and submission history per user.',
        ],
      },
      {
        title: 'Core Architecture',
        description:
          'Use a problem service backed by a relational store, a submission queue for asynchronous grading, and a worker fleet that runs solutions in containers.',
        bullets: [
          'Problem metadata cached in Redis to keep browse experience snappy.',
          'Submission intake publishes jobs to a message queue (e.g., SQS, Kafka).',
          'Execution workers stream results to a results API that persists user history.',
        ],
      },
      {
        title: 'Scaling Considerations',
        description:
          'Plan for seasonal spikes around recruiting cycles and popular challenges.',
        bullets: [
          'Autoscale workers based on queue depth and execution latency SLOs.',
          'Partition submission history by user id to allow horizontal scale-out.',
          'Add caching layers for trending problems and recent discussions.',
        ],
      },
    ],
    practiceTips: [
      'Lead with user flows, then call out sandbox isolation early.',
      'Quantify compute requirements based on submissions per minute.',
      'Highlight monitoring around queue depth, grading latency, and sandbox failures.',
    ],
  },
  'url-shortener': {
    slug: 'url-shortener',
    overview:
      'Build a TinyURL-like service that converts long URLs into short aliases, handles billions of redirects, and preserves analytics.',
    sections: [
      {
        title: 'Functional Scope',
        description:
          'Shrink long links, redirect users with sub-50ms latency, and expose aggregate click metrics.',
        bullets: [
          'Support REST + UI creation of short links.',
          'Ensure generated aliases are collision-resistant.',
          'Collect event telemetry for reporting dashboards.',
        ],
      },
      {
        title: 'Design Outline',
        description:
          'Adopt a stateless API for link creation, a key-value store for mapping short codes, and edge caches for redirect performance.',
        bullets: [
          'Use base62 encoding of unique ids to keep URLs compact.',
          'Back hot lookups with Redis or DynamoDB for O(1) access.',
          'Log redirect events asynchronously to a streaming pipeline.',
        ],
      },
      {
        title: 'Reliability Strategies',
        description:
          'Mitigate abuse and ensure availability when dependency failures occur.',
        bullets: [
          'Apply rate limiting and bot detection on creation endpoints.',
          'Replicate data across regions and add fallback reads from a secondary store.',
          'Protect analytics ingestion with buffering queues and batch processing.',
        ],
      },
    ],
    practiceTips: [
      'Discuss the balance between sequential id generators and random tokens.',
      'Quantify storage growth based on expected links-per-day and TTL policies.',
      'Cover observability: redirect error rates, stale cache eviction, and latency budgets.',
    ],
  },
  webhook: {
    slug: 'webhook',
    overview:
      'Design a webhook delivery platform that ingests events, stores them durably, and retries delivery with strong guarantees.',
    sections: [
      {
        title: 'Guaranteed Delivery',
        description:
          'Persist events before delivery, tag them with tenant metadata, and track acknowledgement state.',
        bullets: [
          'Append events to a durable log or queue per subscriber.',
          'Retry with exponential backoff and dead-letter queues after max attempts.',
          'Expose dashboards for delivery status and failure diagnostics.',
        ],
      },
      {
        title: 'Scalable Fan-Out',
        description:
          'Ensure the platform fans out events to thousands of subscribers without starving slow consumers.',
        bullets: [
          'Shard event processing workers by tenant or topic.',
          'Allow customers to configure parallelism and rate limits.',
          'Use idempotency tokens so retried deliveries are safe.',
        ],
      },
      {
        title: 'Security & Operations',
        description:
          'Protect webhook endpoints and empower customers to monitor delivery.',
        bullets: [
          'Sign payloads with shared secrets or rotating keys.',
          'Support replay of events within a retention window.',
          'Surface metrics such as delivery latency, retries, and DLQ depth.',
        ],
      },
    ],
    practiceTips: [
      'Clarify SLAs: at-least-once delivery, ordering per subscriber, latency targets.',
      'Discuss schema evolution and versioning for webhook payloads.',
      'Call out customer self-serve tooling for replay and alerting.',
    ],
  },
  'collaborative-editing-system': {
    slug: 'collaborative-editing-system',
    overview:
      'Coming soon: we will add a detailed walk-through covering CRDTs, operational transforms, and real-time presence.',
    sections: [
      {
        title: 'What You Will Learn',
        description: 'Conflict resolution, offline sync, and doc storage strategies for collaborative apps.',
      },
    ],
    practiceTips: ['Join the waitlist to be notified once the lesson ships.'],
  },
  'spotify-top-k-songs': {
    slug: 'spotify-top-k-songs',
    overview:
      'Coming soon: explore streaming aggregation, windowed analytics, and cache-friendly ranking algorithms.',
    sections: [
      {
        title: 'What You Will Learn',
        description: 'Efficiently compute rolling top-K playlists with strong freshness guarantees.',
      },
    ],
    practiceTips: ['Coming soon.'],
  },
}
