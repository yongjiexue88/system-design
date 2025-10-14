import type { FeatureItem } from '../../types/content'
import { PathIcon, SparklesIcon, TemplateIcon } from '../icons/IconLibrary'

const featureIconMap: Record<FeatureItem['icon'], JSX.Element> = {
  sparkles: <SparklesIcon />,
  path: <PathIcon />,
  template: <TemplateIcon />,
}

interface FeaturesSectionProps {
  features: FeatureItem[]
}

const FeaturesSection = ({ features }: FeaturesSectionProps) => {
  return (
    <div className="section-container">
      <div className="features-grid">
        {features.map((feature) => (
          <div key={feature.title} className="feature-item">
            <div className="feature-icon-wrapper">{featureIconMap[feature.icon]}</div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FeaturesSection
