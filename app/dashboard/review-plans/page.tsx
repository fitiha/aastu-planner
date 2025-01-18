'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import { plans as samplePlans, users } from '@/lib/sample-data'

export default function ReviewPlansPage() {
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [plansToReview, setPlansToReview] = useState<any[]>([])
  const router = useRouter()

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser')
    if (storedUser) {
      const user = JSON.parse(storedUser)
      setCurrentUser(user)
      // Filter plans that need review by this user
      const plansNeedingReview = samplePlans.filter(plan => {
        const planCreator = users.find(u => u.id === plan.createdBy)
        return planCreator && planCreator.superior === user.id && plan.status === 'Pending Review'
      })
      setPlansToReview(plansNeedingReview)
    } else {
      router.push('/login')
    }
  }, [router])

  const handleReviewAction = (planId: string, action: 'approve' | 'reject', comment: string) => {
    // TODO: Implement plan review logic (API call)
    console.log(`Plan ${planId} ${action}d with comment: ${comment}`)
    // Update local state
    setPlansToReview(plansToReview.filter(plan => plan.id !== planId))
  }

  if (!currentUser) return null

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Review Plans</h1>
      <Card>
        <CardHeader>
          <CardTitle>Plans Pending Review</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Plan Name</TableHead>
                <TableHead>Created By</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {plansToReview.map((plan) => (
                <TableRow key={plan.id}>
                  <TableCell>{plan.name}</TableCell>
                  <TableCell>{users.find(u => u.id === plan.createdBy)?.name}</TableCell>
                  <TableCell>{plan.description}</TableCell>
                  <TableCell>
                    <div className="space-y-2">
                      <Textarea placeholder="Add your comment here" className="mb-2" />
                      <div className="space-x-2">
                        <Button onClick={() => handleReviewAction(plan.id, 'approve', 'Approved')}>Approve</Button>
                        <Button onClick={() => handleReviewAction(plan.id, 'reject', 'Rejected')} variant="destructive">Reject</Button>
                      </div>
                    </div>
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

