import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
// import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { pillars } from '@/lib/sample-data'

interface PlanCardProps {
  plan: {
    plan_id: string
    title: string
    description: string
    status: string
    comments?: string
    start_date: string
    end_date: string
    targetValue: number
    currentValue: number
    pillarId: string
    alignedPlanId: string
    value: string
    which_quarter: string
  }
  onEdit?: (id: string, updatedPlan: any) => void
  onResubmit?: (id: string) => void
}

export function PlanCard({ plan, onEdit, onResubmit }: PlanCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedPlan, setEditedPlan] = useState(plan)

  const pillar = pillars.find((p) => p.id.toString() === plan.pillarId)

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = () => {
    onEdit?.(plan.plan_id, editedPlan)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditedPlan(plan)
    setIsEditing(false)
  }

  const handleResubmit = async () => {
    try {
      const token = localStorage.getItem('token') // Retrieve the token from localStorage
      if (!token) {
        throw new Error('Authentication token not found')
      }
      // console.log("plan id is", plan.plan_id)
      const response = await fetch(`https://planning-server-ui10.onrender.com/update/plan/${plan.plan_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...plan, 
          status: 'Pending', 
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to resubmit the plan')
      }

      const updatedPlan = await response.json()
      console.log('Plan resubmitted successfully:', updatedPlan)

      // Optionally trigger the parent component's callback
      onResubmit?.(plan.plan_id)
    } catch (error) {
      console.error('Error resubmitting the plan:', error)
      alert('Failed to resubmit the plan. Please try again.')
    }
  }

  return (
    <Card className="mb-4 border-[#A38901]">
      <CardHeader className="bg-[#2E2E31] text-white">
        <CardTitle className="text-lg">
          {isEditing ? (
            <Input
              value={editedPlan.title}
              onChange={(e) => setEditedPlan({ ...editedPlan, title: e.target.value })}
              className="text-black"
            />
          ) : (
            plan.title
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        {isEditing ? (
          <Textarea
            value={editedPlan.description}
            onChange={(e) => setEditedPlan({ ...editedPlan, description: e.target.value })}
            className="mb-2"
          />
        ) : (
          <p className="text-sm mb-2">{plan.description}</p>
        )}
        <div className="text-sm mb-2">
          <p>
            Start Date:{' '}
            {isEditing ? (
              <Input
                type="date"
                value={editedPlan.start_date}
                onChange={(e) => setEditedPlan({ ...editedPlan, start_date: e.target.value })}
              />
            ) : (
              plan.start_date
            )}
          </p>
          <p>
            End Date:{' '}
            {isEditing ? (
              <Input
                type="date"
                value={editedPlan.end_date}
                onChange={(e) => setEditedPlan({ ...editedPlan, end_date: e.target.value })}
              />
            ) : (
              plan.end_date
            )}
          </p>
          <p>Aligned Pillar: {pillar ? pillar.title : 'N/A'}</p>
          <p>Aligned Plan ID: {plan.alignedPlanId}</p>
          <p>
            Full Accomplishment Value:{' '}
            {isEditing ? (
              <Input
                value={editedPlan.value}
                onChange={(e) => setEditedPlan({ ...editedPlan, value: e.target.value })}
              />
            ) : (
              plan.value
            )}
          </p>
          <p>Target Quarter: {plan.which_quarter}</p>
        </div>
        {plan.comments && (
          <div className="bg-red-50 p-2 rounded-md mb-2">
            <p className="text-sm text-red-600">{plan.comments}</p>
          </div>
        )}
        {plan.status === 'Rejected' && (
          <div className="flex gap-2">
            {isEditing ? (
              <>
                <Button onClick={handleSave} size="sm">
                  Save
                </Button>
                <Button onClick={handleCancel} size="sm" variant="outline">
                  Cancel
                </Button>
              </>
            ) : (
              <Button onClick={handleEdit} size="sm">
                Edit
              </Button>
            )}
            {!isEditing && (
              <Button onClick={handleResubmit} size="sm" variant="outline">
                Resubmit
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
