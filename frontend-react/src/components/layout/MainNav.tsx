import { ChevronDownIcon, CodeBracketIcon, MoonIcon, SunIcon } from '../icons/IconLibrary'

export type AppPage = 'courses' | 'practice' | 'primer' | 'pricing'

interface MainNavProps {
  activePage: AppPage
  onNavigate: (page: AppPage) => void
  theme: 'light' | 'dark'
  onToggleTheme: () => void
}

const navItems: { id: AppPage; label: string }[] = [
  { id: 'courses', label: 'Learn' },
  { id: 'practice', label: 'Practice' },
  { id: 'primer', label: 'Primer' },
  { id: 'pricing', label: 'Pricing' },
]

const MainNav = ({ activePage, onNavigate, theme, onToggleTheme }: MainNavProps) => {
  return (
    <nav className="main-nav">
      <div className="nav-container">
        <div className="nav-left">
          <a href="#" className="nav-logo-link">
            <CodeBracketIcon className="nav-logo-icon" />
            <span className="nav-logo-text">System Design School</span>
          </a>
          <div className="nav-links">
            {navItems.map((item) => (
              <button
                key={item.id}
                className={item.id === activePage ? 'active' : ''}
                onClick={() => onNavigate(item.id)}
                type="button"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
        <div className="nav-right">
          <div className="nav-links">
            <button type="button">
              <span>Tools</span>
              <ChevronDownIcon style={{ width: '1rem', height: '1rem' }} />
            </button>
          </div>
          <button
            onClick={onToggleTheme}
            className="theme-toggle"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            type="button"
          >
            {theme === 'dark' ? <SunIcon style={{ color: '#facc15' }} /> : <MoonIcon />}
          </button>
          <button className="login-btn" type="button">
            Login
          </button>
        </div>
      </div>
    </nav>
  )
}

export default MainNav
