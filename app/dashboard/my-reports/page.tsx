"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ReportCard } from "@/components/report-card"
import { reports, plans } from "@/lib/sample-data"
import { Pencil, Trash2, Plus, AlertCircle, CheckCircle, Clock, Edit, Send } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { motion } from "framer-motion"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

export default function MyReportsPage() {
  const router = useRouter()
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [userReports, setUserReports] = useState<any[]>([])
  const [newReports, setNewReports] = useState<any[]>([])
  const [userPlans, setUserPlans] = useState<any[]>([])

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser")
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser)
      setCurrentUser(parsedUser)
      const filteredReports = reports.filter((report) => report.submittedBy === parsedUser.id)
      setUserReports(filteredReports)
      const filteredPlans = plans.filter((plan) => plan.createdBy === parsedUser.id)
      setUserPlans(filteredPlans)
      const storedNewReports = localStorage.getItem("newReports")
      if (storedNewReports) {
        setNewReports(JSON.parse(storedNewReports))
      }
    } else {
      router.push("/login")
    }
  }, [router])

  const handleCreateReport = () => {
    router.push("/dashboard/my-reports/new")
  }

  const handleEditReport = (reportId: string) => {
    router.push(`/dashboard/my-reports/edit/${reportId}`)
  }

  const handleDeleteReport = (reportId: string) => {
    setNewReports(newReports.filter((report) => report.id !== reportId))
    localStorage.setItem("newReports", JSON.stringify(newReports.filter((report) => report.id !== reportId)))
  }

  const handleSendReport = (reportId: string) => {
    const reportToSend = newReports.find((report) => report.id === reportId)
    if (reportToSend) {
      setUserReports([...userReports, { ...reportToSend, status: "Pending Review" }])
      setNewReports(newReports.filter((report) => report.id !== reportId))
      localStorage.setItem("newReports", JSON.stringify(newReports.filter((report) => report.id !== reportId)))
    }
  }

  const handleResubmitReport = (reportId: string) => {
    setUserReports(
      userReports.map((report) => (report.id === reportId ? { ...report, status: "Pending Review" } : report)),
    )
  }

  const handleEditReport2 = (reportId: string, updatedReport: any) => {
    setUserReports(userReports.map((report) => (report.id === reportId ? { ...report, ...updatedReport } : report)))
  }

  if (!currentUser) return null

  const pendingReports = userReports.filter((report) => report.status === "Pending Review")
  const approvedReports = userReports.filter((report) => report.status === "Approved")
  const rejectedReports = userReports.filter((report) => report.status === "Rejected")

  return (
    <div className="container rounded-xl mx-auto py-8 flex flex-col h-[calc(100vh-4rem)] bg-gradient-to-b from-blue-100 to-white transition-all duration-300 ease-in-out">
      <motion.div
        className="flex items-center gap-3 mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >

        <motion.h1 className="text-3xl font-bold text-[#1A237E] px-4" {...fadeInUp}>
          My Reports
        </motion.h1>
        <motion.div className="ml-auto" {...fadeInUp}>
          <Button onClick={handleCreateReport} className="bg-[#C49B1D] hover:bg-[#B38A1C] text-white">
            <Plus className="mr-2 h-4 w-4" /> Create New Report
          </Button>
        </motion.div>
      </motion.div>

      <motion.div className="flex-grow flex flex-col" {...fadeInUp}>
        <Card className="border-t-4 border-t-[#C49B1D] mb-6">
          <CardHeader className="bg-gradient-to-r from-[#C49B1D] to-[#D4AB2D] text-white">
            <CardTitle>My Reports</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Tabs defaultValue="your-reports" className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-gray-100">
                <TabsTrigger
                  value="your-reports"
                  className="data-[state=active]:bg-gray-500 data-[state=active]:text-white"
                >
                  <Edit className="mr-2 h-4 w-4" /> Your Reports ({newReports.length})
                </TabsTrigger>
                <TabsTrigger
                  value="pending"
                  className="data-[state=active]:bg-[#C49B1D] data-[state=active]:text-white"
                >
                  <Clock className="mr-2 h-4 w-4" /> Pending ({pendingReports.length})
                </TabsTrigger>
                <TabsTrigger
                  value="approved"
                  className="data-[state=active]:bg-[#1A237E] data-[state=active]:text-white"
                >
                  <CheckCircle className="mr-2 h-4 w-4" /> Approved ({approvedReports.length})
                </TabsTrigger>
                <TabsTrigger value="rejected" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">
                  <AlertCircle className="mr-2 h-4 w-4" /> Rejected ({rejectedReports.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="your-reports">
                <ScrollArea className="h-[calc(100vh-20rem)] border rounded-lg shadow-inner bg-gradient-to-b from-blue-50 to-white">
                  <motion.div
                    className="space-y-4 p-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    {newReports.map((report, index) => (
                      <motion.div
                        key={report.id}
                        className="flex items-center justify-between bg-white p-4 rounded-lg shadow"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <div>
                          <h3 className="font-semibold">{report.title}</h3>
                          <p className="text-sm text-gray-500">{report.description}</p>
                        </div>
                        <div className="flex space-x-2">
                          <Button onClick={() => handleEditReport(report.id)} variant="outline" size="sm">
                            <Edit className="mr-2 h-4 w-4" /> Edit
                          </Button>
                          <Button onClick={() => handleSendReport(report.id)} variant="default" size="sm">
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
                    {pendingReports.map((report, index) => (
                      <motion.div
                        key={report.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <ReportCard report={report} plan={userPlans.find((p) => p.id === report.planId)} />
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
                    {approvedReports.map((report, index) => (
                      <motion.div
                        key={report.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <ReportCard report={report} plan={userPlans.find((p) => p.id === report.planId)} />
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
                    {rejectedReports.map((report, index) => (
                      <motion.div
                        key={report.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <ReportCard
                          report={report}
                          plan={userPlans.find((p) => p.id === report.planId)}
                          onEdit={handleEditReport2}
                          onResubmit={handleResubmitReport}
                        />
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

