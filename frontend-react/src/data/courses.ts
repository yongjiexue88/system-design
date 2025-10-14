import type { CourseSection } from '../types/content'

export const courseSections: CourseSection[] = [
  {
    section: '1',
    title: 'System Design Fundamentals',
    completed: 2,
    total: 5,
    topics: [
      { name: 'CDNs', completed: true },
      { name: 'Load Balancers', completed: true },
      { name: 'API Gateways', completed: false },
      { name: 'Microservices', completed: false },
      { name: 'Databases', completed: false },
    ],
  },
  {
    section: '2',
    title: 'Domain Knowledge',
    completed: 1,
    total: 4,
    topics: [
      { name: 'Geospatial Search', completed: true },
      { name: 'Distributed Transactions', completed: false },
      { name: 'Real-time Bidding', completed: false },
      { name: 'Web Crawlers', completed: false },
    ],
  },
  {
    section: '3',
    title: 'Popular Interview Problems',
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
  },
]
