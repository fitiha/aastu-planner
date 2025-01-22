"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { motion } from "framer-motion"
import { Plus, Trash2 } from "lucide-react"

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

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

export default function PillarsPage() {
  const [pillars, setPillars] = useState(initialPillars)
  const [newPillar, setNewPillar] = useState("")
  const [currentUser, setCurrentUser] = useState<any>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser")
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
    setPillars(pillars.filter((pillar) => pillar.id !== id))
  }

  return (
    <div className="container mx-auto py-8 space-y-8 bg-gradient-to-b rounded-xl from-blue-100 to-white transition-all duration-300 ease-in-out">
      <motion.div
        className="flex items-center gap-3 mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1 className="text-3xl font-bold text-[#1A237E] px-4" {...fadeInUp}>
          University Pillars
        </motion.h1>
      </motion.div>

      <motion.div {...fadeInUp}>
        <Card className="border-t-4 border-t-[#1A237E]">
          <CardHeader className="bg-gradient-to-r from-[#1A237E] to-[#2A337E] text-white">
            <CardTitle>Strategic Pillars</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-[#1A237E]">ID</TableHead>
                  <TableHead className="text-[#1A237E]">Title</TableHead>
                  {currentUser?.role === "planning_office" && <TableHead className="text-[#1A237E]">Actions</TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {pillars.map((pillar, index) => (
                  <motion.tr
                    key={pillar.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <TableCell>{pillar.id}</TableCell>
                    <TableCell>{pillar.title}</TableCell>
                    {currentUser?.role === "planning_office" && (
                      <TableCell>
                        <Button onClick={() => handleDeletePillar(pillar.id)} variant="destructive" size="sm">
                          <Trash2 className="mr-2 h-4 w-4" /> Delete
                        </Button>
                      </TableCell>
                    )}
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
            {currentUser?.role === "planning_office" && (
              <motion.div className="mt-4 flex gap-2" {...fadeInUp}>
                <Input
                  placeholder="New pillar title"
                  value={newPillar}
                  onChange={(e) => setNewPillar(e.target.value)}
                />
                <Button onClick={handleAddPillar} className="bg-[#C49B1D] hover:bg-[#B38A1C] text-white">
                  <Plus className="mr-2 h-4 w-4" /> Add Pillar
                </Button>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

