import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { pillars } from '@/lib/sample-data'

interface PlanCardProps {
  plan: {
    id: string
    name: string
    description: string
    status: string
    comments?: string
    startDate: string
    endDate: string
    targetValue: number
    currentValue: number
    pillarId: string
    alignedPlanId: string
    accomplishmentValue: string
    targetQuarter: string
  }
  onEdit?: (id: string, updatedPlan: any) => void
  onResubmit?: (id: string) => void
}

export function PlanCard({ plan, onEdit, onResubmit }: PlanCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedPlan, setEditedPlan] = useState(plan)
  const progress = Math.round((plan.currentValue / plan.targetValue) * 100)
  const pillar = pillars.find(p => p.id.toString() === plan.pillarId)

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = () => {
    onEdit?.(plan.id, editedPlan)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditedPlan(plan)
    setIsEditing(false)
  }

  return (
    <Card className="mb-4 border-[#A38901]">
      <CardHeader className="bg-[#2E2E31] text-white">
        <CardTitle className="text-lg">{isEditing ? 
          <Input 
            value={editedPlan.name} 
            onChange={(e) => setEditedPlan({...editedPlan, name: e.target.value})}
            className="text-black"
          /> : plan.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        {isEditing ? (
          <Textarea
            value={editedPlan.description}
            onChange={(e) => setEditedPlan({...editedPlan, description: e.target.value})}
            className="mb-2"
          />
        ) : (
          <p className="text-sm mb-2">{plan.description}</p>
        )}
        <div className="text-sm mb-2">
          <p>Start Date: {isEditing ? 
            <Input 
              type="date" 
              value={editedPlan.startDate} 
              onChange={(e) => setEditedPlan({...editedPlan, startDate: e.target.value})}
            /> : plan.startDate}
          </p>
          <p>End Date: {isEditing ? 
            <Input 
              type="date" 
              value={editedPlan.endDate} 
              onChange={(e) => setEditedPlan({...editedPlan, endDate: e.target.value})}
            /> : plan.endDate}
          </p>
          <p>Aligned Pillar: {pillar ? pillar.title : 'N/A'}</p>
          <p>Aligned Plan ID: {plan.alignedPlanId}</p>
          <p>Full Accomplishment Value: {isEditing ? 
            <Input 
              value={editedPlan.accomplishmentValue} 
              onChange={(e) => setEditedPlan({...editedPlan, accomplishmentValue: e.target.value})}
            /> : plan.accomplishmentValue}
          </p>
          <p>Target Quarter: {plan.targetQuarter}</p>
        </div>
        <div className="mb-2">
          <Progress value={progress} className="w-full" />
          <p className="text-sm text-right">{progress}% Complete</p>
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
                <Button onClick={handleSave} size="sm">Save</Button>
                <Button onClick={handleCancel} size="sm" variant="outline">Cancel</Button>
              </>
            ) : (
              <Button onClick={handleEdit} size="sm">Edit</Button>
            )}
            {!isEditing && <Button onClick={() => onResubmit?.(plan.id)} size="sm" variant="outline">Resubmit</Button>}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

