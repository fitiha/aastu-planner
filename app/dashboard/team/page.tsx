'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { users, plans, reports } from '@/lib/sample-data'

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  superior?: string;
  subordinates?: string[];
}

interface Plan {
  id: string;
  name: string;
  description: string;
  status: string;
  targetValue: number;
  currentValue: number;
  startDate: string;
  endDate: string;
  createdBy: string;
  assignedTo: string[];
  pillarId: string;
  accomplishmentValue: string;
  targetQuarter: string;
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

export default function TeamPage() {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [teamMembers, setTeamMembers] = useState<User[]>([])
  const [selectedMember, setSelectedMember] = useState<User | null>(null)
  const [memberPlans, setMemberPlans] = useState<Plan[]>([])
  const [memberReports, setMemberReports] = useState<Report[]>([])
  const router = useRouter()

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser')
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser)
      setCurrentUser(parsedUser)
      if (parsedUser.role !== 'staff') {
        const subordinates = users.filter(u => parsedUser.subordinates?.includes(u.id))
        setTeamMembers(subordinates)
      } else {
        router.push('/dashboard')
      }
    } else {
      router.push('/login')
    }
  }, [router])

  useEffect(() => {
    if (selectedMember) {
      const memberPlans = plans.filter(plan => plan.assignedTo.includes(selectedMember.id))
      setMemberPlans(memberPlans)
      const memberReports = reports.filter(report => report.submittedBy === selectedMember.id)
      setMemberReports(memberReports)
    }
  }, [selectedMember])

  const handleSelectMember = (member: User) => {
    setSelectedMember(member)
  }

  if (!currentUser || currentUser.role === 'staff') {
    return null
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Team Management</h1>
      <div className="flex space-x-6">
        <Card className="w-1/3">
          <CardHeader>
            <CardTitle>Your Team Members</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {teamMembers.map((member) => (
                <li key={member.id}>
                  <Button
                    variant={selectedMember?.id === member.id ? "default" : "outline"}
                    className="w-full justify-start"
                    onClick={() => handleSelectMember(member)}
                  >
                    {member.name}
                  </Button>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        {selectedMember && (
          <Card className="w-2/3">
            <CardHeader>
              <CardTitle>{selectedMember.name}'s Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="plans">
                <TabsList>
                  <TabsTrigger value="plans">Plans</TabsTrigger>
                  <TabsTrigger value="reports">Reports</TabsTrigger>
                </TabsList>
                <TabsContent value="plans">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Plan Name</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Progress</TableHead>
                        <TableHead>Target Quarter</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {memberPlans.map((plan) => (
                        <TableRow key={plan.id}>
                          <TableCell>{plan.name}</TableCell>
                          <TableCell>{plan.status}</TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Progress value={(plan.currentValue / plan.targetValue) * 100} className="w-[60%]" />
                              <span>{Math.round((plan.currentValue / plan.targetValue) * 100)}%</span>
                            </div>
                          </TableCell>
                          <TableCell>{plan.targetQuarter}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>
                <TabsContent value="reports">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Report ID</TableHead>
                        <TableHead>Quarter</TableHead>
                        <TableHead>Completion</TableHead>
                        <TableHead>Submission Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {memberReports.map((report) => (
                        <TableRow key={report.id}>
                          <TableCell>{report.id}</TableCell>
                          <TableCell>{report.quarter}</TableCell>
                          <TableCell>{report.completion}%</TableCell>
                          <TableCell>{report.submissionDate}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

