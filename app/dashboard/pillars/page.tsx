'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// This would typically come from an API
const initialPillars = [
  { id: 1, title: "Academic Excellence" },
  { id: 2, title: "Research and Innovation" },
  { id: 3, title: "Community Engagement" },
  { id: 4, title: "Infrastructure Development" },
  { id: 5, title: "Student Success" },
  { id: 6, title: "Faculty Development" },
  { id: 7, title: "International Collaboration" },
  { id: 8, title: "Sustainable Practices" },
  { id: 9, title: "Digital Transformation" },
  { id: 10, title: "Financial Sustainability" },
]

export default function PillarsPage() {
  const [pillars, setPillars] = useState(initialPillars)
  const [newPillar, setNewPillar] = useState("")
  const [currentUser, setCurrentUser] = useState<any>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser')
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser))
    }
  }, [])

  const handleAddPillar = () => {
    if (newPillar.trim() !== "") {
      setPillars([...pillars, { id: pillars.length + 1, title: newPillar }])
      setNewPillar("")
    }
  }

  const handleDeletePillar = (id: number) => {
    setPillars(pillars.filter(pillar => pillar.id !== id))
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">University Pillars</h1>
      <Card>
        <CardHeader>
          <CardTitle>Strategic Pillars</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Title</TableHead>
                {currentUser?.role === 'planning_office' && <TableHead>Actions</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {pillars.map((pillar) => (
                <TableRow key={pillar.id}>
                  <TableCell>{pillar.id}</TableCell>
                  <TableCell>{pillar.title}</TableCell>
                  {currentUser?.role === 'planning_office' && (
                    <TableCell>
                      <Button onClick={() => handleDeletePillar(pillar.id)} variant="destructive" size="sm">Delete</Button>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {currentUser?.role === 'planning_office' && (
            <div className="mt-4 flex gap-2">
              <Input
                placeholder="New pillar title"
                value={newPillar}
                onChange={(e) => setNewPillar(e.target.value)}
              />
              <Button onClick={handleAddPillar}>Add Pillar</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

