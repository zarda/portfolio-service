import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Resume from './components/Resume'
import Contact from './components/Contact'
import Footer from './components/Footer'

// Initialize portfolio data layer and service
import '@/features/portfolio/data'
import { PortfolioService } from '@/features/portfolio/services/PortfolioService'
import { useTheme } from '@/features/portfolio/hooks/useTheme'

// Initialize PortfolioService (auto-detects version and theme from URL/preferences)
PortfolioService.initialize()

function App() {
  const { mode, toggleMode } = useTheme()

  return (
    <div className="app">
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

export default App
