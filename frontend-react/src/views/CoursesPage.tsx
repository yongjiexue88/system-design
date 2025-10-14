import SystemDesignCard from '@/components/cards/SystemDesignCard'
import { courseSections } from '@/data/courses'

const CoursesPage = () => {
  return (
    <div>
      <h1 className="page-title">System Design Courses</h1>
      <div className="card-grid">
        {courseSections.map((section) => (
          <SystemDesignCard
            key={section.section}
            section={section.section}
            title={section.title}
            summary={section.summary}
            href={`/courses/${section.slug}`}
            completed={section.completed}
            total={section.total}
            topics={section.topics}
          />
        ))}
      </div>
    </div>
  )
}

export default CoursesPage
