import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
export default function PendingApprovalPage() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  }
  return (
<div className="container rounded-xl mx-auto py-8 space-y-8 bg-gradient-to-b from-blue-100 to-white transition-all duration-300 ease-in-out">      <Card className="w-full max-w-md">
  <CardHeader>
    <motion.div
      className="flex items-center gap-3 mb-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
    <motion.h1 className="text-3xl font-bold text-[#1A237E] px-4" {...fadeInUp}>
    <CardTitle>Approval Pending</CardTitle>
   </motion.h1>
   </motion.div>
          <motion.div {...fadeInUp}>
            <CardDescription>Your account is awaiting approval</CardDescription>
          </motion.div>
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

