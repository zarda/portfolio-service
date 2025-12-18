import { ReactNode, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '@/features/portfolio/hooks/useTheme'
import { EditorInitializer } from './EditorInitializer'

interface AdminLayoutProps {
  children: ReactNode
}

interface NavItem {
  path: string
  label: string
  icon: string
}

const navItems: NavItem[] = [
  { path: '/admin', label: 'Dashboard', icon: '📊' },
  { path: '/admin/profile', label: 'Profile', icon: '👤' },
  { path: '/admin/skills', label: 'Skills', icon: '⚡' },
  { path: '/admin/projects', label: 'Projects', icon: '💼' },
  { path: '/admin/contact', label: 'Contact', icon: '📧' },
  { path: '/admin/versions', label: 'Versions', icon: '🔄' },
]

export function AdminLayout({ children }: AdminLayoutProps) {
  const { mode, toggleMode } = useTheme()
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const isActive = (path: string) => {
    if (path === '/admin') {
      return location.pathname === '/admin'
    }
    return location.pathname.startsWith(path)
  }

  return (
    <div className="admin-layout">
      {/* Mobile Header */}
      <header className="admin-header glass">
        <div className="admin-header__content">
          <button
            className="admin-header__menu-btn"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle sidebar"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          <Link to="/admin" className="admin-header__logo text-gradient fw-bold">
            Portfolio Admin
          </Link>
          <div className="admin-header__actions">
            <button
              className="theme-toggle rounded-full flex-center"
              onClick={toggleMode}
              aria-label={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}
            >
              {mode === 'light' ? '🌙' : '☀️'}
            </button>
            <Link to="/" className="btn btn-sm btn-outline" target="_blank">
              View Site
            </Link>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'admin-sidebar--open' : ''}`}>
        <div className="admin-sidebar__header">
          <div className="admin-sidebar__header-row">
            <Link to="/admin" className="admin-sidebar__logo text-gradient fw-bold text-xl">
              Portfolio Admin
            </Link>
            <button
              className="theme-toggle rounded-full flex-center"
              onClick={toggleMode}
              aria-label={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}
            >
              {mode === 'light' ? '🌙' : '☀️'}
            </button>
          </div>
        </div>

        <nav className="admin-sidebar__nav">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`admin-sidebar__link ${isActive(item.path) ? 'admin-sidebar__link--active' : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              <span className="admin-sidebar__icon">{item.icon}</span>
              <span className="admin-sidebar__label">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="admin-sidebar__footer">
          <a href="/" className="btn btn-outline w-full" target="_blank" rel="noopener noreferrer">
            View Live Site
          </a>
          <a href="/preview" className="btn btn-ghost w-full" target="_blank" rel="noopener noreferrer">
            Preview Changes
          </a>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="admin-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="admin-main">
        <EditorInitializer>
          {children}
        </EditorInitializer>
      </main>
    </div>
  )
}
