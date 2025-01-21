"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { PlanReviewCard } from "@/components/plan-review-card"
import { plans, users } from "@/lib/sample-data"
import { Plus, AlertCircle, CheckCircle, Clock, Edit, Send } from "lucide-react"
import { motion } from "framer-motion"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

export default function UniversityPlansPage() {
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [universityPlans, setUniversityPlans] = useState<any[]>([])
  const router = useRouter()

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser")
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser)
      setCurrentUser(parsedUser)
      if (parsedUser.role === "planning_office") {
        const allUniversityPlans = plans.filter((plan) => plan.createdBy.startsWith("VP"))
        setUniversityPlans(allUniversityPlans)
      } else {
        router.push("/dashboard")
      }
    } else {
      router.push("/login")
    }
  }, [router])

  const handleApprovePlan = (planId: string) => {
    setUniversityPlans(universityPlans.map((plan) => (plan.id === planId ? { ...plan, status: "Approved" } : plan)))
  }

  const handleRejectPlan = (planId: string, comment: string) => {
    setUniversityPlans(
      universityPlans.map((plan) => (plan.id === planId ? { ...plan, status: "Rejected", comments: comment } : plan)),
    )
  }

  const handleCreatePlan = () => {
    router.push("/dashboard/university-plans/new")
  }

  if (!currentUser) return null

  const reviewedPlans = universityPlans.filter((plan) => plan.status !== "Pending Review")

  return (
    <div className="container mx-auto py-8 flex flex-col h-[calc(100vh-4rem)] bg-gradient-to-b from-blue-100 to-white transition-all duration-300 ease-in-out">
      <motion.div
        className="flex items-center gap-3 mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/aastu.jpg-oDwUB2nTEh9lUbV13ex90FkBNCbmJx.jpeg"
          alt="AASTU Logo"
          className="h-32 w-auto rounded-full mx-3"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        />
        <motion.h1 className="text-3xl font-bold text-[#1A237E]" {...fadeInUp}>
          University Plans
        </motion.h1>
      </motion.div>

      <div className="flex-grow flex flex-col">
        <Card className="border-t-4 border-t-[#C49B1D] mb-6">
          <CardHeader className="bg-gradient-to-r from-[#C49B1D] to-[#D4AB2D] text-white">
            <CardTitle className="flex justify-between items-center">
              <span>University Plans</span>
              <Button onClick={handleCreatePlan} className="bg-[#1A237E] hover:bg-[#2A337E] text-white">
                <Plus className="mr-2 h-4 w-4" /> Create New Plan
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[calc(100vh-20rem)] border rounded-lg shadow-inner bg-gradient-to-b from-blue-50 to-white">
              <motion.div
                className="space-y-6 p-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {reviewedPlans.map((plan, index) => (
                  <motion.div
                    key={plan.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <PlanReviewCard plan={plan} />
                  </motion.div>
                ))}
              </motion.div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

