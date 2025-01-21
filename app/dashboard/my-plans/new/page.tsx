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
import { pillars } from "@/lib/sample-data";

export default function NewPlanPage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [superiorPlans, setSuperiorPlans] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    pillarId: "",
    alignedPlanId: "",
    accomplishmentValue: "",
    targetQuarter: "",
    startDate: "",
    endDate: "",
    planType: "yearly",
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    const token = localStorage.getItem("token");
    if (storedUser && token) {
      const parsedUser = JSON.parse(storedUser);
      setCurrentUser(parsedUser);
      fetch("https://planning-server-ui10.onrender.com/plans/title", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setSuperiorPlans(data.titles);
          console.log(data);
        })
        .catch((error) =>
          console.error("Error fetching superior plans:", error)
        );
    } else {
      router.push("/login");
    }
  }, [router]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const newPlan = {
      title: formData.name,
      description: formData.description,
      which_quarter: formData.targetQuarter,
      superior_plan: formData.alignedPlanId,
      aligned_pillary: formData.pillarId,
      type: "plan",
      start_date: new Date(formData.startDate).toISOString(),
      end_date: new Date(formData.endDate).toISOString(),
      value: parseInt(formData.accomplishmentValue),
    };
    fetch("https://planning-server-ui10.onrender.com/summit/plan", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newPlan),
    })
      .then((response) => response.json())
      .then(() => {
        router.push("/dashboard/my-plans");
      })
      .catch((error) => console.error("Error submitting new plan:", error));
  };

  if (!currentUser) return null;

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Create New Plan</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name">Plan Name</label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="description">Description</label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="pillarId">Aligned Pillar</label>
            <Select
              name="pillarId"
              onValueChange={(value) => handleSelectChange("pillarId", value)}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a pillar" />
              </SelectTrigger>
              <SelectContent>
                {pillars.map((pillar) => (
                  <SelectItem key={pillar.id} value={pillar.id.toString()}>
                    {pillar.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label htmlFor="alignedPlanId">Aligned Superior Plan</label>
            <Select
              name="alignedPlanId"
              onValueChange={(value) =>
                handleSelectChange("alignedPlanId", value)
              }
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a superior plan" />
              </SelectTrigger>
              <SelectContent>
                {superiorPlans.map((plan) => (
                  <SelectItem key={plan} value={plan}>
                    {plan}
                  </SelectItem>
                ))}
              </SelectContent> 
            </Select> 
          </div>
          <div className="space-y-2">
            <label htmlFor="accomplishmentValue">
              Value of Full Accomplishment
            </label>
            <Input
              id="accomplishmentValue"
              name="accomplishmentValue"
              value={formData.accomplishmentValue}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="targetQuarter">
              Planned Quarter for Implementation
            </label>
            <Select
              name="targetQuarter"
              onValueChange={(value) =>
                handleSelectChange("targetQuarter", value)
              }
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a quarter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Q1">Q1</SelectItem>
                <SelectItem value="Q2">Q2</SelectItem>
                <SelectItem value="Q3">Q3</SelectItem>
                <SelectItem value="Q4">Q4</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label htmlFor="startDate">Start Date</label>
            <Input
              type="date"
              id="startDate"
              name="startDate"
              value={formData.startDate}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="endDate">End Date</label>
            <Input
              type="date"
              id="endDate"
              name="endDate"
              value={formData.endDate}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="planType">Plan Type</label>
            <Select
              name="planType"
              onValueChange={(value) => handleSelectChange("planType", value)}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select plan type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yearly">Yearly</SelectItem>
                <SelectItem value="5-year">5-Year</SelectItem>
                <SelectItem value="10-year">10-Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit">Save Plan</Button>
        </form>
      </CardContent>
    </Card>
  );
}
