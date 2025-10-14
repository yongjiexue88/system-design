import { useState } from 'react'
import type { FaqItem } from '../../types/content'
import { ChevronDownIcon } from '../icons/IconLibrary'

interface FaqSectionProps {
  title: string
  faqs: FaqItem[]
}

const FaqSection = ({ title, faqs }: FaqSectionProps) => {
  return (
    <div className="faq-container">
      <h2 className="section-title">{title}</h2>
      <div className="faq-accordion">
        {faqs.map((faq) => (
          <FaqAccordionItem key={faq.question} item={faq} />
        ))}
      </div>
    </div>
  )
}

interface FaqAccordionItemProps {
  item: FaqItem
}

const FaqAccordionItem = ({ item }: FaqAccordionItemProps) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="faq-item">
      <button onClick={() => setIsOpen((value) => !value)} className="faq-question-btn" type="button">
        <h3>{item.question}</h3>
        <ChevronDownIcon className={isOpen ? 'open' : ''} />
      </button>
      {isOpen ? (
        <div className="faq-answer">
          <p>{item.answer}</p>
        </div>
      ) : null}
    </div>
  )
}

export default FaqSection
