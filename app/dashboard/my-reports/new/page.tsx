'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { plans, reports } from '@/lib/sample-data'

export default function NewReportPage() {
  const router = useRouter()
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [userPlans, setUserPlans] = useState<any[]>([])
  const [selectedPlan, setSelectedPlan] = useState<any>(null)
  const [formData, setFormData] = useState({
    planId: '',
    accomplishedValue: '',
    notes: '',
  })

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser')
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser)
      setCurrentUser(parsedUser)
      const filteredPlans = plans.filter(plan => plan.createdBy === parsedUser.id && plan.status === 'Approved')
      setUserPlans(filteredPlans)
    } else {
      router.push('/login')
    }
  }, [router])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handlePlanSelect = (planId: string) => {
    const plan = userPlans.find(p => p.id === planId)
    setSelectedPlan(plan)
    setFormData(prev => ({ ...prev, planId }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newReport = {
      id: `R${reports.length + 1}`,
      ...formData,
      accomplishedValue: Number(formData.accomplishedValue),
      submissionDate: new Date().toISOString().split('T')[0],
      submittedBy: currentUser.id,
      status: 'Pending Review',
      quarter: getCurrentQuarter(),
      completion: 0, // or any appropriate value
      comments: '', // or any appropriate value
    }
    reports.push(newReport)
    router.push('/dashboard/my-reports')
  }

  const getCurrentQuarter = () => {
    const month = new Date().getMonth()
    return `Q${Math.floor(month / 3) + 1}`
  }

  if (!currentUser) return null

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Create New Report</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="planId">Select Plan</label>
            <Select onValueChange={handlePlanSelect} required>
              <SelectTrigger>
                <SelectValue placeholder="Select a plan" />
              </SelectTrigger>
              <SelectContent>
                {userPlans.map((plan) => (
                  <SelectItem key={plan.id} value={plan.id}>{plan.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {selectedPlan && (
            <div className="space-y-2">
              <label htmlFor="accomplishedValue">Accomplished Value (out of {selectedPlan.accomplishmentValue})</label>
              <Input
                id="accomplishedValue"
                name="accomplishedValue"
                type="number"
                min="0"
                max={selectedPlan.accomplishmentValue}
                value={formData.accomplishedValue}
                onChange={handleInputChange}
                required
              />
            </div>
          )}
          <div className="space-y-2">
            <label htmlFor="notes">Report Details</label>
            <Textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              required
            />
          </div>
          <Button type="submit">Submit for Review</Button>
        </form>
      </CardContent>
    </Card>
  )
}

