'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlanCard } from '@/components/plan-card'
import { plans } from '@/lib/sample-data'
import { Plus, AlertCircle, CheckCircle, Clock } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function MyPlansPage() {
  const router = useRouter()
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [userPlans, setUserPlans] = useState<any[]>([])

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser')
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser)
      setCurrentUser(parsedUser)
      const filteredPlans = plans.filter(plan => plan.createdBy === parsedUser.id)
      setUserPlans(filteredPlans)
    } else {
      router.push('/login')
    }
  }, [router])

  const handleCreatePlan = () => {
    router.push('/dashboard/my-plans/new')
  }

  const handleEditPlan = (planId: string, updatedPlan: any) => {
    setUserPlans(userPlans.map(plan => 
      plan.id === planId ? { ...plan, ...updatedPlan } : plan
    ))
  }

  const handleResubmitPlan = (planId: string) => {
    setUserPlans(userPlans.map(plan => 
      plan.id === planId ? { ...plan, status: 'Pending Review' } : plan
    ))
  }

  if (!currentUser) return null

  const pendingPlans = userPlans.filter(plan => plan.status === 'Pending Review')
  const approvedPlans = userPlans.filter(plan => plan.status === 'Approved')
  const rejectedPlans = userPlans.filter(plan => plan.status === 'Rejected')

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img 
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/aastu.jpg-oDwUB2nTEh9lUbV13ex90FkBNCbmJx.jpeg" 
            alt="AASTU Logo" 
            className="h-32 w-auto rounded-full"

          />
          <h1 className="text-3xl font-bold text-[#1A237E]">My Plans</h1>
        </div>
        <Button 
          onClick={handleCreatePlan}
          className="bg-[#C49B1D] hover:bg-[#B38A1C] text-white"
        >
          <Plus className="mr-2 h-4 w-4" /> Create New Plan
        </Button>
      </div>

      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-gray-100">
          <TabsTrigger 
            value="pending" 
            className="data-[state=active]:bg-[#C49B1D] data-[state=active]:text-white"
          >
            <Clock className="mr-2 h-4 w-4" /> Pending ({pendingPlans.length})
          </TabsTrigger>
          <TabsTrigger 
            value="approved" 
            className="data-[state=active]:bg-[#1A237E] data-[state=active]:text-white"
          >
            <CheckCircle className="mr-2 h-4 w-4" /> Approved ({approvedPlans.length})
          </TabsTrigger>
          <TabsTrigger 
            value="rejected" 
            className="data-[state=active]:bg-red-600 data-[state=active]:text-white"
          >
            <AlertCircle className="mr-2 h-4 w-4" /> Rejected ({rejectedPlans.length})
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
                  {pendingPlans.map(plan => (
                    <PlanCard key={plan.id} plan={plan} />
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
                  {approvedPlans.map(plan => (
                    <PlanCard key={plan.id} plan={plan} />
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
                  {rejectedPlans.map(plan => (
                    <PlanCard 
                      key={plan.id} 
                      plan={plan} 
                      onEdit={handleEditPlan}
                      onResubmit={handleResubmitPlan}
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

