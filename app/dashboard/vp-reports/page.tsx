'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ReportReviewCard } from '@/components/report-review-card'
import { reports, plans, users } from '@/lib/sample-data'

export default function VPReportsPage() {
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [vpReports, setVPReports] = useState<any[]>([])
  const router = useRouter()

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser')
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser)
      setCurrentUser(parsedUser)
      if (parsedUser.role === 'planning_office') {
        const allVPReports = reports.filter(report => {
          const reportCreator = users.find(u => u.id === report.submittedBy)
          return reportCreator && reportCreator.role === 'vice_president'
        })
        setVPReports(allVPReports)
      } else {
        router.push('/dashboard')
      }
    } else {
      router.push('/login')
    }
  }, [router])

  const handleApproveReport = (reportId: string) => {
    setVPReports(vpReports.map(report => 
      report.id === reportId ? { ...report, status: 'Approved' } : report
    ))
  }

  const handleRejectReport = (reportId: string, comment: string) => {
    setVPReports(vpReports.map(report => 
      report.id === reportId ? { ...report, status: 'Rejected', comments: comment } : report
    ))
  }

  if (!currentUser) return null

  const pendingReports = vpReports.filter(report => report.status === 'Pending Review')
  const reviewedReports = vpReports.filter(report => report.status !== 'Pending Review')

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[#2E2E31]">VP Reports</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="bg-[#A38901] text-white">
            <CardTitle>Pending Review</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            {pendingReports.map(report => (
              <ReportReviewCard 
                key={report.id} 
                report={report}
                plan={plans.find(p => p.id === report.planId)}
                onApprove={() => handleApproveReport(report.id)}
                onReject={(comment) => handleRejectReport(report.id, comment)}
              />
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="bg-[#2E2E31] text-white">
            <CardTitle>Reviewed Reports</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            {reviewedReports.map(report => (
              <ReportReviewCard 
                key={report.id} 
                report={report}
                plan={plans.find(p => p.id === report.planId)}
              />
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

