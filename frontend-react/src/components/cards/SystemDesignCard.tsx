import { useMemo, useState } from 'react'
import type { Topic } from '../../types/content'
import { BookOpenIcon, CheckmarkIcon, ChevronDownIcon } from '../icons/IconLibrary'

interface SystemDesignCardProps {
  section: string
  title: string
  completed: number
  total: number
  topics: Topic[]
}

const SystemDesignCard = ({ section, title, completed, total, topics }: SystemDesignCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const progress = useMemo(() => {
    if (!total) {
      return 0
    }

    return Math.min(100, Math.max(0, (completed / total) * 100))
  }, [completed, total])

  return (
    <div className="system-design-card">
      <div className="sd-card-header">
        <div>
          <p style={{ color: 'var(--blue-500)', fontSize: '0.875rem', fontWeight: 600 }}>SECTION {section}</p>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '0.25rem' }}>{title}</h2>
        </div>
        <div className="sd-card-header-icon">
          <BookOpenIcon />
        </div>
      </div>
      <div>
        <div className="sd-card-progress-bar">
          <div className="sd-card-progress" style={{ width: `${progress}%` }}></div>
        </div>
        <p className="sd-card-progress-text">
          {completed}/{total} Completed
        </p>
      </div>
      <div>
        <button onClick={() => setIsExpanded((value) => !value)} className="sd-card-topics-toggle" type="button">
          <span>Topics Covered</span>
          <ChevronDownIcon
            style={{
              width: '1.25rem',
              height: '1.25rem',
              transition: 'transform 0.3s',
              transform: isExpanded ? 'rotate(180deg)' : 'none',
            }}
          />
        </button>
        {isExpanded ? (
          <ul className="sd-card-topics-list">
            {topics.map((topic) => (
              <li key={topic.name} className="sd-card-topic-item">
                <span className={topic.completed ? 'sd-card-topic-item-completed' : ''}>{topic.name}</span>
                {topic.completed ? (
                  <CheckmarkIcon className="checkmark-icon" />
                ) : (
                  <div className="empty-circle" aria-hidden="true" />
                )}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
      <button className="sd-card-start-btn" type="button">
        Start Lesson
      </button>
    </div>
  )
}

export default SystemDesignCard
