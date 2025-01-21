"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { plans } from "@/lib/sample-data"

export default function EditReportPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [userPlans, setUserPlans] = useState<any[]>([])
  const [selectedPlan, setSelectedPlan] = useState<any>(null)
  const [formData, setFormData] = useState({
    planId: "",
    accomplishedValue: "",
    notes: "",
  })

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser")
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser)
      setCurrentUser(parsedUser)
      const filteredPlans = plans.filter((plan) => plan.createdBy === parsedUser.id && plan.status === "Approved")
      setUserPlans(filteredPlans)

      // Fetch the report to edit
      const storedNewReports = localStorage.getItem("newReports")
      if (storedNewReports) {
        const newReports = JSON.parse(storedNewReports)
        const reportToEdit = newReports.find((report: any) => report.id === params.id)
        if (reportToEdit) {
          setFormData(reportToEdit)
          setSelectedPlan(filteredPlans.find((plan) => plan.id === reportToEdit.planId))
        } else {
          router.push("/dashboard/my-reports")
        }
      }
    } else {
      router.push("/login")
    }
  }, [router, params.id])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePlanSelect = (planId: string) => {
    const plan = userPlans.find((p) => p.id === planId)
    setSelectedPlan(plan)
    setFormData((prev) => ({ ...prev, planId }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const storedNewReports = localStorage.getItem("newReports")
    if (storedNewReports) {
      const newReports = JSON.parse(storedNewReports)
      const updatedReports = newReports.map((report: any) =>
        report.id === params.id
          ? { ...report, ...formData, accomplishedValue: Number(formData.accomplishedValue) }
          : report,
      )
      localStorage.setItem("newReports", JSON.stringify(updatedReports))
    }
    router.push("/dashboard/my-reports")
  }

  if (!currentUser) return null

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Edit Report</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="planId">Select Plan</label>
            <Select onValueChange={handlePlanSelect} value={formData.planId} required>
              <SelectTrigger>
                <SelectValue placeholder="Select a plan" />
              </SelectTrigger>
              <SelectContent>
                {userPlans.map((plan) => (
                  <SelectItem key={plan.id} value={plan.id}>
                    {plan.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {selectedPlan && (
            <div className="space-y-2">
              <label htmlFor="accomplishedValue">Accomplished Value (out of {selectedPlan.accomplishmentValue})</label>
              <Input
                id="accomplishedValue"
                name="accomplishedValue"
                type="number"
                min="0"
                max={selectedPlan.accomplishmentValue}
                value={formData.accomplishedValue}
                onChange={handleInputChange}
                required
              />
            </div>
          )}
          <div className="space-y-2">
            <label htmlFor="notes">Report Details</label>
            <Textarea id="notes" name="notes" value={formData.notes} onChange={handleInputChange} required />
          </div>
          <Button type="submit">Update Report</Button>
        </form>
      </CardContent>
    </Card>
  )
}

