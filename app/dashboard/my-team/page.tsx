'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TeamMemberCard } from '@/components/team-member-card'
import { users, plans, reports } from '@/lib/sample-data'
import { Users, UserPlus, ClipboardList, FileText } from 'lucide-react'
import { ScrollArea } from "@/components/ui/scroll-area"
import { motion } from "framer-motion"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

export default function MyTeamPage() {
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [teamMembers, setTeamMembers] = useState<any[]>([])
  const [teamStats, setTeamStats] = useState({
    totalMembers: 0,
    totalPendingPlans: 0,
    totalPendingReports: 0
  })
  const router = useRouter()

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser')
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser)
      setCurrentUser(parsedUser)
      if (parsedUser.role !== 'staff') {
        const subordinates = users.filter(u => u.superior === parsedUser.id)
        setTeamMembers(subordinates)
        
        // Calculate team statistics
        const totalPendingPlans = plans.filter(p => 
          subordinates.some(s => s.id === p.createdBy) && p.status === 'Pending Review'
        ).length
        
        const totalPendingReports = reports.filter(r => 
          subordinates.some(s => s.id === r.submittedBy) && r.status === 'Pending Review'
        ).length

        setTeamStats({
          totalMembers: subordinates.length,
          totalPendingPlans,
          totalPendingReports
        })
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
    <div className="container rounded-xl mx-auto py-8 flex flex-col h-[calc(100vh-4rem)] bg-gradient-to-b from-blue-100 to-white transition-all duration-300 ease-in-out">
    <motion.div
      className="flex items-center gap-3 mb-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1 className="text-3xl font-bold text-[#1A237E] px-4" {...fadeInUp}>
        My Teams
      </motion.h1>
    </motion.div>

      {/* Team Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
        <Card className="bg-gradient-to-br from-[#1A237E] to-[#2A337E] text-white">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="rounded-full bg-white/10 p-3">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium">Total Members</p>
              <h2 className="text-2xl font-bold">{teamStats.totalMembers}</h2>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-[#C49B1D] to-[#D4AB2D] text-white">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="rounded-full bg-white/10 p-3">
              <ClipboardList className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium">Pending Plans</p>
              <h2 className="text-2xl font-bold">{teamStats.totalPendingPlans}</h2>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-[#C49B1D] to-[#D4AB2D] text-white">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="rounded-full bg-white/10 p-3">
              <FileText className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium">Pending Reports</p>
              <h2 className="text-2xl font-bold">{teamStats.totalPendingReports}</h2>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Team Members Grid */}
      <Card className="border-t-4 border-t-[#1A237E]">
        <CardHeader className="bg-gradient-to-r from-[#1A237E] to-[#2A337E] text-white">
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Team Members
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <ScrollArea className="h-[calc(100vh-24rem)]">
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
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}

