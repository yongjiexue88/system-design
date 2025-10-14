import { notFound } from 'next/navigation'
import CourseDetailPage from '@/views/CourseDetailPage'
import { courseDetailContent, courseSections } from '@/data/courses'

interface CourseDetailRouteProps {
  params: {
    slug: string
  }
}

export function generateStaticParams() {
  return courseSections.map((section) => ({ slug: section.slug }))
}

export default function CourseDetailRoute({ params }: CourseDetailRouteProps) {
  const section = courseSections.find((item) => item.slug === params.slug)
  const detail = courseDetailContent[params.slug]

  if (!section || !detail) {
    notFound()
  }

  return <CourseDetailPage section={section} detail={detail} />
}
