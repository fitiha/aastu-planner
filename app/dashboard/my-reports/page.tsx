'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ReportCard } from '@/components/report-card'
import { reports, plans } from '@/lib/sample-data'
import { Pencil, Trash2, Plus, AlertCircle, CheckCircle, Clock } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"

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
    <div className="container mx-auto py-8 space-y-8">
      <div className="flex justify-between items-center">
      <div className="flex items-center gap-3">
        <img 
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/aastu.jpg-oDwUB2nTEh9lUbV13ex90FkBNCbmJx.jpeg" 
        alt="AASTU Logo" 
        className="h-32 w-auto rounded-full"
        />
        <h1 className="text-3xl font-bold text-[#1A237E] mx-12">My Reports</h1>
      </div>
      <Button 
        onClick={handleCreateReport}
        className="bg-[#C49B1D] hover:bg-[#B38A1C] text-white"
      >
        <Plus className="mr-2 h-4 w-4" /> Create New Report
      </Button>
      </div>

      <Tabs defaultValue="pending" className="w-full">
      <TabsList className="grid w-full grid-cols-3 bg-gray-100">
        <TabsTrigger 
        value="pending" 
        className="data-[state=active]:bg-[#C49B1D] data-[state=active]:text-white"
        >
        <Clock className="mr-2 h-4 w-4" /> Pending ({pendingReports.length})
        </TabsTrigger>
        <TabsTrigger 
        value="approved" 
        className="data-[state=active]:bg-[#1A237E] data-[state=active]:text-white"
        >
        <CheckCircle className="mr-2 h-4 w-4" /> Approved ({approvedReports.length})
        </TabsTrigger>
        <TabsTrigger 
        value="rejected" 
        className="data-[state=active]:bg-red-600 data-[state=active]:text-white"
        >
        <AlertCircle className="mr-2 h-4 w-4" /> Rejected ({rejectedReports.length})
        </TabsTrigger>
      </TabsList>

      <TabsContent value="pending">
        <Card className="border-t-4 border-t-[#C49B1D]">
        <CardHeader className="bg-gradient-to-r from-[#C49B1D] to-[#D4AB2D] text-white">
          <CardTitle>Pending Review</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <ScrollArea className="h-[60vh]">
          <div className="space-y-4">
            {pendingReports.map(report => (
            <div key={report.id} className="relative">
              <ReportCard report={report} plan={userPlans.find(p => p.id === report.planId)} />
              <div className="absolute top-2 right-2 flex space-x-2">
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={() => handleEditReport(report.id)}
                className="hover:bg-[#1A237E] hover:text-white"
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={() => handleDeleteReport(report.id)}
                className="hover:bg-red-600 hover:text-white"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
              </div>
            </div>
            ))}
          </div>
          </ScrollArea>
        </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="approved">
        <Card className="border-t-4 border-t-[#1A237E]">
        <CardHeader className="bg-gradient-to-r from-[#1A237E] to-[#2A337E] text-white">
          <CardTitle>Approved</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <ScrollArea className="h-[60vh]">
          <div className="space-y-4">
            {approvedReports.map(report => (
            <ReportCard key={report.id} report={report} plan={userPlans.find(p => p.id === report.planId)} />
            ))}
          </div>
          </ScrollArea>
        </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="rejected">
        <Card className="border-t-4 border-t-red-600">
        <CardHeader className="bg-gradient-to-r from-red-600 to-red-500 text-white">
          <CardTitle>Rejected</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <ScrollArea className="h-[60vh]">
          <div className="space-y-4">
            {rejectedReports.map(report => (
            <ReportCard 
              key={report.id} 
              report={report} 
              plan={userPlans.find(p => p.id === report.planId)}
              onEdit={handleEditReport2}
              onResubmit={handleResubmitReport}
            />
            ))}
          </div>
          </ScrollArea>
        </CardContent>
        </Card>
      </TabsContent>
      </Tabs>
    </div>
  )
}

