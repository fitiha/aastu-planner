'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Sample data
const samplePlan = {
  id: '1',
  name: 'Increase Student Enrollment',
  description: 'Implement strategies to increase student enrollment by 20% over the next academic year.',
  status: 'In Progress',
  targetValue: 1000,
  currentValue: 600,
  startDate: '2023-09-01',
  endDate: '2024-08-31',
}

export default function PlanPage() {
  const { id } = useParams()
  const [plan, setPlan] = useState(samplePlan)

  useEffect(() => {
    // TODO: Fetch plan data based on id
    console.log('Fetching plan with id:', id)
  }, [id])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement plan update logic
    console.log('Updating plan:', plan)
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">{id === 'new' ? 'Create New Plan' : 'Edit Plan'}</h1>
      <Card>
        <CardHeader>
          <CardTitle>{plan.name}</CardTitle>
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
              <label htmlFor="status" className="text-sm font-medium">Status</label>
              <Select
                value={plan.status}
                onValueChange={(value) => setPlan({ ...plan, status: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Not Started">Not Started</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label htmlFor="targetValue" className="text-sm font-medium">Target Value</label>
              <Input
                id="targetValue"
                type="number"
                value={plan.targetValue}
                onChange={(e) => setPlan({ ...plan, targetValue: parseInt(e.target.value) })}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="currentValue" className="text-sm font-medium">Current Value</label>
              <Input
                id="currentValue"
                type="number"
                value={plan.currentValue}
                onChange={(e) => setPlan({ ...plan, currentValue: parseInt(e.target.value) })}
                required
              />
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
            <Button type="submit">Save Plan</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

