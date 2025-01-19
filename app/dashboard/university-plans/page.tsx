'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlanReviewCard } from '@/components/plan-review-card'
import { plans, users } from '@/lib/sample-data'

export default function UniversityPlansPage() {
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [universityPlans, setUniversityPlans] = useState<any[]>([])
  const router = useRouter()

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser')
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser)
      setCurrentUser(parsedUser)
      if (parsedUser.role === 'planning_office') {
        const allUniversityPlans = plans.filter(plan => plan.createdBy.startsWith('VP'))
        setUniversityPlans(allUniversityPlans)
      } else {
        router.push('/dashboard')
      }
    } else {
      router.push('/login')
    }
  }, [router])

  const handleApprovePlan = (planId: string) => {
    setUniversityPlans(universityPlans.map(plan => 
      plan.id === planId ? { ...plan, status: 'Approved' } : plan
    ))
  }

  const handleRejectPlan = (planId: string, comment: string) => {
    setUniversityPlans(universityPlans.map(plan => 
      plan.id === planId ? { ...plan, status: 'Rejected', comments: comment } : plan
    ))
  }

  if (!currentUser) return null

  const pendingPlans = universityPlans.filter(plan => plan.status === 'Pending Review')
  const reviewedPlans = universityPlans.filter(plan => plan.status !== 'Pending Review')

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[#2E2E31]">University Plans</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="bg-[#A38901] text-white">
            <CardTitle>Pending Review</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            {pendingPlans.map(plan => (
              <PlanReviewCard 
                key={plan.id} 
                plan={plan}
                onApprove={() => handleApprovePlan(plan.id)}
                onReject={(comment) => handleRejectPlan(plan.id, comment)}
              />
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="bg-[#2E2E31] text-white">
            <CardTitle>Reviewed Plans</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            {reviewedPlans.map(plan => (
              <PlanReviewCard key={plan.id} plan={plan} />
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

