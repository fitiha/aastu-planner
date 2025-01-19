'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { signupRequests, pendingUsers, users } from '@/lib/sample-data'

interface SignupRequest {
  id: string;
  userId: string;
  superiorId: string;
  requestDate: string;
}

interface PendingUser {
  id: string;
  name: string;
  email: string;
  role: string;
  superior: string;
  status: string;
}

export default function SignupRequestsPage() {
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [requests, setRequests] = useState<SignupRequest[]>([])
  const router = useRouter()

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser')
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser)
      setCurrentUser(parsedUser)
      // Filter requests for the current user
      const userRequests = signupRequests.filter(req => req.superiorId === parsedUser.id)
      setRequests(userRequests)
    } else {
      router.push('/login')
    }
  }, [router])

  const handleApprove = (requestId: string) => {
    // TODO: Implement approval logic
    console.log('Approving request:', requestId)
    setRequests(requests.filter(req => req.id !== requestId))
  }

  const handleDecline = (requestId: string) => {
    // TODO: Implement decline logic
    console.log('Declining request:', requestId)
    setRequests(requests.filter(req => req.id !== requestId))
  }

  if (!currentUser) return null

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
          <img 
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/aastu.jpg-oDwUB2nTEh9lUbV13ex90FkBNCbmJx.jpeg" 
            alt="AASTU Logo" 
            className="h-32 w-auto rounded-full"

          />
          <h1 className="text-3xl font-bold text-[#1A237E]">Signup Requests</h1>
        </div>
      
      <Card>
        <CardHeader>
          <CardTitle className='text-[#1A237E]'>Pending Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className='text-[#1A237E]'>Name</TableHead>
                <TableHead className='text-[#1A237E]'>Email</TableHead>
                <TableHead className='text-[#1A237E]'>Role</TableHead>
                <TableHead className='text-[#1A237E]'>Request Date</TableHead>
                <TableHead className='text-[#1A237E]'>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.map((request) => {
                const pendingUser = pendingUsers.find(user => user.id === request.userId) as PendingUser
                return (
                  <TableRow key={request.id}>
                    <TableCell>{pendingUser.name}</TableCell>
                    <TableCell>{pendingUser.email}</TableCell>
                    <TableCell>{pendingUser.role}</TableCell>
                    <TableCell>{request.requestDate}</TableCell>
                    <TableCell>
                      <Button onClick={() => handleApprove(request.id)} className="mr-2 bg-[#1A237E] text-white">Approve</Button>
                      <Button onClick={() => handleDecline(request.id)} variant="destructive">Decline</Button>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

