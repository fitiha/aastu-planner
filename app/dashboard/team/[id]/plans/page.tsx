'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PlanReviewCard } from '@/components/plan-review-card'
import { Button } from "@/components/ui/button"
import { users, plans } from '@/lib/sample-data'

export default function TeamMemberPlansPage() {
  const router = useRouter()
  const params = useParams()
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [teamMember, setTeamMember] = useState<any>(null)
  const [memberPlans, setMemberPlans] = useState<any[]>([])

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser')
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser)
      setCurrentUser(parsedUser)
      
      const member = users.find(u => u.id === params.id)
      setTeamMember(member)

      if (member) {
        const filteredPlans = plans.filter(plan => 
          plan.createdBy === member.id && 
          (plan.status === 'Pending Review' || plan.status === 'Approved' || plan.status === 'Rejected')
        )
        setMemberPlans(filteredPlans)
      }
    } else {
      router.push('/login')
    }
  }, [params.id, router])

  const handleApprovePlan = (planId: string) => {
    setMemberPlans(memberPlans.map(plan => 
      plan.id === planId ? { ...plan, status: 'Approved', read: true } : plan
    ))
  }

  const handleRejectPlan = (planId: string, comment: string) => {
    setMemberPlans(memberPlans.map(plan => 
      plan.id === planId ? { ...plan, status: 'Rejected', comments: comment, read: true } : plan
    ))
  }

  if (!currentUser || !teamMember) return null

  const pendingReviewPlans = memberPlans.filter(plan => plan.status === 'Pending Review')
  const reviewedPlans = memberPlans.filter(plan => plan.status === 'Approved' || plan.status === 'Rejected')

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Button 
            variant="ghost" 
            onClick={() => router.push('/dashboard/team')}
            className="mb-2"
          >
            ← Back to Team
          </Button>
          <h1 className="text-2xl font-bold text-[#2E2E31]">
            {teamMember.name}'s Plans
          </h1>
          <p className="text-gray-600">{teamMember.department}</p>
        </div>
      </div>

      <Card>
        <CardHeader className="bg-[#A38901] text-white">
          <CardTitle>Plans Overview</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <Tabs defaultValue="pending">
            <TabsList className="mb-4">
              <TabsTrigger value="pending">
                Pending Review ({pendingReviewPlans.length})
              </TabsTrigger>
              <TabsTrigger value="reviewed">
                Reviewed Plans ({reviewedPlans.length})
              </TabsTrigger>
            </TabsList>
            <TabsContent value="pending">
              <div className="grid gap-4">
                {pendingReviewPlans.map((plan) => (
                  <PlanReviewCard
                    key={plan.id}
                    plan={plan}
                    isReview={true}
                    onApprove={handleApprovePlan}
                    onReject={handleRejectPlan}
                  />
                ))}
                {pendingReviewPlans.length === 0 && (
                  <p className="text-center text-gray-500">No pending plans to review</p>
                )}
              </div>
            </TabsContent>
            <TabsContent value="reviewed">
              <div className="grid gap-4">
                {reviewedPlans.map((plan) => (
                  <PlanReviewCard
                    key={plan.id}
                    plan={plan}
                    isReview={false}
                  />
                ))}
                {reviewedPlans.length === 0 && (
                  <p className="text-center text-gray-500">No reviewed plans yet</p>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

