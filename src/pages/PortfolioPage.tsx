import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Skills from '@/components/Skills'
import Projects from '@/components/Projects'
import Resume from '@/components/Resume'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import { useTheme } from '@/features/theme'
import { PortfolioService } from '@/features/portfolio/services/PortfolioService'

export default function PortfolioPage() {
  const { mode, toggleMode } = useTheme()
  const location = useLocation()
  const isPreview = location.pathname === '/preview'
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const service = PortfolioService.getInstance()

    if (isPreview) {
      const availableVersions = service.getAvailableVersions()
      // Only switch to preview if it exists
      if (availableVersions.includes('preview')) {
        service.switchVersion('preview')
      }
    }

    // Mark as ready to render after version is set
    setIsReady(true)
  }, [isPreview])

  // Don't render until we've set up the correct version
  if (!isReady) {
    return null
  }

  return (
    <div className={`app ${isPreview ? 'app--preview' : ''}`}>
      {isPreview && (
        <div className="preview-banner">
          Preview Mode - Changes are not yet published
        </div>
      )}
      <Header theme={mode} toggleTheme={toggleMode} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Resume />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
