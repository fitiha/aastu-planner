"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Progress } from "@/components/ui/progress";
import { PlanStatusChart } from "./components/plan-status-chart";
import { UniversityProgressChart } from "./components/university-progress-chart";
import { ReportSubmissionChart } from "./components/report-submission-chart";
import { PlanReportTable } from "./components/plan-report-table";

export default function DashboardPage() {
  const router = useRouter();
  const [pendingPlans, setPendingPlans] = useState<any[]>([]);
  const [approvedPlans, setApprovedPlans] = useState<any[]>([]);
  const [rejectedPlans, setRejectedPlans] = useState<any[]>([]);
  const [userPlans, setUserPlans] = useState<any[]>([]);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const storedUser = localStorage.getItem("currentUser");
  useEffect(() => {
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    const token = localStorage.getItem("token");
    if (storedUser && token) {
      const parsedUser = JSON.parse(storedUser);
      setCurrentUser(parsedUser);

      const fetchPlans = async (status: string) => {
        const response = await fetch(
          `https://planning-server-ui10.onrender.com/filter?status=${status}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        return data.plans;
      };

      const fetchAllPlans = async () => {
        try {
          const pending = await fetchPlans("Pending");
          const approved = await fetchPlans("Approved");
          const rejected = await fetchPlans("Rejected");

          // Ensure fallback values in case any response is null
          setPendingPlans(pending || []);
          setApprovedPlans(approved || []);
          setRejectedPlans(rejected || []);

          console.log("Pending Plans:", pending);
          console.log("Approved Plans:", approved);
          console.log("Rejected Plans:", rejected);

          // Combine the plans safely
          setUserPlans([
            ...(pending || []),
            ...(approved || []),
            ...(rejected || []),
          ]);
        } catch (error) {
          console.error("Error fetching plans:", error);
          // Handle the error gracefully
          setPendingPlans([]);
          setApprovedPlans([]);
          setRejectedPlans([]);
          setUserPlans([]);
        }
      };

      fetchAllPlans();
    } else {
      router.push("/login");
    }
  }, [router]);

  const dashboardData = {
    totalPlans: userPlans.length,
    completedReports: approvedPlans.length,
    overallProgress: (approvedPlans.length/userPlans.length) * 100,
    planStatusDistribution: [
      { name: "Completed", value: approvedPlans.length },
      { name: "In Progress", value: pendingPlans.length },
      { name: "Not Started", value: 0 },
    ],
    quarterlyReportStatus: [
      { name: "Q1", submitted: 30, pending: 0 },
      { name: "Q2", submitted: 25, pending: 5 },
      { name: "Q3", submitted: 20, pending: 10 },
      { name: "Q4", submitted: 12, pending: 18 },
    ],
    universityProgress: [
      { name: "Faculty A", progress: 85 },
      { name: "Faculty B", progress: 70 },
      { name: "Faculty C", progress: 60 },
      { name: "Faculty D", progress: 75 },
      { name: "Faculty E", progress: 90 },
    ],
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">Welcome, {currentUser?.full_name}</h1>

      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Plans</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.totalPlans}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Completed Reports
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {dashboardData.completedReports}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Overall Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {dashboardData.overallProgress}%
            </div>
            <Progress value={dashboardData.overallProgress} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Plan Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <PlanStatusChart data={dashboardData.planStatusDistribution} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Quarterly Report Submission Status</CardTitle>
          </CardHeader>
          <CardContent>
            <ReportSubmissionChart data={dashboardData.quarterlyReportStatus} />
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>University Plan Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <UniversityProgressChart data={dashboardData.universityProgress} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Detailed Plan and Report Information</CardTitle>
        </CardHeader>
        <CardContent>
          <PlanReportTable />
        </CardContent>
      </Card>
    </div>
  );
}
