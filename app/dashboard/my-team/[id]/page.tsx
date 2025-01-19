'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { PlanReviewCard } from '@/components/plan-review-card'
import { ReportReviewCard } from '@/components/report-review-card'
import { users, plans, reports } from '@/lib/sample-data'

export default function TeamMemberDetailsPage() {
  const router = useRouter()
  const params = useParams()
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [teamMember, setTeamMember] = useState<any>(null)
  const [memberPlans, setMemberPlans] = useState<any[]>([])
  const [memberReports, setMemberReports] = useState<any[]>([])

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser')
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser)
      setCurrentUser(parsedUser)
      
      const member = users.find(u => u.id === params.id)
      setTeamMember(member)

      if (member) {
        const filteredPlans = plans.filter(plan => plan.createdBy === member.id)
        setMemberPlans(filteredPlans)
        const filteredReports = reports.filter(report => report.submittedBy === member.id)
        setMemberReports(filteredReports)
      }
    } else {
      router.push('/login')
    }
  }, [params.id, router])

  const handleApprovePlan = (planId: string) => {
    setMemberPlans(memberPlans.map(plan => 
      plan.id === planId ? { ...plan, status: 'Approved', reviewedAt: new Date().toISOString() } : plan
    ))
  }

  const handleRejectPlan = (planId: string, comment: string) => {
    setMemberPlans(memberPlans.map(plan => 
      plan.id === planId ? { ...plan, status: 'Rejected', comments: comment, reviewedAt: new Date().toISOString() } : plan
    ))
    // TODO: Send notification to team member
  }

  const handleApproveReport = (reportId: string) => {
    setMemberReports(memberReports.map(report => 
      report.id === reportId ? { ...report, status: 'Approved', reviewedAt: new Date().toISOString() } : report
    ))
  }

  const handleRejectReport = (reportId: string, comment: string) => {
    setMemberReports(memberReports.map(report => 
      report.id === reportId ? { ...report, status: 'Rejected', comments: comment, reviewedAt: new Date().toISOString() } : report
    ))
    // TODO: Send notification to team member
  }

  if (!currentUser || !teamMember) return null

  const pendingPlans = memberPlans.filter(plan => plan.status === 'Pending Review')
  const reviewedPlans = memberPlans.filter(plan => plan.status !== 'Pending Review')
  const pendingReports = memberReports.filter(report => report.status === 'Pending Review')
  const reviewedReports = memberReports.filter(report => report.status !== 'Pending Review')

  return (
    <div className="space-y-6">
      <Button variant="ghost" onClick={() => router.push('/dashboard/my-team')}>
        ← Back to My Team
      </Button>
      <h1 className="text-2xl font-bold text-[#2E2E31]">{teamMember.name}'s Plans and Reports</h1>
      <Tabs defaultValue="plans">
        <TabsList>
          <TabsTrigger value="plans">Plans</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        <TabsContent value="plans">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="bg-[#A38901] text-white">
                <CardTitle>Pending Review</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                {pendingPlans.map(plan => (
                  <PlanReviewCard 
                    key={plan.id} 
                    plan={plan}
                    onApprove={() => handleApprovePlan(plan.id)}
                    onReject={(comment) => handleRejectPlan(plan.id, comment)}
                  />
                ))}
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="bg-[#2E2E31] text-white">
                <CardTitle>Reviewed Plans</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                {reviewedPlans.map(plan => (
                  <PlanReviewCard key={plan.id} plan={plan} />
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="reports">
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
                    plan={memberPlans.find(p => p.id === report.planId)}
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
                    plan={memberPlans.find(p => p.id === report.planId)}
                  />
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

