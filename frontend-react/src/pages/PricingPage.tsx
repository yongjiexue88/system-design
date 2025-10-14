import PricingCard from '../components/cards/PricingCard'
import FeaturesSection from '../components/pricing/FeaturesSection'
import FaqSection from '../components/pricing/FaqSection'
import TargetAudience from '../components/pricing/TargetAudience'
import { audiencePoints, faqs, featureHighlights, pricingPlans, testimonial } from '../data/pricing'

const PricingPage = () => {
  return (
    <div className="pricing-page-container">
      <h1 className="page-title" style={{ fontSize: '2.25rem', fontWeight: 800 }}>
        Invest in Your System Design Mastery
      </h1>
      <p className="text-tertiary" style={{ maxWidth: '42rem', margin: '1rem auto 0', fontSize: '1.125rem' }}>
        Acing your system design skills isn&apos;t just about the next interview — it&apos;s about elevating your entire career
        trajectory.
      </p>

      <div className="pricing-page-grid">
        {pricingPlans.map((plan) => (
          <PricingCard key={plan.plan} plan={plan} />
        ))}
      </div>

      <div className="section-container" style={{ textAlign: 'center' }}>
        <h2 className="section-title">Our user says it best</h2>
        <div className="cta-card" style={{ maxWidth: '42rem', margin: '0 auto' }}>
          <img
            src={testimonial.avatar}
            alt={testimonial.name}
            style={{ width: '4rem', height: '4rem', borderRadius: '9999px', margin: '0 auto 1rem' }}
          />
          <blockquote className="text-secondary testimonial-quote">{testimonial.quote}</blockquote>
          <p style={{ fontWeight: 600, marginTop: '1rem' }}>{testimonial.name}</p>
        </div>
      </div>

      <TargetAudience title="Who is System Design School for?" points={audiencePoints} />
      <FeaturesSection features={featureHighlights} />
      <FaqSection title="Frequently Asked Questions" faqs={faqs} />
    </div>
  )
}

export default PricingPage
