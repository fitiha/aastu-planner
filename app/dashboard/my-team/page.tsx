'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TeamMemberCard } from '@/components/team-member-card'
import { users, plans, reports } from '@/lib/sample-data'

export default function MyTeamPage() {
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [teamMembers, setTeamMembers] = useState<any[]>([])
  const router = useRouter()

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser')
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser)
      setCurrentUser(parsedUser)
      if (parsedUser.role !== 'staff') {
        const subordinates = users.filter(u => u.superior === parsedUser.id)
        setTeamMembers(subordinates)
      } else {
        router.push('/dashboard')
      }
    } else {
      router.push('/login')
    }
  }, [router])

  const getPendingItemsCount = (memberId: string) => {
    const pendingPlans = plans.filter(p => p.createdBy === memberId && p.status === 'Pending Review').length
    const pendingReports = reports.filter(r => r.submittedBy === memberId && r.status === 'Pending Review').length
    return pendingPlans + pendingReports
  }

  if (!currentUser || currentUser.role === 'staff') {
    return null
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[#2E2E31]">My Team</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamMembers.map((member) => (
          <TeamMemberCard
            key={member.id}
            member={member}
            pendingItems={getPendingItemsCount(member.id)}
            onClick={() => router.push(`/dashboard/my-team/${member.id}`)}
          />
        ))}
      </div>
    </div>
  )
}

