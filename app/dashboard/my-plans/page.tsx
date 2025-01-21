"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlanCard } from "@/components/plan-card";
import {
  Plus,
  AlertCircle,
  CheckCircle,
  Clock,
  Edit,
  Send,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function MyPlansPage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [userPlans, setUserPlans] = useState<any[]>([]);
  const [newPlans, setNewPlans] = useState<any[]>([]);
  const [pendingPlans, setPendingPlans] = useState<any[]>([]);
  const [approvedPlans, setApprovedPlans] = useState<any[]>([]);
  const [rejectedPlans, setRejectedPlans] = useState<any[]>([]);

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
          setUserPlans([...(pending || []), ...(approved || []), ...(rejected || [])]);
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

  const handleCreatePlan = () => {
    router.push("/dashboard/my-plans/new");
  };

  const handleEditPlan = (planId: string, updatedPlan: any) => {
    setUserPlans(
      userPlans.map((plan) =>
        plan.id === planId ? { ...plan, ...updatedPlan } : plan
      )
    );
  };

  const handleResubmitPlan = (planId: string) => {
    setUserPlans(
      userPlans.map((plan) =>
        plan.id === planId ? { ...plan, status: "Pending Review" } : plan
      )
    );
  };

  const handleEditNewPlan = (planId: string) => {
    router.push(`/dashboard/my-plans/edit/${planId}`);
  };

  const handleSendNewPlan = (planId: string) => {
    const planToSend = newPlans.find((plan) => plan.id === planId);
    if (planToSend) {
      setUserPlans([...userPlans, { ...planToSend, status: "Pending Review" }]);
      setNewPlans(newPlans.filter((plan) => plan.id !== planId));
      localStorage.setItem(
        "newPlans",
        JSON.stringify(newPlans.filter((plan) => plan.id !== planId))
      );
    }
  };

  if (!currentUser) return null;

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

      <Tabs defaultValue="your-plans" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-gray-100">
          <TabsTrigger
            value="your-plans"
            className="data-[state=active]:bg-gray-500 data-[state=active]:text-white"
          >
            <Edit className="mr-2 h-4 w-4" /> Your Plans ({userPlans.length})
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
            <CheckCircle className="mr-2 h-4 w-4" /> Approved (
            {approvedPlans.length})
          </TabsTrigger>
          <TabsTrigger
            value="rejected"
            className="data-[state=active]:bg-red-600 data-[state=active]:text-white"
          >
            <AlertCircle className="mr-2 h-4 w-4" /> Rejected (
            {rejectedPlans.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="your-plans">
          <Card className="border-t-4 border-t-gray-500">
            <CardHeader className="bg-gray-500  text-white">
              <CardTitle>Your Plans</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <ScrollArea className="h-[60vh]">
                <div className="space-y-4">
                  {userPlans.map((plan) => (
                    <div
                      key={plan.id}
                      className="flex items-center justify-between bg-white p-4 rounded-lg shadow"
                    >
                      <div>
                        <h3 className="font-semibold">{plan.name}</h3>
                        <p className="text-sm text-gray-500">
                          {plan.description}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          onClick={() => handleEditNewPlan(plan.id)}
                          variant="outline"
                          size="sm"
                        >
                          <Edit className="mr-2 h-4 w-4" /> Edit
                        </Button>
                        <Button
                          onClick={() => handleSendNewPlan(plan.id)}
                          variant="default"
                          size="sm"
                        >
                          <Send className="mr-2 h-4 w-4" /> Send
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pending">
          <Card className="border-t-4 border-t-[#C49B1D]">
            <CardHeader className="bg-gradient-to-r from-[#C49B1D] to-[#D4AB2D] text-white">
              <CardTitle>Pending Review</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <ScrollArea className="h-[60vh]">
                <div className="space-y-4">
                  {pendingPlans && pendingPlans.length > 0 ? (
                    pendingPlans.map((plan) => (
                      <PlanCard key={plan.id} plan={plan} />
                    ))
                  ) : (
                    <p className="text-center text-gray-500">
                      No pending plans available.
                    </p>
                  )}
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
                  {approvedPlans && approvedPlans.length > 0 ? (
                    approvedPlans.map((plan) => (
                      <PlanCard key={plan.id} plan={plan} />
                    ))
                  ) : (
                    <p className="text-center text-gray-500">
                      No approved plans available.
                    </p>
                  )}
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
                  {rejectedPlans && rejectedPlans.length > 0 ? (
                    rejectedPlans.map((plan) => (
                      <PlanCard
                        key={plan.id}
                        plan={plan}
                        onEdit={handleEditPlan}
                        onResubmit={handleResubmitPlan}
                      />
                    ))
                  ) : (
                    <p className="text-center text-gray-500">
                      No rejected plans available.
                    </p>
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
