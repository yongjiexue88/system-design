import type { PricingPlan } from '../../types/content'
import { CheckmarkIcon } from '../icons/IconLibrary'

interface PricingCardProps {
  plan: PricingPlan
}

const PricingCard = ({ plan }: PricingCardProps) => {
  const { plan: name, price, period, originalPrice, features, buttonText = 'Upgrade', isPopular } = plan

  return (
    <div className={`pricing-card ${isPopular ? 'pricing-card-popular' : ''}`}>
      {isPopular ? <span className="popular-badge">Most Popular</span> : null}
      <h3 style={{ fontSize: '1.125rem', fontWeight: 600 }}>{name}</h3>
      <p className="pricing-card-price">
        <span className="price-amount">${price}</span>
        {period ? <span className="price-period">{period}</span> : null}
        {originalPrice ? <span className="price-original">from ${originalPrice}</span> : null}
      </p>
      <button className="pricing-card-button" type="button">
        {buttonText}
      </button>
      <ul className="pricing-card-features">
        {features.map((feature) => (
          <li key={feature} className="pricing-card-feature">
            <CheckmarkIcon />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PricingCard
