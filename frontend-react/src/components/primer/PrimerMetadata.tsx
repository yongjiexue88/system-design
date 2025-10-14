import type { PrimerMetadataItem, PrimerMetadataIcon } from '../../types/content'
import { BookOpenIcon, SparklesIcon, SunIcon } from '../icons/IconLibrary'

interface PrimerMetadataProps {
  metadata: PrimerMetadataItem[]
}

const iconMap: Record<PrimerMetadataIcon, JSX.Element> = {
  calendar: <SunIcon />,
  level: <SparklesIcon />,
  duration: <BookOpenIcon />,
}

const PrimerMetadata = ({ metadata }: PrimerMetadataProps) => {
  if (!metadata.length) {
    return null
  }

  return (
    <div className="primer-content-metadata">
      {metadata.map((item) => (
        <div key={item.label}>
          <div className="metadata-title">{item.label}</div>
          <ul className="metadata-list">
            <li>
              <div className="icon">{iconMap[item.icon]}</div>
              <span>{item.value}</span>
            </li>
          </ul>
        </div>
      ))}
    </div>
  )
}

export default PrimerMetadata
