import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"

interface PlanReviewCardProps {
  plan: {
    id: string
    name: string
    description: string
    status: string
    comments?: string
    reviewedAt?: string
  }
  onApprove?: (id: string) => void
  onReject?: (id: string, comment: string) => void
}

export function PlanReviewCard({ plan, onApprove, onReject }: PlanReviewCardProps) {
  const [comment, setComment] = useState('')

  return (
    <Card className="mb-4 border-[#A38901]">
      <CardHeader className="bg-[#2E2E31] text-white">
        <div className="flex justify-between items-start">
          <CardTitle>{plan.name}</CardTitle>
          <Badge variant={plan.status === 'Approved' ? 'default' : 'destructive'}>
            {plan.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        <p>{plan.description}</p>
        {plan.comments && (
          <div className="bg-red-50 p-3 rounded-md">
            <p className="text-sm font-semibold text-red-700">Comments:</p>
            <p className="text-sm text-red-600">{plan.comments}</p>
          </div>
        )}
        {plan.reviewedAt && (
          <p className="text-sm text-gray-500">Reviewed on: {new Date(plan.reviewedAt).toLocaleString()}</p>
        )}
        {onApprove && onReject && (
          <div className="space-y-4">
            <Textarea
              placeholder="Add your review comments here..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <div className="flex gap-2">
              <Button 
                onClick={() => onApprove(plan.id)}
                className="bg-[#A38901] hover:bg-[#8a7201]"
              >
                Approve
              </Button>
              <Button 
                onClick={() => onReject(plan.id, comment)}
                variant="destructive"
              >
                Reject
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

