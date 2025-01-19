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

  const roleBasedLinks = () => {
    if (!user) return null;

    switch (user.role) {
      case 'planning_office':
        return (
          <>
            <Link href="/dashboard/university-plans" className="block py-2 px-4 rounded hover:bg-gray-700">
              University Plans
            </Link>
            <Link href="/dashboard/vp-reports" className="block py-2 px-4 rounded hover:bg-gray-700">
              VP Reports
            </Link>
          </>
        )
      case 'vice_president':
      case 'director':
      case 'team_lead':
        return (
          <>
            <Link href="/dashboard/my-plans" className="block py-2 px-4 rounded hover:bg-gray-700">
              My Plans
            </Link>
            <Link href="/dashboard/my-reports" className="block py-2 px-4 rounded hover:bg-gray-700">
              My Reports
            </Link>
            <Link href="/dashboard/my-team" className="block py-2 px-4 rounded hover:bg-gray-700">
              My Team
            </Link>
          </>
        )
      case 'staff':
        return (
          <>
            <Link href="/dashboard/my-plans" className="block py-2 px-4 rounded hover:bg-gray-700">
              My Plans
            </Link>
            <Link href="/dashboard/my-reports" className="block py-2 px-4 rounded hover:bg-gray-700">
              My Reports
            </Link>
          </>
        )
      default:
        return null
    }
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
          {roleBasedLinks()}
          <Link href="/dashboard/pillars" className="block py-2 px-4 rounded hover:bg-gray-700">
            University Pillars
          </Link>
          <Link href="/dashboard/announcements" className="block py-2 px-4 rounded hover:bg-gray-700">
            Announcements
          </Link>
          {user && user.role !== 'staff' && (
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
          <button onClick={handleLogout} className="my-4 text-sm bg-red-700 hover:bg-red-600 text-white px-16 py-2 rounded-xl">
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

