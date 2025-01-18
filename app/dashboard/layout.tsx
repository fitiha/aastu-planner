import { ReactNode } from 'react'
import Link from 'next/link'

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-4">
        <h1 className="text-2xl font-bold mb-6">AASTU Planner</h1>
        <nav className="space-y-2">
          <Link href="/dashboard" className="block py-2 px-4 rounded hover:bg-gray-700">
            Dashboard
          </Link>
          <Link href="/dashboard/plans" className="block py-2 px-4 rounded hover:bg-gray-700">
            Plans
          </Link>
          <Link href="/dashboard/reports" className="block py-2 px-4 rounded hover:bg-gray-700">
            Reports
          </Link>
          <Link href="/dashboard/team" className="block py-2 px-4 rounded hover:bg-gray-700">
            Team
          </Link>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  )
}

