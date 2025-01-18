'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { plans, users } from '@/lib/sample-data'

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  superior?: string;
}

interface Plan {
  id: string;
  name: string;
  description: string;
  status: string;
  targetValue: number;
  currentValue: number;
  startDate: string;
  endDate: string;
  createdBy: string;
  assignedTo: string[];
  pillarId: string;
  accomplishmentValue: string;
  targetQuarter: string;
  comments?: string;
}

export default function PlansPage() {
  const [user, setUser] = useState<User | null>(null)
  const [userPlans, setUserPlans] = useState<Plan[]>([])
  const [pendingPlans, setPendingPlans] = useState<Plan[]>([])
  const router = useRouter()

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser')
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser)
      setUser(parsedUser)
      const filteredPlans = plans.filter(plan => 
        plan.createdBy === parsedUser.id || plan.assignedTo.includes(parsedUser.id)
      )
      setUserPlans(filteredPlans)

      if (parsedUser.role !== 'staff') {
        const pendingPlans = plans.filter(plan => 
          plan.status === 'Pending Approval' && 
          users.find(u => u.id === plan.createdBy)?.superior === parsedUser.id
        )
        setPendingPlans(pendingPlans)
      }
    } else {
      router.push('/login')
    }
  }, [router])

  const handleCreatePlan = () => {
    router.push('/dashboard/plans/new')
  }

  const handleResubmit = (plan: Plan) => {
    // In a real application, you would call an API to update the plan
    const updatedPlan = { ...plan, status: 'Pending Approval' }
    setUserPlans(userPlans.map(p => p.id === plan.id ? updatedPlan : p))
  }

  const handleApprove = (plan: Plan) => {
    // In a real application, you would call an API to update the plan
    const updatedPlan = { ...plan, status: 'Approved' }
    setPendingPlans(pendingPlans.filter(p => p.id !== plan.id))
    setUserPlans([...userPlans, updatedPlan])
  }

  const handleReject = (plan: Plan, comment: string) => {
    // In a real application, you would call an API to update the plan
    const updatedPlan = { ...plan, status: 'Rejected', comments: comment }
    setPendingPlans(pendingPlans.filter(p => p.id !== plan.id))
    setUserPlans([...userPlans, updatedPlan])
  }

  if (!user) return null

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Plans</h1>
        {user.role !== 'staff' && (
          <Button onClick={handleCreatePlan}>Create New Plan</Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Pending Approval</CardTitle>
          </CardHeader>
          <CardContent>
            {userPlans.filter(plan => plan.status === 'Pending Approval').map(plan => (
              <div key={plan.id} className="mb-4 p-4 border rounded">
                <h3 className="font-bold">{plan.name}</h3>
                <p>{plan.description}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Approved</CardTitle>
          </CardHeader>
          <CardContent>
            {userPlans.filter(plan => plan.status === 'Approved' || plan.status === 'In Progress').map(plan => (
              <div key={plan.id} className="mb-4 p-4 border rounded">
                <h3 className="font-bold">{plan.name}</h3>
                <p>{plan.description}</p>
                <p>Status: {plan.status}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Rejected</CardTitle>
          </CardHeader>
          <CardContent>
            {userPlans.filter(plan => plan.status === 'Rejected').map(plan => (
              <div key={plan.id} className="mb-4 p-4 border rounded">
                <h3 className="font-bold">{plan.name}</h3>
                <p>{plan.description}</p>
                <p>Comments: {plan.comments}</p>
                <Button onClick={() => handleResubmit(plan)}>Resubmit</Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {user.role !== 'staff' && pendingPlans.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Plans Pending Your Approval</CardTitle>
          </CardHeader>
          <CardContent>
            {pendingPlans.map(plan => (
              <div key={plan.id} className="mb-4 p-4 border rounded">
                <h3 className="font-bold">{plan.name}</h3>
                <p>{plan.description}</p>
                <Textarea className="mt-2 mb-2" placeholder="Add comments here" />
                <Button onClick={() => handleApprove(plan)} className="mr-2">Approve</Button>
                <Button onClick={() => handleReject(plan, 'Needs improvement')} variant="destructive">Reject</Button>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  )
}

