import type { AudiencePoint } from '../../types/content'
import { CheckmarkIcon } from '../icons/IconLibrary'

interface TargetAudienceProps {
  title: string
  points: AudiencePoint[]
}

const TargetAudience = ({ title, points }: TargetAudienceProps) => {
  return (
    <div className="section-container">
      <h2 className="section-title">{title}</h2>
      <div className="audience-section-box">
        <ul className="audience-list">
          {points.map((point) => (
            <li key={point.text} className="audience-list-item">
              <CheckmarkIcon />
              <span>{point.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default TargetAudience
