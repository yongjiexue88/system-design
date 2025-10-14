import PracticeList from '@/components/practice/PracticeList'
import { practiceQuestions } from '@/data/practice'

const PracticePage = () => {
  return (
    <div className="practice-page">
      <h1 className="page-title" style={{ padding: 0 }}>
        Practice System Design Questions
      </h1>
      <p className="text-tertiary" style={{ marginBottom: '1.5rem' }}>
        Select a problem to start practicing.
      </p>
      <PracticeList questions={practiceQuestions} />
    </div>
  )
}

export default PracticePage
