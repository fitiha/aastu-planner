"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

export default function SignupPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("")
  const [superior, setSuperior] = useState("")
  const [availableSuperiors, setAvailableSuperiors] = useState<{ id: string; name: string }[]>([])
  const router = useRouter()

  useEffect(() => {
    const fetchSuperiors = async () => {
      if (role) {
        const response = await fetch(`https://planning-server-ui10.onrender.com/hierarchy?role=${role}`)
        const data = await response.json()
        const superiors = data.superiors.map((sup: any) => ({ id: sup._id, name: sup.full_name }))
        console.log(data)
        setAvailableSuperiors(superiors)
      }
    }
    fetchSuperiors()
  }, [role])

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await fetch("https://planning-server-ui10.onrender.com/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: name,
          email,
          password,
          role,
          to_whom: superior,
          full_name: name,
        }),
      })

      if (!response.ok) {
        throw new Error("Signup failed")
      }

      router.push("/pending-approval")
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="flex rounded-xl items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-white transition-all duration-300 ease-in-out">
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="border-t-4 border-t-[#1A237E]">
          <CardHeader className="bg-gradient-to-r from-[#1A237E] to-[#2A337E] text-white">
            <CardTitle>Sign up for AASTU Planner</CardTitle>
            <CardDescription className="text-gray-200">Create your account to get started</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-[#1A237E]">
                  Full Name
                </label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-[#1A237E]">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@aastu.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-[#1A237E]">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="role" className="text-sm font-medium text-[#1A237E]">
                  Role
                </label>
                <Select onValueChange={setRole}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vice_president">Vice President</SelectItem>
                    <SelectItem value="director">Director</SelectItem>
                    <SelectItem value="team_lead">Team Lead</SelectItem>
                    <SelectItem value="staff">Staff</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {role && (
                <div className="space-y-2">
                  <label htmlFor="superior" className="text-sm font-medium text-[#1A237E]">
                    Superior
                  </label>
                  <Select onValueChange={setSuperior}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your superior" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableSuperiors.map((sup) => (
                        <SelectItem key={sup.id} value={sup.name}>
                          {sup.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
              <Button type="submit" className="w-full bg-[#C49B1D] hover:bg-[#B38A1C] text-white">
                Sign Up
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <a href="/login" className="text-[#1A237E] hover:underline">
                Login
              </a>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}

