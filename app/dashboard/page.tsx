import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { PlanStatusChart } from "./components/plan-status-chart"
import { ReportSubmissionChart } from "./components/report-submission-chart"
import { UniversityProgressChart } from "./components/university-progress-chart"
import { PlanReportTable } from "./components/plan-report-table"

export default function DashboardPage() {
  // This data would typically come from an API or database
  const dashboardData = {
    totalPlans: 120,
    completedReports: 87,
    overallProgress: 72,
    planStatusDistribution: [
      { name: "Completed", value: 60 },
      { name: "In Progress", value: 45 },
      { name: "Not Started", value: 15 },
    ],
    quarterlyReportStatus: [
      { name: "Q1", submitted: 30, pending: 0 },
      { name: "Q2", submitted: 25, pending: 5 },
      { name: "Q3", submitted: 20, pending: 10 },
      { name: "Q4", submitted: 12, pending: 18 },
    ],
    universityProgress: [
      { name: "Faculty A", progress: 85 },
      { name: "Faculty B", progress: 70 },
      { name: "Faculty C", progress: 60 },
      { name: "Faculty D", progress: 75 },
      { name: "Faculty E", progress: 90 },
    ],
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Welcome to Yor Dashboard</h1>

      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Plans</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.totalPlans}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.completedReports}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.overallProgress}%</div>
            <Progress value={dashboardData.overallProgress} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Plan Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <PlanStatusChart data={dashboardData.planStatusDistribution} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Quarterly Report Submission Status</CardTitle>
          </CardHeader>
          <CardContent>
            <ReportSubmissionChart data={dashboardData.quarterlyReportStatus} />
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>University Plan Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <UniversityProgressChart data={dashboardData.universityProgress} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Detailed Plan and Report Information</CardTitle>
        </CardHeader>
        <CardContent>
          <PlanReportTable />
        </CardContent>
      </Card>
    </div>
  )
}
