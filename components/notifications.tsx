'use client'

import { useState, useEffect } from 'react'
import { Bell } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Notification {
  id: number;
  message: string;
  type: 'Approval' | 'Comment' | 'Status Update';
  date: string;
}

// This would typically come from an API
const sampleNotifications: Notification[] = [
  { id: 1, message: "Your plan 'Increase Student Enrollment' has been approved", type: "Approval", date: "2023-05-20" },
  { id: 2, message: "New comment on your 'Research Output' plan", type: "Comment", date: "2023-05-19" },
  { id: 3, message: "Plan 'Enhance Campus Facilities' status changed to 'In Progress'", type: "Status Update", date: "2023-05-18" },
  { id: 4, message: "Your report for Q1 has been approved", type: "Approval", date: "2023-05-17" },
  { id: 5, message: "New comment on your Q2 report", type: "Comment", date: "2023-05-16" },
]

export function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>(sampleNotifications)

  const handleNotificationClick = (id: number) => {
    // TODO: Implement notification action (e.g., navigate to relevant page)
    console.log('Clicked notification:', id)
    // Remove the notification after clicking
    setNotifications(notifications.filter(n => n.id !== id))
  }

  const groupedNotifications = notifications.reduce((acc, notification) => {
    if (!acc[notification.type]) {
      acc[notification.type] = [];
    }
    acc[notification.type].push(notification);
    return acc;
  }, {} as Record<string, Notification[]>);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Bell className="h-[1.2rem] w-[1.2rem]" />
          {notifications.length > 0 && (
            <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-xs text-white flex items-center justify-center">
              {notifications.length}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <ScrollArea className="h-80">
          {Object.entries(groupedNotifications).map(([type, typeNotifications]) => (
            <div key={type}>
              <DropdownMenuLabel>{type}</DropdownMenuLabel>
              {typeNotifications.map((notification) => (
                <DropdownMenuItem key={notification.id} onClick={() => handleNotificationClick(notification.id)}>
                  <div className="flex flex-col">
                    <span>{notification.message}</span>
                    <span className="text-xs text-gray-500">{notification.date}</span>
                  </div>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
            </div>
          ))}
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

