'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Sample data
const sampleReports = [
  { id: 1, planName: 'Increase Student Enrollment', quarter: 'Q1 2023', completion: '30%', submissionDate: '2023-03-31' },
  { id: 2, planName: 'Improve Research Output', quarter: 'Q1 2023', completion: '25%', submissionDate: '2023-03-31' },
  { id: 3, planName: 'Enhance Campus Facilities', quarter: 'Q1 2023', completion: '40%', submissionDate: '2023-03-31' },
]

export default function ReportsPage() {
  const [reports, setReports] = useState(sampleReports)
  const [newReport, setNewReport] = useState({ planName: '', completion: '', notes: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement report submission logic
    console.log('Submitting report:', newReport)
    // Reset form after submission
    setNewReport({ planName: '', completion: '', notes: '' })
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold mb-4">Submit Quarterly Report</h1>
        <Card>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="planName" className="text-sm font-medium">Plan Name</label>
                <Input
                  id="planName"
                  value={newReport.planName}
                  onChange={(e) => setNewReport({ ...newReport, planName: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="completion" className="text-sm font-medium">Completion Percentage</label>
                <Input
                  id="completion"
                  type="number"
                  min="0"
                  max="100"
                  value={newReport.completion}
                  onChange={(e) => setNewReport({ ...newReport, completion: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="notes" className="text-sm font-medium">Notes</label>
                <Textarea
                  id="notes"
                  value={newReport.notes}
                  onChange={(e) => setNewReport({ ...newReport, notes: e.target.value })}
                  required
                />
              </div>
              <Button type="submit">Submit Report</Button>
            </form>
          </CardContent>
        </Card>
      </div>
      <div>
        <h2 className="text-xl font-bold mb-4">Previous Reports</h2>
        <Card>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Plan Name</TableHead>
                  <TableHead>Quarter</TableHead>
                  <TableHead>Completion</TableHead>
                  <TableHead>Submission Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reports.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell>{report.planName}</TableCell>
                    <TableCell>{report.quarter}</TableCell>
                    <TableCell>{report.completion}</TableCell>
                    <TableCell>{report.submissionDate}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">View</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

