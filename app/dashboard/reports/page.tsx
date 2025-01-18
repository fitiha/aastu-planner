'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { plans, reports, users } from '@/lib/sample-data'

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface Plan {
  id: string;
  name: string;
  accomplishmentValue: string;
}

interface Report {
  id: string;
  planId: string;
  quarter: string;
  completion: number;
  notes: string;
  submissionDate: string;
  submittedBy: string;
}

export default function ReportsPage() {
  const [user, setUser] = useState<User | null>(null)
  const [userPlans, setUserPlans] = useState<Plan[]>([])
  const [userReports, setUserReports] = useState<Report[]>([])
  const [selectedPlan, setSelectedPlan] = useState<string>('')
  const [completion, setCompletion] = useState<number>(0)
  const [notes, setNotes] = useState<string>('')
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
      const filteredReports = reports.filter(report => report.submittedBy === parsedUser.id)
      setUserReports(filteredReports)
    } else {
      router.push('/login')
    }
  }, [router])

  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedPlan) return

    const newReport: Report = {
      id: `R${reports.length + 1}`,
      planId: selectedPlan,
      quarter: `Q${Math.floor(new Date().getMonth() / 3) + 1} ${new Date().getFullYear()}`,
      completion,
      notes,
      submissionDate: new Date().toISOString().split('T')[0],
      submittedBy: user?.id || '',
    }

    setUserReports([...userReports, newReport])
    setSelectedPlan('')
    setCompletion(0)
    setNotes('')
  }

  if (!user) return null

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold mb-4">Submit Quarterly Report</h1>
        <Card>
          <CardContent>
            <form onSubmit={handleSubmitReport} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="planId" className="text-sm font-medium">Plan</label>
                <select
                  id="planId"
                  value={selectedPlan}
                  onChange={(e) => setSelectedPlan(e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                >
                  <option value="">Select a plan</option>
                  {userPlans.map(plan => (
                    <option key={plan.id} value={plan.id}>{plan.name}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label htmlFor="completion" className="text-sm font-medium">Completion Percentage</label>
                <Input
                  id="completion"
                  type="number"
                  min="0"
                  max="100"
                  value={completion}
                  onChange={(e) => setCompletion(Number(e.target.value))}
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="notes" className="text-sm font-medium">Notes</label>
                <Textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
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
                </TableRow>
              </TableHeader>
              <TableBody>
                {userReports.map((report) => {
                  const plan = plans.find(p => p.id === report.planId)
                  return (
                    <TableRow key={report.id}>
                      <TableCell>{plan ? plan.name : 'Unknown Plan'}</TableCell>
                      <TableCell>{report.quarter}</TableCell>
                      <TableCell>{`${report.completion}%`}</TableCell>
                      <TableCell>{report.submissionDate}</TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

