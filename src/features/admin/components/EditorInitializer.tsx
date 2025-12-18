import { useEffect, ReactNode } from 'react'
import { useSearchParams } from 'react-router-dom'
import { PortfolioEditorService } from '../services/PortfolioEditorService'
import { PortfolioService } from '@/features/portfolio/services/PortfolioService'

interface EditorInitializerProps {
  children: ReactNode
}

export function EditorInitializer({ children }: EditorInitializerProps) {
  const [searchParams] = useSearchParams()
  const editorService = PortfolioEditorService.getInstance()

  useEffect(() => {
    // If no draft is loaded, initialize with the version from URL or default
    if (!editorService.hasDraft()) {
      const versionFromUrl = searchParams.get('version')
      const service = PortfolioService.getInstance()
      const version = versionFromUrl || service.getCurrentVersion()
      editorService.loadVersion(version)
    }
  }, [searchParams, editorService])

  return <>{children}</>
}
