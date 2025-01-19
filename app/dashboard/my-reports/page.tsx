'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ReportCard } from '@/components/report-card'
import { reports, plans } from '@/lib/sample-data'
import { Pencil, Trash2 } from 'lucide-react'

export default function MyReportsPage() {
  const router = useRouter()
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [userReports, setUserReports] = useState<any[]>([])
  const [userPlans, setUserPlans] = useState<any[]>([])

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser')
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser)
      setCurrentUser(parsedUser)
      const filteredReports = reports.filter(report => report.submittedBy === parsedUser.id)
      setUserReports(filteredReports)
      const filteredPlans = plans.filter(plan => plan.createdBy === parsedUser.id)
      setUserPlans(filteredPlans)
    } else {
      router.push('/login')
    }
  }, [router])

  const handleCreateReport = () => {
    router.push('/dashboard/my-reports/new')
  }

  const handleEditReport = (reportId: string) => {
    router.push(`/dashboard/my-reports/${reportId}/edit`)
  }

  const handleDeleteReport = (reportId: string) => {
    setUserReports(userReports.filter(report => report.id !== reportId))
  }

  const handleResubmitReport = (reportId: string) => {
    setUserReports(userReports.map(report => 
      report.id === reportId ? { ...report, status: 'Pending Review' } : report
    ))
  }

  const handleEditReport2 = (reportId: string, updatedReport: any) => {
    setUserReports(userReports.map(report => 
      report.id === reportId ? { ...report, ...updatedReport } : report
    ))
  }

  if (!currentUser) return null

  const pendingReports = userReports.filter(report => report.status === 'Pending Review')
  const approvedReports = userReports.filter(report => report.status === 'Approved')
  const rejectedReports = userReports.filter(report => report.status === 'Rejected')

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-[#2E2E31]">My Reports</h1>
        <Button onClick={handleCreateReport}>Create New Report</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="bg-[#A38901] text-white">
            <CardTitle>Pending Review</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            {pendingReports.map(report => (
              <div key={report.id} className="mb-4 relative">
                <ReportCard report={report} plan={userPlans.find(p => p.id === report.planId)} />
                <div className="absolute top-2 right-2 flex space-x-2">
                  <Button size="sm" variant="ghost" onClick={() => handleEditReport(report.id)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => handleDeleteReport(report.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="bg-[#2E2E31] text-white">
            <CardTitle>Approved</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            {approvedReports.map(report => (
              <ReportCard key={report.id} report={report} plan={userPlans.find(p => p.id === report.planId)} />
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="bg-red-600 text-white">
            <CardTitle>Rejected</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            {rejectedReports.map(report => (
              <ReportCard 
                key={report.id} 
                report={report} 
                plan={userPlans.find(p => p.id === report.planId)}
                onEdit={handleEditReport2}
                onResubmit={handleResubmitReport}
              />
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

