"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function NewReportPage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [userPlans, setUserPlans] = useState<any[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [formData, setFormData] = useState({
    planId: "",
    report_title: "",
    report_details: "",
    value: "",
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    const token = localStorage.getItem("token"); // Assuming the token is stored in localStorage.

    if (!storedUser || !token) {
      router.push("/login");
      return;
    }

    const parsedUser = JSON.parse(storedUser);
    setCurrentUser(parsedUser);

    // Fetch plans
    fetchPlans(token);
  }, [router]);

  const fetchPlans = async (token: string) => {
    try {
      const response = await fetch(
        "https://planning-server-ui10.onrender.com/plan/titles",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        const approvedPlans = data.plans.filter(
          (plan: any) => plan.status === "Approved"
        );
        setUserPlans(approvedPlans);
      } else {
        console.error("Failed to fetch plans");
      }
    } catch (error) {
      console.error("Error fetching plans:", error);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlanSelect = (planId: string) => {
    const plan = userPlans.find((p) => p.plan_id === planId);
    console.log("first plan is", plan.value);
    setSelectedPlan(plan);
    setFormData((prev) => ({
      ...prev,
      planId,
      report_title: plan.title,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    const newReport = {
      plan_id: formData.planId,
      report_title: formData.report_title,
      report_details: formData.report_details,
      type: "report",
      value: Number(formData.value),
    };

    try {
      console.log("new report is", newReport);
      const response = await fetch(
        "https://planning-server-ui10.onrender.com/report/submit",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newReport),
        }
      );

      if (response.ok) {
        router.push("/dashboard/my-reports");
      } else {
        console.error("Failed to submit report");
      }
    } catch (error) {
      console.error("Error submitting report:", error);
    }
  };

  if (!currentUser) return null;

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Create New Report</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="planId">Select Plan</label>
            <Select onValueChange={handlePlanSelect} required>
              <SelectTrigger>
                <SelectValue placeholder="Select a plan" />
              </SelectTrigger>
              <SelectContent>
                {userPlans.map((plan) => (
                  <SelectItem key={plan.plan_id} value={plan.plan_id}>
                    {plan.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {selectedPlan && (
            <div className="space-y-2">
              <label htmlFor="value">
                Accomplished Value (out of {selectedPlan.value || "N/A"})
              </label>
              <Input
                id="value"
                name="value"
                type="number"
                min="0"
                max={selectedPlan.value || undefined}
                value={formData.value}
                onChange={handleInputChange}
                required
              />
            </div>
          )}
          <div className="space-y-2">
            <label htmlFor="report_details">Report Details</label>
            <Textarea
              id="report_details"
              name="report_details"
              value={formData.report_details}
              onChange={handleInputChange}
              required
            />
          </div>
          <Button type="submit">Save Report</Button>
        </form>
      </CardContent>
    </Card>
  );
}
