'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronDownIcon, CodeBracketIcon, MoonIcon, SunIcon } from '@/components/icons/IconLibrary'

interface MainNavProps {
  theme: 'light' | 'dark'
  onToggleTheme: () => void
}

const navItems = [
  { id: 'courses', label: 'Learn', href: '/courses' },
  { id: 'practices', label: 'Practice', href: '/practices' },
  { id: 'primer', label: 'Primer', href: '/primer' },
  { id: 'pricing', label: 'Pricing', href: '/pricing' },
]

const toolLinks = [{ id: 'resource-estimator', label: 'QPS Calculator', href: '/resource-estimator' }]

const normalizePath = (pathname: string) => {
  if (!pathname) {
    return '/'
  }

  const basePath = pathname.split('?')[0].replace(/\/+$/g, '')
  if (basePath === '' || basePath === '/') {
    return '/'
  }

  return basePath.startsWith('/') ? basePath : `/${basePath}`
}

const MainNav = ({ theme, onToggleTheme }: MainNavProps) => {
  const pathname = usePathname()
  const activePath = normalizePath(pathname ?? '/')
  const [isToolsOpen, setIsToolsOpen] = useState(false)
  const toolsRef = useRef<HTMLDivElement | null>(null)

  const getItemClassName = (href: string) => {
    return activePath === href || activePath.startsWith(`${href}/`) ? 'active' : ''
  }

  useEffect(() => {
    setIsToolsOpen(false)
  }, [activePath])

  useEffect(() => {
    if (!isToolsOpen) {
      return
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (toolsRef.current && !toolsRef.current.contains(event.target as Node)) {
        setIsToolsOpen(false)
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsToolsOpen(false)
      }
    }

    window.addEventListener('mousedown', handleClickOutside)
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('mousedown', handleClickOutside)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isToolsOpen])

  return (
    <nav className="main-nav">
      <div className="nav-container">
        <div className="nav-left">
          <Link href="/" className="nav-logo-link">
            <CodeBracketIcon className="nav-logo-icon" />
            <span className="nav-logo-text">System Design School</span>
          </Link>
          <div className="nav-links">
            {navItems.map((item) => (
              <Link key={item.id} href={item.href} className={getItemClassName(item.href)}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="nav-right">
          <div className="nav-links">
            <div className={`nav-tools ${isToolsOpen ? 'open' : ''}`} ref={toolsRef}>
              <button type="button" aria-haspopup="true" aria-expanded={isToolsOpen} onClick={() => setIsToolsOpen((value) => !value)}>
                <span>Tools</span>
                <ChevronDownIcon
                  style={{
                    width: '1rem',
                    height: '1rem',
                    transition: 'transform 0.2s ease',
                    transform: isToolsOpen ? 'rotate(180deg)' : 'none',
                  }}
                />
              </button>
              {isToolsOpen ? (
                <div className="nav-tools-menu">
                  {toolLinks.map((link) => (
                    <Link key={link.id} href={link.href} className={getItemClassName(link.href)}>
                      {link.label}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
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
