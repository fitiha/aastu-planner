"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { motion } from "framer-motion"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

interface Announcement {
  id: number
  title: string
  content: string
  date: string
}

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [newAnnouncement, setNewAnnouncement] = useState("")
  const [newAnnouncementContent, setNewAnnouncementContent] = useState("")
  const [currentUser, setCurrentUser] = useState<any>(null)

  const token = localStorage.getItem("token")

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await fetch("https://planning-server-ui10.onrender.com/announcements", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (!response.ok) {
          throw new Error("Failed to fetch announcements")
        }

        const data = await response.json()

        const fetchedAnnouncements = Array.isArray(data) ? data : data.announcements || []

        const uniqueAnnouncements = fetchedAnnouncements.map((item: any) => ({
          id: item.id,
          title: item.title,
          content: item.description,
          date: new Date(item.created_time).toISOString().split("T")[0],
        }))

        setAnnouncements(uniqueAnnouncements)
      } catch (error) {
        console.error("Error fetching announcements:", error)
      }
    }
    const storedUser = localStorage.getItem("currentUser")
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser))

      fetchAnnouncements()
    }
  }, [token])

  const handleAddAnnouncement = async () => {
    if (newAnnouncement.trim() !== "" && newAnnouncementContent.trim() !== "") {
      const newEntry = {
        title: newAnnouncement,
        description: newAnnouncementContent,
        created_time: new Date().toISOString(),
      }

      try {
        const response = await fetch("https://planning-server-ui10.onrender.com/announcements", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newEntry),
        })

        if (!response.ok) {
          throw new Error("Failed to create new announcement")
        }

        const createdAnnouncement = await response.json()
        setAnnouncements((prev) => [
          ...prev,
          {
            id: createdAnnouncement.id,
            title: createdAnnouncement.title,
            content: createdAnnouncement.description,
            date: new Date(createdAnnouncement.created_time).toISOString().split("T")[0],
          },
        ])

        // Clear input fields
        setNewAnnouncement("")
        setNewAnnouncementContent("")
      } catch (error) {
        console.error("Error creating new announcement:", error)
      }
    }
  }

  const handleDeleteAnnouncement = async (id: number) => {
    console.log(id);
    try {
      
      const response = await fetch(`https://planning-server-ui10.onrender.com/announcements/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete announcement');
      }

      const updatedAnnouncements = announcements.filter((announcement) => announcement.id !== id);
      setAnnouncements(updatedAnnouncements);
      localStorage.setItem('announcements', JSON.stringify(updatedAnnouncements));
    } catch (error) {
      console.error('Error deleting announcement:', error);
    }
  };
  

  return (
    <div className="container rounded-xl mx-auto py-8 flex flex-col h-[calc(100vh-4rem)] bg-gradient-to-b from-blue-100 to-white transition-all duration-300 ease-in-out">
      <motion.div
        className="flex items-center gap-3 mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1 className="text-3xl font-bold text-[#1A237E] px-4" {...fadeInUp}>
          Announcements
        </motion.h1>
      </motion.div>

      <div className="flex-grow flex flex-col ">
        {currentUser?.role === "planning_office" && (
          <Card className="border-t-4 border-t-[#C49B1D] mb-6 ">
            <CardHeader className="bg-gradient-to-r from-[#C49B1D] to-[#D4AB2D] text-white ">
              <CardTitle>Create New Announcement</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-2">
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
        <ScrollArea className="flex-grow border rounded-lg shadow-inner bg-gradient-to-b from-blue-50 to-white">
          <motion.div
            className="space-y-6 p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {Array.isArray(announcements) &&
              announcements.map((announcement, index) => (
                <motion.div
                  key={announcement.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className="border-t-4 border-t-[#1A237E] hover:shadow-lg transition-shadow duration-300">
                    <CardHeader className="bg-gradient-to-r from-[#1A237E] to-[#2A337E] text-white rounded-t-lg">
                      <CardTitle className="flex justify-between items-center">
                        <span>{announcement.title}</span>
                        <span className="text-sm font-normal">{announcement.date}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 bg-white rounded-b-lg">
                      <p className="text-gray-700">{announcement.content}</p>
                      {currentUser?.role === "planning_office" && (
                        <Button
                          onClick={() => handleDeleteAnnouncement(announcement.id)}
                          variant="destructive"
                          size="sm"
                          className="mt-4 hover:bg-red-600 transition-colors duration-300"
                        >
                          Delete
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
          </motion.div>
        </ScrollArea>
      </div>
    </div>
  )
}