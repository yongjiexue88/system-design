import type { PracticeQuestion } from '../../types/content'

interface PracticeListProps {
  questions: PracticeQuestion[]
}

const difficultyClassMap: Record<PracticeQuestion['difficulty'], string> = {
  Easy: 'difficulty-easy',
  Medium: 'difficulty-medium',
  Hard: 'difficulty-hard',
}

const PracticeList = ({ questions }: PracticeListProps) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {questions.map((question) => (
        <div key={question.name} className="practice-item">
          <div>
            <p style={{ fontWeight: 700, fontSize: '1.125rem' }}>{question.name}</p>
            <p style={{ fontSize: '0.875rem' }} className="text-tertiary">
              {question.companies} Companies
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span className={`practice-item-difficulty ${difficultyClassMap[question.difficulty]}`}>
              {question.difficulty}
            </span>
            <button
              className="sd-card-start-btn"
              style={{ marginTop: 0 }}
              disabled={question.status === 'Coming Soon'}
              type="button"
            >
              {question.status}
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default PracticeList
