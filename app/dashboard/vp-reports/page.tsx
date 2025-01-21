'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ReportReviewCard } from '@/components/report-review-card'
import { reports, plans, users } from '@/lib/sample-data'
import { motion } from "framer-motion"

export default function VPReportsPage() {
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [vpReports, setVPReports] = useState<any[]>([])
  const router = useRouter()

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  }

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
   <div className="container rounded-xl mx-auto py-8 flex flex-col h-[calc(100vh-4rem)] bg-gradient-to-b from-blue-100 to-white transition-all duration-300 ease-in-out">
         <motion.div
           className="flex items-center gap-3 mb-6"
           initial={{ opacity: 0, y: -20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5 }}
         >
           <motion.h1 className="text-3xl font-bold text-[#1A237E] px-4" {...fadeInUp}>
            VP Reports
           </motion.h1>
         </motion.div>
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

