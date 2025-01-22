"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlanCard } from "@/components/plan-card"
import { plans } from "@/lib/sample-data"
import { Plus, AlertCircle, CheckCircle, Clock, Edit, Send } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { motion } from "framer-motion"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

export default function MyPlansPage() {
  const router = useRouter()
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [userPlans, setUserPlans] = useState<any[]>([])
  const [newPlans, setNewPlans] = useState<any[]>([])

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser")
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser)
      setCurrentUser(parsedUser)
      const filteredPlans = plans.filter((plan) => plan.createdBy === parsedUser.id)
      setUserPlans(filteredPlans)
      const storedNewPlans = localStorage.getItem("newPlans")
      if (storedNewPlans) {
        setNewPlans(JSON.parse(storedNewPlans))
      }
    } else {
      router.push("/login")
    }
  }, [router])

  const handleCreatePlan = () => {
    router.push("/dashboard/my-plans/new")
  }

  const handleEditPlan = (planId: string, updatedPlan: any) => {
    setUserPlans(userPlans.map((plan) => (plan.id === planId ? { ...plan, ...updatedPlan } : plan)))
  }

  const handleResubmitPlan = (planId: string) => {
    setUserPlans(userPlans.map((plan) => (plan.id === planId ? { ...plan, status: "Pending Review" } : plan)))
  }

  const handleEditNewPlan = (planId: string) => {
    router.push(`/dashboard/my-plans/edit/${planId}`)
  }

  const handleSendNewPlan = (planId: string) => {
    const planToSend = newPlans.find((plan) => plan.id === planId)
    if (planToSend) {
      setUserPlans([...userPlans, { ...planToSend, status: "Pending Review" }])
      setNewPlans(newPlans.filter((plan) => plan.id !== planId))
      localStorage.setItem("newPlans", JSON.stringify(newPlans.filter((plan) => plan.id !== planId)))
    }
  }

  if (!currentUser) return null

  const pendingPlans = userPlans.filter((plan) => plan.status === "Pending Review")
  const approvedPlans = userPlans.filter((plan) => plan.status === "Approved")
  const rejectedPlans = userPlans.filter((plan) => plan.status === "Rejected")

  return (
    <div className="container rounded-xl mx-auto py-8 flex flex-col h-[calc(100vh-4rem)] bg-gradient-to-b from-blue-100 to-white transition-all duration-300 ease-in-out">
      <motion.div
        className="flex items-center gap-3 mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        
        <motion.h1 className="text-3xl font-bold text-[#1A237E] px-4" {...fadeInUp}>
          My Plans
        </motion.h1>
        <motion.div className="ml-auto" {...fadeInUp}>
          <Button onClick={handleCreatePlan} className="bg-[#C49B1D] hover:bg-[#B38A1C] text-white">
            <Plus className="mr-2 h-4 w-4" /> Create New Plan
          </Button>
        </motion.div>
      </motion.div>

      <motion.div className="flex-grow flex flex-col" {...fadeInUp}>
        <Card className="border-t-4 border-t-[#C49B1D] mb-6">
          <CardHeader className="bg-gradient-to-r from-[#C49B1D] to-[#D4AB2D] text-white">
            <CardTitle>My Plans</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Tabs defaultValue="your-plans" className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-gray-100">
                <TabsTrigger
                  value="your-plans"
                  className="data-[state=active]:bg-gray-500 data-[state=active]:text-white"
                >
                  <Edit className="mr-2 h-4 w-4" /> Your Plans ({newPlans.length})
                </TabsTrigger>
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
                <TabsTrigger value="rejected" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">
                  <AlertCircle className="mr-2 h-4 w-4" /> Rejected ({rejectedPlans.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="your-plans">
                <ScrollArea className="h-[calc(100vh-20rem)] border rounded-lg shadow-inner bg-gradient-to-b from-blue-50 to-white">
                  <motion.div
                    className="space-y-4 p-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    {newPlans.map((plan, index) => (
                      <motion.div
                        key={plan.id}
                        className="flex items-center justify-between bg-white p-4 rounded-lg shadow"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <div>
                          <h3 className="font-semibold">{plan.name}</h3>
                          <p className="text-sm text-gray-500">{plan.description}</p>
                        </div>
                        <div className="flex space-x-2">
                          <Button onClick={() => handleEditNewPlan(plan.id)} variant="outline" size="sm">
                            <Edit className="mr-2 h-4 w-4" /> Edit
                          </Button>
                          <Button onClick={() => handleSendNewPlan(plan.id)} variant="default" size="sm">
                            <Send className="mr-2 h-4 w-4" /> Send
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="pending">
                <ScrollArea className="h-[calc(100vh-20rem)] border rounded-lg shadow-inner bg-gradient-to-b from-blue-50 to-white">
                  <motion.div
                    className="space-y-4 p-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    {pendingPlans.map((plan, index) => (
                      <motion.div
                        key={plan.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <PlanCard plan={plan} />
                      </motion.div>
                    ))}
                  </motion.div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="approved">
                <ScrollArea className="h-[calc(100vh-20rem)] border rounded-lg shadow-inner bg-gradient-to-b from-blue-50 to-white">
                  <motion.div
                    className="space-y-4 p-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    {approvedPlans.map((plan, index) => (
                      <motion.div
                        key={plan.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <PlanCard plan={plan} />
                      </motion.div>
                    ))}
                  </motion.div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="rejected">
                <ScrollArea className="h-[calc(100vh-20rem)] border rounded-lg shadow-inner bg-gradient-to-b from-blue-50 to-white">
                  <motion.div
                    className="space-y-4 p-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    {rejectedPlans.map((plan, index) => (
                      <motion.div
                        key={plan.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <PlanCard plan={plan} onEdit={handleEditPlan} onResubmit={handleResubmitPlan} />
                      </motion.div>
                    ))}
                  </motion.div>
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

