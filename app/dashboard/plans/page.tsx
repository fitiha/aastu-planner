'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function PlansPage() {
  const [plans, setPlans] = useState([
    { id: 1, name: 'Increase Student Enrollment', status: 'In Progress', completion: '60%' },
    { id: 2, name: 'Improve Research Output', status: 'Approved', completion: '25%' },
    { id: 3, name: 'Enhance Campus Facilities', status: 'Pending Approval', completion: '0%' },
  ])

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Your Plans</h1>
        <Button>Create New Plan</Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Current Plans</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Plan Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Completion</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {plans.map((plan) => (
                <TableRow key={plan.id}>
                  <TableCell>{plan.name}</TableCell>
                  <TableCell>{plan.status}</TableCell>
                  <TableCell>{plan.completion}</TableCell>
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
  )
}

