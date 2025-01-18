'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Sample data
const sampleTeamMembers = [
  { id: 1, name: 'John Doe', role: 'Director', email: 'john.doe@aastu.edu', status: 'Active' },
  { id: 2, name: 'Jane Smith', role: 'Team Lead', email: 'jane.smith@aastu.edu', status: 'Active' },
  { id: 3, name: 'Bob Johnson', role: 'Staff', email: 'bob.johnson@aastu.edu', status: 'Pending Approval' },
]

export default function TeamPage() {
  const [teamMembers, setTeamMembers] = useState(sampleTeamMembers)

  const handleApprove = (id: number) => {
    // TODO: Implement approval logic
    console.log('Approving team member with id:', id)
    setTeamMembers(teamMembers.map(member => 
      member.id === id ? { ...member, status: 'Active' } : member
    ))
  }

  const handleRemove = (id: number) => {
    // TODO: Implement removal logic
    console.log('Removing team member with id:', id)
    setTeamMembers(teamMembers.filter(member => member.id !== id))
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Team Management</h1>
      <Card>
        <CardHeader>
          <CardTitle>Your Team Members</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teamMembers.map((member) => (
                <TableRow key={member.id}>
                  <TableCell>{member.name}</TableCell>
                  <TableCell>{member.role}</TableCell>
                  <TableCell>{member.email}</TableCell>
                  <TableCell>{member.status}</TableCell>
                  <TableCell>
                    {member.status === 'Pending Approval' ? (
                      <Button onClick={() => handleApprove(member.id)} variant="outline" size="sm">Approve</Button>
                    ) : (
                      <Button onClick={() => handleRemove(member.id)} variant="outline" size="sm">Remove</Button>
                    )}
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

