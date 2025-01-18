'use client'

import { ReactNode, useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Notifications } from '@/components/notifications'

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    } else {
      router.push('/login')
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('currentUser')
    router.push('/login')
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-4 fixed h-full overflow-y-auto">
        <h1 className="text-2xl font-bold mb-6">AASTU Planner</h1>
        <nav className="space-y-2 mb-6">
          <Link href="/dashboard" className="block py-2 px-4 rounded hover:bg-gray-700">
            Dashboard
          </Link>
          <Link href="/dashboard/plans" className="block py-2 px-4 rounded hover:bg-gray-700">
            Plans
          </Link>
          <Link href="/dashboard/reports" className="block py-2 px-4 rounded hover:bg-gray-700">
            Reports
          </Link>
          <Link href="/dashboard/pillars" className="block py-2 px-4 rounded hover:bg-gray-700">
            University Pillars
          </Link>
          <Link href="/dashboard/announcements" className="block py-2 px-4 rounded hover:bg-gray-700">
            Announcements
          </Link>
          {user.role !== 'staff' && (
            <Link href="/dashboard/team" className="block py-2 px-4 rounded hover:bg-gray-700">
              Team
            </Link>
          )}
          {user.role !== 'staff' && (
            <Link href="/dashboard/signup-requests" className="block py-2 px-4 rounded hover:bg-gray-700">
              Signup Requests
            </Link>
          )}
        </nav>
        <div className="absolute bottom-0 left-0 w-full p-4 bg-gray-900">
          <Link href="/dashboard/profile" className="block mb-2 text-sm hover:underline">
            {user.name}
          </Link>
          <p className="text-sm text-gray-400">{user.role}</p>
          <button onClick={handleLogout} className="mt-2 text-sm text-red-400 hover:text-red-300">
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 ml-64">
        <div className="flex justify-end mb-6">
          <Notifications />
        </div>
        {children}
      </main>
    </div>
  )
}

