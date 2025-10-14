interface CtaCardProps {
  title: string
  description: string
  href: string
  buttonText: string
  className?: string
}

const CtaCard = ({ title, description, href, buttonText, className = '' }: CtaCardProps) => {
  return (
    <div className={`cta-card ${className}`}>
      <p className="cta-card-title">{title}</p>
      <p className="cta-card-desc">{description}</p>
      <a href={href} className="cta-card-btn">
        {buttonText}
      </a>
    </div>
  )
}

export default CtaCard
