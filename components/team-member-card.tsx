import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ClipboardList, User } from 'lucide-react'

interface TeamMemberCardProps {
  member: any
  pendingItems: number
  onClick: () => void
}

export function TeamMemberCard({ member, pendingItems, onClick }: TeamMemberCardProps) {
  return (
    <Card className="group hover:border-[#1A237E] transition-colors">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 rounded-full bg-[#1A237E] flex items-center justify-center text-white">
              <User className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-semibold text-[#1A237E] group-hover:text-[#2A337E]">
                {member.name}
              </h3>
              <p className="text-sm text-gray-500">{member.position}</p>
              {pendingItems > 0 && (
                <Badge 
                  className="mt-2 bg-[#C49B1D] hover:bg-[#B38A1C]"
                >
                  <ClipboardList className="mr-1 h-3 w-3" />
                  {pendingItems} Pending
                </Badge>
              )}
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onClick}
            className="opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#1A237E] hover:text-white"
          >
            View
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

