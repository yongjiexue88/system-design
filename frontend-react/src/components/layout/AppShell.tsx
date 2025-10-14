'use client'

import { useEffect, useMemo, useState, type ReactNode } from 'react'
import MainNav from '@/components/layout/MainNav'
import PromoBar from '@/components/layout/PromoBar'

const AppShell = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [showPromo, setShowPromo] = useState(true)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  const promoBar = useMemo(() => {
    return (
      <PromoBar
        visible={showPromo}
        message="Welcome, NeetCode users! You've unlocked a special lifetime discount—just for you."
        emoji="🚀"
        href="#"
        onDismiss={() => setShowPromo(false)}
      />
    )
  }, [showPromo])

  return (
    <div>
      {promoBar}
      <MainNav theme={theme} onToggleTheme={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))} />
      <main>
        <div className="main-content-area">{children}</div>
      </main>
    </div>
  )
}

export default AppShell
