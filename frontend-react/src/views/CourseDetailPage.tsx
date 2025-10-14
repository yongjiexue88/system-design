import Link from 'next/link'
import type { CourseDetailContent, CourseSection } from '@/types/content'

interface CourseDetailPageProps {
  section: CourseSection
  detail: CourseDetailContent
}

const CourseDetailPage = ({ section, detail }: CourseDetailPageProps) => {
  return (
    <article className="course-detail">
      <Link href="/courses" className="breadcrumb-link">
        ← Back to Courses
      </Link>

      <h1 className="page-title" style={{ marginBottom: '1rem' }}>
        {detail.hero}
      </h1>
      <p className="text-tertiary" style={{ fontSize: '1.05rem', maxWidth: '52rem', marginBottom: '2rem' }}>
        {detail.overview}
      </p>

      <section className="detail-section">
        <h2 className="section-title" style={{ fontSize: '1.5rem' }}>
          What You Will Learn
        </h2>
        <ul className="detail-pill-list">
          {section.learningObjectives.map((objective) => (
            <li key={objective}>{objective}</li>
          ))}
        </ul>
      </section>

      <section className="detail-section">
        <h2 className="section-title" style={{ fontSize: '1.5rem' }}>
          Course Modules
        </h2>
        <div className="course-detail-modules">
          {detail.modules.map((module) => (
            <div key={module.title} className="course-detail-module">
              <h3>{module.title}</h3>
              <p className="text-tertiary">{module.description}</p>
            </div>
          ))}
        </div>
      </section>

      {detail.nextSteps && detail.nextSteps.length > 0 ? (
        <section className="detail-section">
          <h2 className="section-title" style={{ fontSize: '1.5rem' }}>
            Next Steps
          </h2>
          <ul className="detail-list">
            {detail.nextSteps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ul>
        </section>
      ) : null}
    </article>
  )
}

export default CourseDetailPage
