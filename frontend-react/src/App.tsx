import { useEffect, useMemo, useState } from 'react'
import MainNav, { type AppPage } from './components/layout/MainNav'
import PromoBar from './components/layout/PromoBar'
import CoursesPage from './pages/CoursesPage'
import PracticePage from './pages/PracticePage'
import PrimerPage from './pages/PrimerPage'
import PricingPage from './pages/PricingPage'

const App = () => {
  const [page, setPage] = useState<AppPage>('practice')
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [showPromo, setShowPromo] = useState(true)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  const content = useMemo(() => {
    switch (page) {
      case 'courses':
        return <CoursesPage />
      case 'practice':
        return <PracticePage />
      case 'primer':
        return <PrimerPage />
      case 'pricing':
        return <PricingPage />
      default:
        return <PracticePage />
    }
  }, [page])

  return (
    <div>
      <PromoBar
        visible={showPromo}
        message="Welcome, NeetCode users! You've unlocked a special lifetime discount—just for you."
        emoji="🚀"
        href="#"
        onDismiss={() => setShowPromo(false)}
      />
      <MainNav
        activePage={page}
        onNavigate={setPage}
        theme={theme}
        onToggleTheme={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      />
      <main>
        <div className="main-content-area">{content}</div>
      </main>
    </div>
  )
}

export default App
