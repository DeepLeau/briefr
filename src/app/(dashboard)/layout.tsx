import { redirect } from 'next/navigation'
import { Sidebar } from '@/components/dashboard/Sidebar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Mock auth check - in real app, check session/auth token
  const isAuthenticated = true // Mock: always authenticated

  if (!isAuthenticated) {
    redirect('/login')
  }

  return (
    <div className="flex h-screen bg-[#0a0a0a] overflow-hidden">
      <Sidebar />
      <main className="flex-1 flex flex-col overflow-hidden">
        {children}
      </main>
    </div>
  )
}
