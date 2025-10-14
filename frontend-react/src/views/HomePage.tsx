import Link from 'next/link'
import { courseSections } from '@/data/courses'
import { practiceQuestions } from '@/data/practice'

const HomePage = () => {
  const featuredCourse = courseSections[0]
  const featuredPractice = practiceQuestions.find((question) => question.status === 'Start Now')

  return (
    <div className="home-page">
      <section className="section-container">
        <div className="home-hero">
          <h1 className="page-title" style={{ marginBottom: '1.5rem' }}>
            Build Systems Skills With a Repeatable Plan
          </h1>
          <p className="text-tertiary" style={{ fontSize: '1.1rem', maxWidth: '46rem' }}>
            Tackle system design interviews with confidence. Move from foundations, to domain deep dives, to practicing
            real prompts — all in one place.
          </p>
          <div className="home-hero-actions">
            <Link href="/courses" className="sd-card-start-btn">
              Explore Courses
            </Link>
            <Link href="/practices" className="home-secondary-btn">
              Start Practicing
            </Link>
          </div>
        </div>
      </section>

      <section className="section-container">
        <h2 className="section-title">Everything You Need to Prepare</h2>
        <div className="home-feature-grid">
          <Link href="/courses" className="home-feature-card">
            <p className="home-feature-label">Learn</p>
            <h3>{featuredCourse?.title}</h3>
            <p className="text-tertiary">{featuredCourse?.summary}</p>
            <span className="home-feature-cta">Browse all courses →</span>
          </Link>

          <Link
            href={featuredPractice ? `/practices/${featuredPractice.slug}` : '/practices'}
            className="home-feature-card"
          >
            <p className="home-feature-label">Practice</p>
            <h3>{featuredPractice?.name ?? 'System Design Warmups'}</h3>
            <p className="text-tertiary">{featuredPractice?.summary ?? 'Solve prompts with detailed checklists.'}</p>
            <span className="home-feature-cta">Open practice set →</span>
          </Link>

          <Link href="/primer" className="home-feature-card">
            <p className="home-feature-label">Primer</p>
            <h3>System Design Primer</h3>
            <p className="text-tertiary">
              Refresh the vocabulary, components, and mental models you will reference in every interview.
            </p>
            <span className="home-feature-cta">Read the primer →</span>
          </Link>

          <Link href="/pricing" className="home-feature-card">
            <p className="home-feature-label">Join</p>
            <h3>Flexible Plans</h3>
            <p className="text-tertiary">
              Choose a membership tier that meets your pace — monthly with live support or lifetime access.
            </p>
            <span className="home-feature-cta">See pricing →</span>
          </Link>
        </div>
      </section>
    </div>
  )
}

export default HomePage
