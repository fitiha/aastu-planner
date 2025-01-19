'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TeamMemberCard } from '@/components/team-member-card'
import { users } from '@/lib/sample-data'

interface User {
  id: string
  name: string
  email: string
  role: string
  department: string
  superior?: string
  subordinates?: string[]
}

export default function TeamPage() {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [teamMembers, setTeamMembers] = useState<User[]>([])
  const router = useRouter()

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser')
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser)
      setCurrentUser(parsedUser)
      if (parsedUser.role !== 'staff') {
        const subordinates = users.filter(u => parsedUser.subordinates?.includes(u.id))
        setTeamMembers(subordinates)
      } else {
        router.push('/dashboard')
      }
    } else {
      router.push('/login')
    }
  }, [router])

  if (!currentUser || currentUser.role === 'staff') {
    return null
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#2E2E31]">Team Management</h1>
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-x33PChvxQsoH9fZvg3zlmVU3yb32Cw.png"
          alt="AASTU Logo"
          width={100}
          height={40}
          className="object-contain"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamMembers.map((member) => (
          <TeamMemberCard
            key={member.id}
            member={member}
            onClick={() => router.push(`/dashboard/team/${member.id}/plans`)}
          />
        ))}
      </div>
    </div>
  )
}

