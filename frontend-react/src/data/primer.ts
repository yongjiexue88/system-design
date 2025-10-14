import type {
  PrimerComment,
  PrimerMetadataItem,
  PrimerSidebarLink,
  PrimerSolutionLink,
} from '../types/content'

export const primerSidebarLinks: PrimerSidebarLink[] = [
  { id: 'introduction', title: 'Introduction' },
  { id: 'what-is-system-design', title: 'What Is System Design?' },
  { id: 'what-are-system-design-interviews', title: 'What Are System Design Interviews?' },
  { id: 'main-components', title: 'Main Components' },
  { id: 'microservices', title: 'Microservices' },
  { id: 'relational-database', title: 'Relational Database' },
  { id: 'nosql-database', title: 'NoSQL Database' },
  { id: 'object-storage', title: 'Object Storage' },
  { id: 'cache', title: 'Cache' },
  { id: 'message-queues', title: 'Message Queues' },
  { id: 'api-gateway', title: 'API Gateway' },
  { id: 'interview-step-by-step', title: 'Interview Step-by-Step' },
  { id: 'functional-requirements', title: 'Functional Requirements' },
  { id: 'non-functional-requirements', title: 'Non-Functional Requirements' },
  { id: 'api-design', title: 'API Design' },
  { id: 'high-level-design', title: 'High-Level Design' },
  { id: 'deep-dives', title: 'Deep Dives' },
  { id: 'core-design-challenges', title: 'Core Design Challenges' },
  { id: 'challenge-1-too-many-concurrent-users', title: 'Challenge 1: Too Many Concurrent Users' },
  { id: 'challenge-2-too-much-data-to-move-around', title: 'Challenge 2: Too Much Data to Move Around' },
  {
    id: 'challenge-3-the-system-should-be-fast-and-responsive',
    title: 'Challenge 3: The System Should be Fast and Responsive',
  },
  {
    id: 'challenge-4-inconsistent-outdated-states',
    title: 'Challenge 4: Inconsistent (outdated) States',
  },
  { id: 'designing-for-scale', title: 'Designing for Scale' },
  { id: 'decomposition', title: 'Decomposition' },
  { id: 'vertical-scaling', title: 'Vertical Scaling' },
  { id: 'horizontal-scaling', title: 'Horizontal Scaling' },
  { id: 'partitioning', title: 'Partitioning' },
  { id: 'caching', title: 'Caching' },
  { id: 'buffer-with-message-queues', title: 'Buffer with Message Queues' },
  { id: 'separating-read-and-write', title: 'Separating Read and Write' },
  { id: 'combining-techniques', title: 'Combining Techniques' },
  { id: 'adapting-to-changing-business-requirements', title: 'Adapting to Changing Business Requirements' },
  { id: 'master-template', title: 'Master Template' },
]

export const primerProblemSolutions: PrimerSolutionLink[] = [
  { id: 'design-leetcode', title: 'Design LeetCode', path: '#' },
  { id: 'design-url-shortener', title: 'Design URL Shortener', path: '#' },
  { id: 'design-webhook', title: 'Design Webhook', path: '#' },
  { id: 'design-google-doc', title: 'Design a Collaborative Editing System like Google Docs', path: '#' },
]

export const primerComments: PrimerComment[] = [
  {
    user: {
      name: 'mohan nair',
      avatar: 'https://lh3.googleusercontent.com/a/ACg8ocIYYAv_Jxbv5E54xzXGGx79h0-cjx8_ELwRtH9qLlRnGHXuBw=s96-c',
    },
    content:
      'How is the GET request for tweets returning the likes and comments since those are stored in Engagement DB as per the HLD?',
    date: 'Tue Sep 23 2025',
  },
  {
    user: {
      name: 'PLuna',
      avatar: 'https://lh3.googleusercontent.com/a/ACg8ocLLWGkWBYCMVivKjQk37HKyGhmwKZoNBX9H6IZ1rqoPNTqIww=s96-c',
    },
    content:
      "This is awesome. Thank you so much for posting this. One thing that confuses me is how to get good at the API Design part.",
    date: 'Wed Jul 30 2025',
  },
  {
    user: {
      name: 'Don Mamaril',
      avatar: 'https://lh3.googleusercontent.com/a/ACg8ocLLQXvqV9TlsnjJQdOLcYUb4wqE_8zNoT93s8W2QoOkeQVcZQ=s96-c',
    },
    content: 'This was an excellent primer. Thank you!',
    date: 'Sun Jul 20 2025',
  },
]

export const primerCta = {
  title: 'The System Design Courses',
  description:
    'Go beyond memorizing solutions to specific problems. Learn the core concepts, patterns and templates to solve any problem.',
  link: '#',
  buttonText: 'Start Learning',
}

export const primerMetadata: PrimerMetadataItem[] = [
  { label: 'Reading Time', value: '15 minutes', icon: 'duration' },
  { label: 'Difficulty', value: 'Intermediate', icon: 'level' },
  { label: 'Last Updated', value: 'September 2025', icon: 'calendar' },
]
