'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TeamMemberCard } from '@/components/team-member-card'
import { users } from '@/lib/sample-data'
import { motion } from "framer-motion"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

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
     <div className="container rounded-xl mx-auto py-8 flex flex-col h-[calc(100vh-4rem)] bg-gradient-to-b from-blue-100 to-white transition-all duration-300 ease-in-out">
          <motion.div
            className="flex items-center gap-3 mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.h1 className="text-3xl font-bold text-[#1A237E] px-4" {...fadeInUp}>
              Team Managment
            </motion.h1>
          </motion.div>

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

