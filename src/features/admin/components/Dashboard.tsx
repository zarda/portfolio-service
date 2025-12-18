import { useState } from 'react'
import { Link } from 'react-router-dom'
import { PortfolioService } from '@/features/portfolio/services/PortfolioService'

interface AdminCard {
  icon: string
  title: string
  description: string
  link: string
  linkText: string
}

const adminCards: AdminCard[] = [
  {
    icon: '👤',
    title: 'Profile',
    description: 'Edit your name, title, greeting, bio, and profile photo',
    link: '/admin/profile',
    linkText: 'Edit Profile',
  },
  {
    icon: '⚡',
    title: 'Skills',
    description: 'Manage your skill categories and proficiency levels',
    link: '/admin/skills',
    linkText: 'Edit Skills',
  },
  {
    icon: '💼',
    title: 'Projects',
    description: 'Add, edit, or remove projects from your portfolio',
    link: '/admin/projects',
    linkText: 'Edit Projects',
  },
  {
    icon: '📧',
    title: 'Contact',
    description: 'Update your contact information and social links',
    link: '/admin/contact',
    linkText: 'Edit Contact',
  },
]

export function Dashboard() {
  const service = PortfolioService.getInstance()
  const [currentVersion, setCurrentVersion] = useState(service.getCurrentVersion())
  const versions = service.getAvailableVersions()
  const profile = service.getProfile()

  const handleVersionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newVersion = e.target.value
    service.switchVersion(newVersion)
    setCurrentVersion(newVersion)
  }

  const handleNewVersion = () => {
    const name = prompt('Enter a name for the new version:')
    if (name) {
      alert(`Version "${name}" would be created. (Feature coming soon with PortfolioEditorService)`)
    }
  }

  return (
    <div className="admin-dashboard">
      <header className="admin-dashboard__header">
        <h1 className="admin-dashboard__title">
          Welcome back, {profile.name.split(' ')[0]}
        </h1>
        <p className="admin-dashboard__subtitle">
          Manage your portfolio content and settings
        </p>
      </header>

      {/* Version Selector */}
      <div className="version-selector">
        <label className="version-selector__label" htmlFor="version-select">
          Current Version:
        </label>
        <select
          id="version-select"
          className="version-selector__select"
          value={currentVersion}
          onChange={handleVersionChange}
        >
          {versions.map((version) => (
            <option key={version} value={version}>
              {version}
            </option>
          ))}
        </select>
        <div className="version-selector__actions">
          <button className="btn btn-sm btn-outline" onClick={handleNewVersion}>
            + New Version
          </button>
          <Link
            to={`/preview?version=${currentVersion}`}
            className="btn btn-sm btn-ghost"
            target="_blank"
          >
            Preview
          </Link>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="admin-cards">
        {adminCards.map((card) => (
          <div key={card.title} className="admin-card">
            <div className="admin-card__header">
              <span className="admin-card__icon">{card.icon}</span>
            </div>
            <h3 className="admin-card__title">{card.title}</h3>
            <p className="admin-card__description">{card.description}</p>
            <Link to={card.link} className="admin-card__action">
              {card.linkText} &rarr;
            </Link>
          </div>
        ))}
      </div>

      {/* Quick Overview */}
      <div className="editor-section">
        <div className="editor-section__header">
          <h2 className="editor-section__title">Portfolio Overview</h2>
        </div>
        <div className="editor-section__content">
          <div className="admin-cards">
            <div className="admin-card">
              <div className="admin-card__header">
                <span className="admin-card__icon">📊</span>
              </div>
              <h3 className="admin-card__title">{service.getSkillCategories().length}</h3>
              <p className="admin-card__description">Skill Categories</p>
            </div>
            <div className="admin-card">
              <div className="admin-card__header">
                <span className="admin-card__icon">🛠️</span>
              </div>
              <h3 className="admin-card__title">
                {service.getSkillCategories().reduce((acc, cat) => acc + cat.skills.length, 0)}
              </h3>
              <p className="admin-card__description">Total Skills</p>
            </div>
            <div className="admin-card">
              <div className="admin-card__header">
                <span className="admin-card__icon">💼</span>
              </div>
              <h3 className="admin-card__title">{service.getProjects().length}</h3>
              <p className="admin-card__description">Projects</p>
            </div>
            <div className="admin-card">
              <div className="admin-card__header">
                <span className="admin-card__icon">🔗</span>
              </div>
              <h3 className="admin-card__title">{service.getContactInfo().socialLinks.length}</h3>
              <p className="admin-card__description">Social Links</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
