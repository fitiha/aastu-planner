"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Announcement {
  id: number
  title: string
  content: string
  date: string
}

// This would typically come from an API
const sampleAnnouncements: Announcement[] = [
  {
    id: 1,
    title: "New Strategic Plan",
    content:
      "The university has launched a new 5-year strategic plan. All departments are required to align their goals accordingly.",
    date: "2023-05-15",
  },
  {
    id: 2,
    title: "Upcoming Board Meeting",
    content: "The next board meeting is scheduled for June 15th. Please submit all required reports by June 1st.",
    date: "2023-05-10",
  },
  {
    id: 3,
    title: "Research Grant Opportunity",
    content: "A new research grant opportunity has been announced. Deadline for submissions is July 31st.",
    date: "2023-05-05",
  },
]

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>(sampleAnnouncements)
  const [newAnnouncement, setNewAnnouncement] = useState("")
  const [newAnnouncementContent, setNewAnnouncementContent] = useState("")
  const [currentUser, setCurrentUser] = useState<any>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser")
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser))
    }
  }, [])

  const handleAddAnnouncement = () => {
    if (newAnnouncement.trim() !== "" && newAnnouncementContent.trim() !== "") {
      setAnnouncements([
        ...announcements,
        {
          id: announcements.length + 1,
          title: newAnnouncement,
          content: newAnnouncementContent,
          date: new Date().toISOString().split("T")[0],
        },
      ])
      setNewAnnouncement("")
      setNewAnnouncementContent("")
    }
  }

  const handleDeleteAnnouncement = (id: number) => {
    setAnnouncements(announcements.filter((announcement) => announcement.id !== id))
  }

  return (
    <div className="container mx-auto py-8 flex flex-col h-[calc(100vh-4rem)]">
      <div className="flex items-center gap-3 mb-6">
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/aastu.jpg-oDwUB2nTEh9lUbV13ex90FkBNCbmJx.jpeg"
          alt="AASTU Logo"
          className="h-32 w-auto rounded-full"
        />
        <h1 className="text-3xl font-bold text-[#1A237E]">Announcements</h1>
      </div>

      <div className="flex-grow flex flex-col">
        <ScrollArea className="flex-grow">
          <div className="space-y-6 pr-4 pb-6">
            {announcements.map((announcement) => (
              <Card key={announcement.id} className="border-t-4 border-t-[#1A237E]">
                <CardHeader className="bg-gradient-to-r from-[#1A237E] to-[#2A337E] text-white">
                  <CardTitle>{announcement.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <p>{announcement.content}</p>
                  <p className="text-sm text-gray-500 mt-2">Posted on: {announcement.date}</p>
                  {currentUser?.role === "planning_office" && (
                    <Button
                      onClick={() => handleDeleteAnnouncement(announcement.id)}
                      variant="destructive"
                      size="sm"
                      className="mt-4"
                    >
                      Delete
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>

        {currentUser?.role === "planning_office" && (
          <Card className="border-t-4 border-t-[#C49B1D] mt-6">
            <CardHeader className="bg-gradient-to-r from-[#C49B1D] to-[#D4AB2D] text-white">
              <CardTitle>Create New Announcement</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <Input
                  placeholder="New announcement title"
                  value={newAnnouncement}
                  onChange={(e) => setNewAnnouncement(e.target.value)}
                />
                <Textarea
                  placeholder="New announcement content"
                  value={newAnnouncementContent}
                  onChange={(e) => setNewAnnouncementContent(e.target.value)}
                  rows={4}
                />
                <Button onClick={handleAddAnnouncement} className="w-full bg-[#1A237E] hover:bg-[#2A337E]">
                  Add New Announcement
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

