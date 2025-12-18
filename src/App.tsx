import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { PortfolioPage } from '@/pages'
import { AdminLayout } from '@/features/admin/components/AdminLayout'
import { Dashboard } from '@/features/admin/components/Dashboard'
import { ProfileEditor } from '@/features/admin/components/ProfileEditor'
import { SkillsEditor } from '@/features/admin/components/SkillsEditor'
import { ProjectsEditor } from '@/features/admin/components/ProjectsEditor'
import { ContactEditor } from '@/features/admin/components/ContactEditor'
import { VersionManager } from '@/features/admin/components/VersionManager'

// Initialize portfolio data layer and service
import '@/features/portfolio/data'
import { PortfolioService } from '@/features/portfolio/services/PortfolioService'
import { PortfolioEditorService } from '@/features/admin/services/PortfolioEditorService'

// Initialize PortfolioService (auto-detects version and theme from URL/preferences)
PortfolioService.initialize()

// Initialize PortfolioEditorService to load any stored draft (for preview mode)
PortfolioEditorService.getInstance()

function AdminRoutes() {
  return (
    <AdminLayout>
      <Routes>
        <Route index element={<Dashboard />} />
        <Route path="profile" element={<ProfileEditor />} />
        <Route path="skills" element={<SkillsEditor />} />
        <Route path="projects" element={<ProjectsEditor />} />
        <Route path="contact" element={<ContactEditor />} />
        <Route path="versions" element={<VersionManager />} />
      </Routes>
    </AdminLayout>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PortfolioPage />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
        <Route path="/preview" element={<PortfolioPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
