import type { AudiencePoint, FeatureItem, FaqItem, PricingPlan } from '../types/content'

export const pricingPlans: PricingPlan[] = [
  {
    plan: 'Free',
    price: '0',
    features: ['Practice free questions.', 'Accessing free course content.'],
    buttonText: 'Free Forever',
    isPopular: false,
  },
  {
    plan: 'Pro Yearly',
    price: '45',
    period: '/yr',
    originalPrice: '99.99',
    features: ['Unlock all system design courses.', 'Access to continuously updating questions and content.'],
    buttonText: 'Upgrade',
    isPopular: true,
  },
  {
    plan: 'Pro Lifetime',
    price: '99',
    originalPrice: '198',
    features: ['Paid once, own forever', 'Access to all future updates'],
    buttonText: 'Upgrade',
    isPopular: false,
  },
]

export const testimonial = {
  name: 'Ram',
  avatar: 'https://i.pravatar.cc/64?u=ram',
  quote:
    '"This is the quickest, most comprehensive way to get interview ready in a practical fashion..."',
}

export const audiencePoints: AudiencePoint[] = [
  {
    text: 'Software engineers preparing for Big Tech or mid to senior-level system design interviews.',
  },
  {
    text: 'Mid-level developers looking to strengthen architectural fundamentals and grow into leadership roles.',
  },
  {
    text: 'Students & boot-camp grads who want to learn beyond basic coding and level up their system design skills.',
  },
]

export const featureHighlights: FeatureItem[] = [
  {
    icon: 'sparkles',
    title: 'Interactive Practice',
    description: 'Practice real-world system design questions and get instant AI-powered feedback.',
  },
  {
    icon: 'path',
    title: 'Structured Learning Paths',
    description: 'Follow a curated curriculum built by ex-FAANG engineers - from fundamentals to advanced topics.',
  },
  {
    icon: 'template',
    title: 'Reusable Design Templates',
    description: 'Accelerate interviews with proven patterns you can adapt to any problem.',
  },
]

export const faqs: FaqItem[] = [
  {
    question: 'How is System Design School different from other resources?',
    answer:
      '1) Structured approach - teach a person to fish. Beyond canned write-ups, we give you a full conceptual toolkit, reusable design patterns and show you how you can adapt to any problem. 2) Hands-on practice & instant AI feedback. Stop passively watching videos.',
  },
  {
    question: 'Is the subscription really worth it?',
    answer: "Absolutely! Thanks to our limited-time promotion, the entry plan is only $0.12/day -- that's an insane deal.",
  },
  {
    question: 'Can I cancel at any time?',
    answer:
      "Absolutely. You can cancel your subscription in one click from your dashboard -- you will retain access until the end of your current billing cycle.",
  },
  {
    question: 'Do you offer a money-back guarantee?',
    answer:
      "Yes! All paid plans come with a 7-day, 100% money-back guarantee. If you're not satisfied, just reach out and we'll refund you--no questions asked.",
  },
]
