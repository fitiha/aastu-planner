'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlanCard } from '@/components/plan-card'
import { plans } from '@/lib/sample-data'

export default function MyPlansPage() {
  const router = useRouter()
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [userPlans, setUserPlans] = useState<any[]>([])

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser')
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser)
      setCurrentUser(parsedUser)
      const filteredPlans = plans.filter(plan => plan.createdBy === parsedUser.id)
      setUserPlans(filteredPlans)
    } else {
      router.push('/login')
    }
  }, [router])

  const handleCreatePlan = () => {
    router.push('/dashboard/my-plans/new')
  }

  const handleEditPlan = (planId: string, updatedPlan: any) => {
    setUserPlans(userPlans.map(plan => 
      plan.id === planId ? { ...plan, ...updatedPlan } : plan
    ))
  }

  const handleResubmitPlan = (planId: string) => {
    setUserPlans(userPlans.map(plan => 
      plan.id === planId ? { ...plan, status: 'Pending Review' } : plan
    ))
  }

  if (!currentUser) return null

  const pendingPlans = userPlans.filter(plan => plan.status === 'Pending Review')
  const approvedPlans = userPlans.filter(plan => plan.status === 'Approved')
  const rejectedPlans = userPlans.filter(plan => plan.status === 'Rejected')

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-[#2E2E31]">My Plans</h1>
        <Button onClick={handleCreatePlan}>Create New Plan</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="bg-[#A38901] text-white">
            <CardTitle>Pending Review</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            {pendingPlans.map(plan => (
              <PlanCard key={plan.id} plan={plan} />
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="bg-[#2E2E31] text-white">
            <CardTitle>Approved</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            {approvedPlans.map(plan => (
              <PlanCard key={plan.id} plan={plan} />
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="bg-red-600 text-white">
            <CardTitle>Rejected</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            {rejectedPlans.map(plan => (
              <PlanCard 
                key={plan.id} 
                plan={plan} 
                onEdit={handleEditPlan}
                onResubmit={handleResubmitPlan}
              />
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

