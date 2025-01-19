'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { users } from '@/lib/sample-data'

export default function SignupPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('')
  const [superior, setSuperior] = useState('')
  const [availableSuperiors, setAvailableSuperiors] = useState<{id: string, name: string}[]>([])
  const router = useRouter()

  const [pendingUsers, setPendingUsers] = useState([]);
  const [signupRequests, setSignupRequests] = useState([]);


  useEffect(() => {
    if (role) {
      const superiors = users.filter(user => {
        if (role === 'vice_president') return user.role === 'planning_office'
        if (role === 'director') return user.role === 'vice_president'
        if (role === 'team_lead') return user.role === 'director'
        if (role === 'staff') return user.role === 'team_lead'
        return false
      }).map(user => ({ id: user.id, name: user.name }))
      setAvailableSuperiors(superiors)
    }
  }, [role])

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    // Create a new pending user
    const newUser = {
      id: `PU${pendingUsers.length + 1}`,
      name,
      email,
      role,
      password, // In a real app, this should be hashed
      superior,
      status: 'pending'
    }
    setPendingUsers([...pendingUsers, newUser]);

    // Create a signup request
    const newRequest = {
      id: `SR${signupRequests.length + 1}`,
      userId: newUser.id,
      superiorId: superior,
      requestDate: new Date().toISOString().split('T')[0]
    }
    setSignupRequests([...signupRequests, newRequest]);

    // TODO: Send email notification to superior

    router.push('/pending-approval')
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Sign up for AASTU Planner</CardTitle>
          <CardDescription>Create your account to get started</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignup} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">Full Name</label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">Email</label>
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
              <label htmlFor="password" className="text-sm font-medium">Password</label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="role" className="text-sm font-medium">Role</label>
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
                <label htmlFor="superior" className="text-sm font-medium">Superior</label>
                <Select onValueChange={setSuperior}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your superior" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableSuperiors.map((sup) => (
                      <SelectItem key={sup.id} value={sup.id}>{sup.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            <Button type="submit" className="w-full">Sign Up</Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <a href="/login" className="text-blue-600 hover:underline">Login</a>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

