import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface ReportReviewCardProps {
  report: {
    id: string
    planId: string
    quarter: string
    accomplishedValue: number
    notes: string
    status: string
    comments?: string
    submissionDate: string
    reviewedAt?: string
  }
  plan: {
    name: string
    accomplishmentValue: number
  }
  onApprove?: (id: string) => void
  onReject?: (id: string, comment: string) => void
}

export function ReportReviewCard({ report, plan, onApprove, onReject }: ReportReviewCardProps) {
  const [comment, setComment] = useState('')
  const progress = Math.round((report.accomplishedValue / plan.accomplishmentValue) * 100)

  return (
    <Card className="mb-4 border-[#A38901]">
      <CardHeader className="bg-[#2E2E31] text-white">
        <div className="flex justify-between items-start">
          <CardTitle>{plan.name} - {report.quarter}</CardTitle>
          <Badge variant={report.status === 'Approved' ? 'default' : 'destructive'}>
            {report.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        <p className="text-sm">Submission Date: {report.submissionDate}</p>
        <div className="space-y-2">
          <Progress value={progress} className="w-full" />
          <p className="text-sm text-right">{progress}% Complete</p>
        </div>
        <p className="text-sm">Accomplished: {report.accomplishedValue} out of {plan.accomplishmentValue}</p>
        <p>{report.notes}</p>
        {report.comments && (
          <div className="bg-red-50 p-3 rounded-md">
            <p className="text-sm font-semibold text-red-700">Comments:</p>
            <p className="text-sm text-red-600">{report.comments}</p>
          </div>
        )}
        {report.reviewedAt && (
          <p className="text-sm text-gray-500">Reviewed on: {new Date(report.reviewedAt).toLocaleString()}</p>
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
                onClick={() => onApprove(report.id)}
                className="bg-[#A38901] hover:bg-[#8a7201]"
              >
                Approve
              </Button>
              <Button 
                onClick={() => onReject(report.id, comment)}
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

