import Link from 'next/link'
import type { PracticeDetailContent, PracticeQuestion } from '@/types/content'

interface PracticeDetailPageProps {
  question: PracticeQuestion
  detail: PracticeDetailContent
}

const PracticeDetailPage = ({ question, detail }: PracticeDetailPageProps) => {
  return (
    <article className="practice-detail">
      <Link href="/practices" className="breadcrumb-link">
        ← Back to Practice
      </Link>

      <header>
        <h1 className="page-title" style={{ marginBottom: '0.75rem' }}>
          {question.name}
        </h1>
        <div className="practice-detail-meta">
          <span className={`practice-item-difficulty difficulty-${question.difficulty.toLowerCase()}`}>
            {question.difficulty}
          </span>
          <span className="practice-detail-meta-item">{question.companies}+ companies ask this</span>
          <span className="practice-detail-meta-item">{question.status}</span>
        </div>
      </header>

      <p className="text-tertiary" style={{ fontSize: '1.05rem', maxWidth: '52rem', margin: '1.5rem 0' }}>
        {detail.overview}
      </p>

      <section className="detail-section">
        <h2 className="section-title" style={{ fontSize: '1.5rem' }}>
          Breakdown
        </h2>
        <div className="practice-detail-sections">
          {detail.sections.map((section) => (
            <div key={section.title} className="practice-detail-section">
              <h3>{section.title}</h3>
              <p className="text-tertiary">{section.description}</p>
              {section.bullets && section.bullets.length > 0 ? (
                <ul className="detail-list">
                  {section.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          ))}
        </div>
      </section>

      {detail.practiceTips && detail.practiceTips.length > 0 ? (
        <section className="detail-section">
          <h2 className="section-title" style={{ fontSize: '1.5rem' }}>
            Interview Tips
          </h2>
          <ul className="detail-pill-list">
            {detail.practiceTips.map((tip) => (
              <li key={tip}>{tip}</li>
            ))}
          </ul>
        </section>
      ) : null}
    </article>
  )
}

export default PracticeDetailPage
