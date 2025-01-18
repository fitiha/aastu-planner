'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell } from "recharts"
import { plans, reports, users } from '@/lib/sample-data'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

export default function DashboardPage() {
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [userPlans, setUserPlans] = useState<any[]>([])
  const [userReports, setUserReports] = useState<any[]>([])

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser')
    if (storedUser) {
      const user = JSON.parse(storedUser)
      setCurrentUser(user)
      
      // Filter plans and reports for the current user
      const filteredPlans = plans.filter(plan => plan.createdBy === user.id || plan.assignedTo.includes(user.id))
      setUserPlans(filteredPlans)
      
      const filteredReports = reports.filter(report => {
        const reportPlan = filteredPlans.find(plan => plan.id === report.planId)
        return reportPlan && (reportPlan.createdBy === user.id || reportPlan.assignedTo.includes(user.id))
      })
      setUserReports(filteredReports)
    }
  }, [])

  const activePlans = userPlans.filter(plan => plan.status === 'In Progress').length
  const completedReports = userReports.length

  const planStatusData = [
    { name: 'Not Started', value: userPlans.filter(plan => plan.status === 'Not Started').length },
    { name: 'In Progress', value: userPlans.filter(plan => plan.status === 'In Progress').length },
    { name: 'Completed', value: userPlans.filter(plan => plan.status === 'Completed').length },
  ]

  const planProgressData = userPlans.map(plan => ({
    name: plan.name,
    progress: Math.round((plan.currentValue / plan.targetValue) * 100)
  }))

  const quarterlyReportData = [
    { name: 'Q1', reports: userReports.filter(report => report.quarter.startsWith('Q1')).length },
    { name: 'Q2', reports: userReports.filter(report => report.quarter.startsWith('Q2')).length },
    { name: 'Q3', reports: userReports.filter(report => report.quarter.startsWith('Q3')).length },
    { name: 'Q4', reports: userReports.filter(report => report.quarter.startsWith('Q4')).length },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Welcome, {currentUser?.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Active Plans</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-blue-600">{activePlans}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Completed Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-green-600">{completedReports}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Overall Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-purple-600">
              {userPlans.length > 0
                ? Math.round(
                    (userPlans.reduce((sum, plan) => sum + (plan.currentValue / plan.targetValue), 0) /
                      userPlans.length) *
                      100
                  )
                : 0}
              %
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Plan Status Distribution</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={planStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {planStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Quarterly Report Submission</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={quarterlyReportData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="reports" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Plan Progress</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={planProgressData} layout="vertical">
              <XAxis type="number" domain={[0, 100]} />
              <YAxis type="category" dataKey="name" width={150} />
              <Tooltip />
              <Legend />
              <Bar dataKey="progress" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}

