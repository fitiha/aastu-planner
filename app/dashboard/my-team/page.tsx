'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TeamMemberCard } from '@/components/team-member-card'
import { Users, ClipboardList, FileText } from 'lucide-react'
import { ScrollArea } from "@/components/ui/scroll-area"
// import { Loader } from '@/components/ui/loader' 

export default function MyTeamPage() {
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [teamMembers, setTeamMembers] = useState<any[]>([])
  const [teamStats, setTeamStats] = useState({
    totalMembers: 0,
    totalPendingPlans: 0,
    totalPendingReports: 0,
  })
  const [loading, setLoading] = useState(true) // Loading state
  const router = useRouter()

  useEffect(() => {
    const fetchTeamData = async () => {
      const storedUser = localStorage.getItem('currentUser')
      const token = localStorage.getItem('token')

      if (!storedUser || !token) {
        router.push('/login')
        return
      }

      const parsedUser = JSON.parse(storedUser)
      setCurrentUser(parsedUser)

      if (parsedUser.role === 'staff') {
        router.push('/dashboard')
        return
      }

      try {
        setLoading(true) // Start loading

        // Fetch subordinates
        const subordinatesRes = await fetch('https://planning-server-ui10.onrender.com/users/subordinates', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (!subordinatesRes.ok) {
          throw new Error(`Failed to fetch subordinates: ${subordinatesRes.statusText}`)
        }

        const subordinatesData = await subordinatesRes.json()
        const subordinates = subordinatesData.users || [] // Default to an empty array if `users` is undefined or null

        setTeamMembers(subordinates)

        // Fetch pending plans and reports count
        const fetchCounts = async (type: string) => {
          const res = await fetch(`https://planning-server-ui10.onrender.com/plan-and-report/count?type=${type}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })

          if (!res.ok) {
            throw new Error(`Failed to fetch ${type} count: ${res.statusText}`)
          }

          const data = await res.json()
          return data.count || 0 // Default to 0 if `count` is undefined
        }

        const totalPendingPlans = await fetchCounts('plan')
        const totalPendingReports = await fetchCounts('report')

        setTeamStats({
          totalMembers: subordinates.length,
          totalPendingPlans,
          totalPendingReports,
        })
      } catch (error) {
        console.error('Error fetching team data:', error)
        setTeamMembers([]) // Ensure teamMembers is never null
      } finally {
        setLoading(false) // End loading
      }
    }

    fetchTeamData()
  }, [router])

  const getPendingItemsCount = (memberId: string) => {
    return 0
  }

  if (!currentUser || currentUser.role === 'staff') {
    return null
  }

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="flex items-center gap-3">
        <img 
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/aastu.jpg-oDwUB2nTEh9lUbV13ex90FkBNCbmJx.jpeg" 
          alt="AASTU Logo" 
          className="h-32 w-auto rounded-full"
        />
        <h1 className="text-3xl font-bold text-[#1A237E]">My Team</h1>
      </div>

      {/* Loading Indicator */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          Loading...
        </div>
      ) : (
        <>
          {/* Team Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                {teamMembers.length === 0 ? (
                  <div className="text-center text-gray-500">
                    You have no members yet.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {teamMembers.map((member) => (
                      <TeamMemberCard
                        key={member._id}
                        member={member}
                        pendingItems={getPendingItemsCount(member._id)}
                        onClick={() => router.push(`/dashboard/my-team/${member._id}`)}
                      />
                    ))}
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}
