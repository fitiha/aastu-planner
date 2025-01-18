'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { users, plans as samplePlans } from '@/lib/sample-data'

// This would typically come from an API
const initialPillars = [
  { id: 1, title: "Academic Excellence" },
  { id: 2, title: "Research and Innovation" },
  { id: 3, title: "Community Engagement" },
  { id: 4, title: "Infrastructure Development" },
  { id: 5, title: "Student Success" },
  { id: 6, title: "Faculty Development" },
  { id: 7, title: "International Collaboration" },
  { id: 8, title: "Sustainable Practices" },
  { id: 9, title: "Digital Transformation" },
  { id: 10, title: "Financial Sustainability" },
]

export default function PlanPage() {
  const { id } = useParams()
  const router = useRouter()
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [plan, setPlan] = useState({
    id: '',
    name: '',
    description: '',
    status: 'Not Started',
    targetValue: 0,
    currentValue: 0,
    startDate: '',
    endDate: '',
    pillarId: '',
    alignedPlanId: '',
    accomplishmentValue: '',
    targetQuarter: ''
  })
  const [vpPlans, setVpPlans] = useState<any[]>([])

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser')
    if (storedUser) {
      const user = JSON.parse(storedUser)
      setCurrentUser(user)
      if (user.role === 'director') {
        // Fetch VP plans (this would typically come from an API)
        const vicePresidentPlans = samplePlans.filter(p => p.createdBy.startsWith('VP'))
        setVpPlans(vicePresidentPlans)
      }
    }

    if (id !== 'new') {
      // Fetch plan data based on id (this would typically come from an API)
      const existingPlan = samplePlans.find(p => p.id === id)
      if (existingPlan) {
        setPlan(existingPlan)
      }
    }
  }, [id])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement plan creation/update logic
    console.log('Submitting plan:', plan)
    // For now, we'll just redirect to the plans page
    router.push('/dashboard/plans')
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">{id === 'new' ? 'Create New Plan' : 'Edit Plan'}</h1>
      <Card>
        <CardHeader>
          <CardTitle>{plan.name || 'New Plan'}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">Plan Name</label>
              <Input
                id="name"
                value={plan.name}
                onChange={(e) => setPlan({ ...plan, name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">Description</label>
              <Textarea
                id="description"
                value={plan.description}
                onChange={(e) => setPlan({ ...plan, description: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="pillar" className="text-sm font-medium">Aligned Pillar</label>
              <Select
                value={plan.pillarId}
                onValueChange={(value) => setPlan({ ...plan, pillarId: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select pillar" />
                </SelectTrigger>
                <SelectContent>
                  {initialPillars.map((pillar) => (
                    <SelectItem key={pillar.id} value={pillar.id.toString()}>{pillar.title}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {currentUser?.role === 'director' && (
              <div className="space-y-2">
                <label htmlFor="alignedPlan" className="text-sm font-medium">Aligned VP Plan</label>
                <Select
                  value={plan.alignedPlanId}
                  onValueChange={(value) => setPlan({ ...plan, alignedPlanId: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select VP plan" />
                  </SelectTrigger>
                  <SelectContent>
                    {vpPlans.map((vpPlan) => (
                      <SelectItem key={vpPlan.id} value={vpPlan.id}>{vpPlan.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            <div className="space-y-2">
              <label htmlFor="accomplishmentValue" className="text-sm font-medium">Full Accomplishment Value</label>
              <Input
                id="accomplishmentValue"
                value={plan.accomplishmentValue}
                onChange={(e) => setPlan({ ...plan, accomplishmentValue: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="targetQuarter" className="text-sm font-medium">Target Quarter</label>
              <Select
                value={plan.targetQuarter}
                onValueChange={(value) => setPlan({ ...plan, targetQuarter: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select target quarter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Q1">Q1</SelectItem>
                  <SelectItem value="Q2">Q2</SelectItem>
                  <SelectItem value="Q3">Q3</SelectItem>
                  <SelectItem value="Q4">Q4</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label htmlFor="startDate" className="text-sm font-medium">Start Date</label>
              <Input
                id="startDate"
                type="date"
                value={plan.startDate}
                onChange={(e) => setPlan({ ...plan, startDate: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="endDate" className="text-sm font-medium">End Date</label>
              <Input
                id="endDate"
                type="date"
                value={plan.endDate}
                onChange={(e) => setPlan({ ...plan, endDate: e.target.value })}
                required
              />
            </div>
            <Button type="submit">Submit Plan for Review</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

