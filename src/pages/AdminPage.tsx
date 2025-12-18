import { AdminLayout } from '@/features/admin/components/AdminLayout'
import { Dashboard } from '@/features/admin/components/Dashboard'

export default function AdminPage() {
  return (
    <AdminLayout>
      <Dashboard />
    </AdminLayout>
  )
}
