'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Announcement {
  id: number;
  title: string;
  content: string;
  date: string;
}

// This would typically come from an API
const sampleAnnouncements: Announcement[] = [
  { id: 1, title: "New Strategic Plan", content: "The university has launched a new 5-year strategic plan. All departments are required to align their goals accordingly.", date: "2023-05-15" },
  { id: 2, title: "Upcoming Board Meeting", content: "The next board meeting is scheduled for June 15th. Please submit all required reports by June 1st.", date: "2023-05-10" },
  { id: 3, title: "Research Grant Opportunity", content: "A new research grant opportunity has been announced. Deadline for submissions is July 31st.", date: "2023-05-05" },
]

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>(sampleAnnouncements)

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Announcements</h1>
      {announcements.map((announcement) => (
        <Card key={announcement.id}>
          <CardHeader>
            <CardTitle>{announcement.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{announcement.content}</p>
            <p className="text-sm text-gray-500 mt-2">Posted on: {announcement.date}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

