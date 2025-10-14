import type { ReactNode } from 'react'
import { XCircleIcon } from '../icons/IconLibrary'

interface PromoBarProps {
  visible: boolean
  message: ReactNode
  emoji?: string
  href?: string
  onDismiss: () => void
}

const PromoBar = ({ visible, message, emoji = '🚀', href = '#', onDismiss }: PromoBarProps) => {
  if (!visible) {
    return null
  }

  return (
    <div className="promo-bar">
      <a href={href}>
        <span>{message}</span>
        {emoji ? <span style={{ marginLeft: '0.5rem' }}>{emoji}</span> : null}
      </a>
      <button onClick={onDismiss} aria-label="Dismiss promotional banner">
        <XCircleIcon />
      </button>
    </div>
  )
}

export default PromoBar
