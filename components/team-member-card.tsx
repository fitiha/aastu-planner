import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { User, AlertCircle } from 'lucide-react'

interface TeamMemberCardProps {
  member: {
    id: string
    name: string
    email: string
    role: string
    department: string
  }
  pendingItems: number
  onClick: () => void
}

export function TeamMemberCard({ member, pendingItems, onClick }: TeamMemberCardProps) {
  return (
    <Card 
      className="cursor-pointer transition-all hover:shadow-lg border-[#A38901] hover:border-[#2E2E31]"
      onClick={onClick}
    >
      <CardHeader className="bg-[#A38901] text-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <User className="h-8 w-8" />
            <div>
              <h3 className="font-bold">{member.name}</h3>
              <p className="text-sm opacity-90">{member.role}</p>
            </div>
          </div>
          {pendingItems > 0 && (
            <div className="flex items-center gap-1 bg-red-500 text-white px-2 py-1 rounded-full">
              <AlertCircle className="h-4 w-4" />
              <span className="text-sm font-bold">{pendingItems}</span>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <p className="text-sm text-gray-600 mb-2">{member.email}</p>
        <p className="text-sm font-medium text-[#2E2E31]">{member.department}</p>
      </CardContent>
    </Card>
  )
}

