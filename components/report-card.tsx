import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface ReportCardProps {
  report: {
    id: string
    planId: string
    quarter: string
    accomplishedValue: number
    notes: string
    status: string
    comments?: string
    submissionDate: string
  }
  plan: {
    name: string
    accomplishmentValue: number
  }
  onEdit?: (id: string, updatedReport: any) => void
  onResubmit?: (id: string) => void
}

export function ReportCard({ report, plan, onEdit, onResubmit }: ReportCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedReport, setEditedReport] = useState(report)
  const progress = Math.round((report.accomplishedValue / plan.accomplishmentValue) * 100)

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = () => {
    onEdit?.(report.id, editedReport)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditedReport(report)
    setIsEditing(false)
  }

  return (
    <Card className="mb-4 border-[#A38901]">
      <CardHeader className="bg-[#2E2E31] text-white">
        <CardTitle className="text-lg">Report for {plan.name} - {report.quarter}</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <p className="text-sm mb-2">Submission Date: {report.submissionDate}</p>
        <div className="mb-2">
          <Progress value={progress} className="w-full" />
          <p className="text-sm text-right">{progress}% Complete</p>
        </div>
        <p className="text-sm mb-2">
          Accomplished: {isEditing ? 
            <Input 
              type="number" 
              value={editedReport.accomplishedValue} 
              onChange={(e) => setEditedReport({...editedReport, accomplishedValue: Number(e.target.value)})}
            /> : report.accomplishedValue} out of {plan.accomplishmentValue}
        </p>
        {isEditing ? (
          <Textarea
            value={editedReport.notes}
            onChange={(e) => setEditedReport({...editedReport, notes: e.target.value})}
            className="mb-2"
          />
        ) : (
          <p className="text-sm mb-2">{report.notes}</p>
        )}
        {report.comments && (
          <div className="bg-red-50 p-2 rounded-md mb-2">
            <p className="text-sm text-red-600">{report.comments}</p>
          </div>
        )}
        {report.status === 'Rejected' && (
          <div className="flex gap-2">
            {isEditing ? (
              <>
                <Button onClick={handleSave} size="sm">Save</Button>
                <Button onClick={handleCancel} size="sm" variant="outline">Cancel</Button>
              </>
            ) : (
              <Button onClick={handleEdit} size="sm">Edit</Button>
            )}
            {!isEditing && <Button onClick={() => onResubmit?.(report.id)} size="sm" variant="outline">Resubmit</Button>}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

