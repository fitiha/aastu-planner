'use client'

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Announcement {
  id: number;
  title: string;
  content: string;
  date: string;
}

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [newAnnouncement, setNewAnnouncement] = useState("");
  const [newAnnouncementContent, setNewAnnouncementContent] = useState("");
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await fetch("https://planning-server-ui10.onrender.com/announcements");
        if (response.ok) {
          const data = await response.json();
          setAnnouncements(data);
        } else {
          console.error("Failed to fetch announcements");
        }
      } catch (error) {
        console.error("Error fetching announcements:", error);
      }
    };

    // Fetch announcements from API
    fetchAnnouncements();

    // Load the current user from localStorage
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  const handleAddAnnouncement = async () => {
    if (newAnnouncement.trim() !== "" && newAnnouncementContent.trim() !== "") {
      const newEntry = {
        title: newAnnouncement,
        description: newAnnouncementContent,
        created_time: new Date().toISOString(),
      };
  
      try {
        const response = await fetch("https://planning-server-ui10.onrender.com/announcements", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newEntry),
        });
  
        if (response.ok) {
          const createdAnnouncement = await response.json();
          setAnnouncements((prev) => [
            ...prev,
            {
              id: createdAnnouncement.id,
              title: createdAnnouncement.title,
              content: createdAnnouncement.description, // Map description to content
              date: new Date(createdAnnouncement.created_time).toISOString().split("T")[0],
            },
          ]);
  
          // Clear the input fields
          setNewAnnouncement("");
          setNewAnnouncementContent("");
        } else {
          console.error("Failed to publish new announcement");
        }
      } catch (error) {
        console.error("Error publishing announcement:", error);
      }
    }
  };
  

  const handleDeleteAnnouncement = async (id: number) => {
    const updatedAnnouncements = announcements.filter((announcement) => announcement.id !== id);
    setAnnouncements(updatedAnnouncements);
    // Add delete API call if needed in the future
  };

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
  );
}
