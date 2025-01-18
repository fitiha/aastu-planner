import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function PendingApprovalPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Approval Pending</CardTitle>
          <CardDescription>Your account is awaiting approval</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-600">
            Thank you for signing up. Your account is currently pending approval from your superior. 
            You will receive an email notification once your account has been approved or denied.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

