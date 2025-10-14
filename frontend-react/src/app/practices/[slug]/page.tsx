import { notFound } from 'next/navigation'
import PracticeDetailPage from '@/views/PracticeDetailPage'
import { practiceDetailContent, practiceQuestions } from '@/data/practice'

interface PracticeDetailRouteProps {
  params: {
    slug: string
  }
}

export function generateStaticParams() {
  return practiceQuestions.map((question) => ({ slug: question.slug }))
}

export default function PracticeDetailRoute({ params }: PracticeDetailRouteProps) {
  const question = practiceQuestions.find((item) => item.slug === params.slug)
  const detail = practiceDetailContent[params.slug]

  if (!question || !detail) {
    notFound()
  }

  return <PracticeDetailPage question={question} detail={detail} />
}
