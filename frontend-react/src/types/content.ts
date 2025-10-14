export type DifficultyLabel = 'Easy' | 'Medium' | 'Hard'
export type PracticeStatus = 'Start Now' | 'Coming Soon'

export interface Topic {
  name: string
  completed: boolean
}

export interface CourseSection {
  section: string
  title: string
  completed: number
  total: number
  topics: Topic[]
}

export interface PracticeQuestion {
  name: string
  companies: number
  difficulty: DifficultyLabel
  status: PracticeStatus
}

export interface PricingPlan {
  plan: string
  price: string
  period?: string
  originalPrice?: string
  features: string[]
  buttonText?: string
  isPopular?: boolean
}

export interface PrimerSidebarLink {
  id: string
  title: string
}

export interface PrimerSolutionLink {
  id: string
  title: string
  path: string
}

export type PrimerMetadataIcon = 'calendar' | 'level' | 'duration'

export interface PrimerMetadataItem {
  label: string
  value: string
  icon: PrimerMetadataIcon
}

export interface PrimerComment {
  user: {
    name: string
    avatar?: string
  }
  content: string
  date: string
}

export interface FeatureItem {
  icon: 'sparkles' | 'path' | 'template'
  title: string
  description: string
}

export interface AudiencePoint {
  text: string
}

export interface FaqItem {
  question: string
  answer: string
}
