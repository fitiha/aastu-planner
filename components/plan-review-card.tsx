import { useState } from 'react'
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, AlertCircle, CheckCircle, Clock, Edit, Delete } from "lucide-react"

interface PlanReviewCardProps {
  plan: {
    id: string
    name: string
    description: string
    status: string
    comments?: string
    reviewedAt?: string
    onDelete?: (id: string) => void
  }
  onApprove?: (id: string) => void
  onReject?: (id: string, comment: string) => void
}
export function PlanReviewCard({ plan, onApprove, onReject}: PlanReviewCardProps) {
  const router = useRouter()
  const [userPlans, setUserPlans] = useState<any[]>([])
  const [newPlans, setNewPlans] = useState<any[]>([])


  const handleEditNewPlan = (planId: string) => {
    const updatedPlans = userPlans.map((p) => {
      if (p.id === planId) {
      return { ...p, isEditing: true };
      }
      return p;
    });
    setUserPlans(updatedPlans);
  };

  const handleDeletePlan = (planId: string) => {
    if (plan.onDelete) {
      plan.onDelete(planId);
    }
  };

  return (
    <Card className="mb-4 border-[#A38901]">
      <CardHeader className=" text-black bg-gray-200 rounded-lg">
        <div className="flex justify-between items-start">
          <CardTitle>{plan.name}</CardTitle>
          {/* <Badge variant={plan.status === 'Approved' ? 'default' : 'destructive'}>
            {plan.status}
          </Badge> */}
        </div>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        <p>{plan.description}</p>
        <div className="flex space-x-2">
            <Button onClick={() => handleEditNewPlan(plan.id)} variant="outline" size="sm">
               <Edit className="mr-2 h-4 w-4" /> Edit
            </Button>
            <Button onClick={() => handleEditNewPlan(plan.id)} variant="default" size="sm" className='bg-red-500'>
              <Delete className="mr-2 h-4 w-4 " /> Delete
            </Button>
                      </div>
      </CardContent>
    </Card>
  )
}

