import type { CourseDetailContent, CourseSection } from '../types/content'

export const courseSections: CourseSection[] = [
  {
    section: '1',
    title: 'System Design Fundamentals',
    slug: 'system-design-fundemantals',
    summary: 'Master the core building blocks of reliable, scalable architectures.',
    completed: 2,
    total: 5,
    topics: [
      { name: 'CDNs', completed: true },
      { name: 'Load Balancers', completed: true },
      { name: 'API Gateways', completed: false },
      { name: 'Microservices', completed: false },
      { name: 'Databases', completed: false },
    ],
    learningObjectives: [
      'Explain why CDNs, load balancers, and gateways are foundational to resilient systems.',
      'Compare consistency, availability, and partition tolerance trade-offs in data stores.',
      'Communicate the pros and cons of monoliths versus microservices in interviews.',
    ],
  },
  {
    section: '2',
    title: 'Domain Knowledge',
    slug: 'domain-knowledge',
    summary: 'Build intuition for the real-world systems that power modern products.',
    completed: 1,
    total: 4,
    topics: [
      { name: 'Geospatial Search', completed: true },
      { name: 'Distributed Transactions', completed: false },
      { name: 'Real-time Bidding', completed: false },
      { name: 'Web Crawlers', completed: false },
    ],
    learningObjectives: [
      'Break down systems with strong domain constraints such as maps, ads, and commerce.',
      'Identify the specialized databases and infrastructure these domains rely on.',
      'Articulate trade-offs that engineers consider when scaling domain-specific platforms.',
    ],
  },
  {
    section: '3',
    title: 'Popular Interview Problems',
    slug: 'solutions',
    summary: 'Work through high-signal prompts and practice communicating your solution.',
    completed: 0,
    total: 6,
    topics: [
      { name: 'Design TinyURL', completed: false },
      { name: 'Design Twitter', completed: false },
      { name: 'Design a Web Crawler', completed: false },
      { name: 'Design an API Rate Limiter', completed: false },
      { name: 'Design Dropbox', completed: false },
      { name: 'Design YouTube', completed: false },
    ],
    learningObjectives: [
      'Follow a repeatable framework for untangling any open-ended interview prompt.',
      'Emphasize prioritization, trade-offs, and metrics when presenting solutions.',
      'Practice structuring the conversation to stay aligned with your interviewer.',
    ],
  },
]

export const courseDetailContent: Record<string, CourseDetailContent> = {
  'system-design-fundemantals': {
    slug: 'system-design-fundemantals',
    hero: 'System Design Fundamentals',
    overview:
      'Lay a rock-solid foundation by understanding the primitives every large-scale system relies on. These modules help you reason about architecture trade-offs and speak confidently about design choices.',
    modules: [
      {
        title: 'Networking & Delivery',
        description:
          'Dive into CDNs, load balancers, and API gateways. Learn how each component absorbs traffic spikes and protects downstream services.',
      },
      {
        title: 'Data Storage Strategies',
        description:
          'Contrast relational, NoSQL, and distributed storage models. Understand replication, sharding, and indexing at a practical level.',
      },
      {
        title: 'Service Boundaries',
        description:
          'Explore the trade-offs between monoliths and microservices, and practice articulating when to use each pattern.',
      },
    ],
    nextSteps: [
      'Take the primer to cement your vocabulary for future interviews.',
      'Attempt a warm-up problem from the Practice section to apply these concepts.',
    ],
  },
  'domain-knowledge': {
    slug: 'domain-knowledge',
    hero: 'Domain Knowledge',
    overview:
      'Certain product surfaces require specialized infrastructure. This path gives you the mental models to navigate those conversations with confidence.',
    modules: [
      {
        title: 'Maps & Geospatial Systems',
        description:
          'Understand how indexes, caching strategies, and geo-sharding make location search feel instant.',
      },
      {
        title: 'Marketplaces & Transactions',
        description:
          'Study distributed transactions, idempotency, and consistency models that power commerce workflows.',
      },
      {
        title: 'Real-time & Streaming',
        description:
          'Learn how ad exchanges, bidding systems, and live analytics keep latency low while ingesting massive streams.',
      },
    ],
    nextSteps: [
      'Revisit the Practice problems tied to the domains you just studied.',
      'Bookmark the Solutions track to rehearse full interview walk-throughs.',
    ],
  },
  solutions: {
    slug: 'solutions',
    hero: 'Popular Interview Problems',
    overview:
      'Put everything together with high-signal prompts common in onsite loops. Each module walks through the expectations and a structured solution outline.',
    modules: [
      {
        title: 'Communication Framework',
        description:
          'Practice a step-by-step approach for requirements gathering, component design, and trade-off discussions.',
      },
      {
        title: 'High-Frequency Prompts',
        description:
          'Focus on TinyURL, Twitter, Dropbox, and more—systems interviewers love because they expose clear trade-offs.',
      },
      {
        title: 'Solution Deep Dives',
        description:
          'Explore capacity planning, storage choices, caching, and failure recovery strategies for each prompt.',
      },
    ],
    nextSteps: [
      'Record yourself solving a problem and compare it to our solution checklist.',
      'Schedule a mock interview or use the Practice tab to self-evaluate.',
    ],
  },
}
