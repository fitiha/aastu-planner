'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { User, Mail, Lock } from 'lucide-react'

interface User {
  id: string;
  full_name: string;
  email: string;
  role: string;
  photoUrl?: string; // Optional field for profile photo
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const router = useRouter()

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser')
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser)
      setUser(parsedUser)
      setName(parsedUser.full_name)
      setEmail(parsedUser.email)
    } else {
      router.push('/login')
    }
  }, [router])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (user) {
      const updatedUser = { ...user, name, email }
      localStorage.setItem('currentUser', JSON.stringify(updatedUser))
      setUser(updatedUser)
      setSuccessMessage('Profile updated successfully')
      setTimeout(() => setSuccessMessage(''), 3000)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        if (reader.result && user) {
          const updatedUser = { ...user, photoUrl: reader.result as string }
          localStorage.setItem('currentUser', JSON.stringify(updatedUser))
          setUser(updatedUser)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleChangePassword = () => {
    console.log('Change password clicked') // Placeholder for password change
  }

  if (!user) return null

  return (
    <div className="container mx-auto py-8 max-w-2xl">
      <div className="flex items-center gap-3 mb-8">
        <img 
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/aastu.jpg-oDwUB2nTEh9lUbV13ex90FkBNCbmJx.jpeg" 
          alt="AASTU Logo" 
          className="h-10 w-auto"
        />
        <h1 className="text-3xl font-bold text-[#1A237E]">Your Profile</h1>
      </div>

      <Card className="border-t-4 border-t-[#1A237E]">
        <CardHeader className="bg-gradient-to-r from-[#1A237E] to-[#2A337E] text-white">
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Profile Information
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex items-center justify-center mb-6">
            {user?.photoUrl ? (
              <img
                src={user.photoUrl}
                alt={`${name}'s profile`}
                className="h-24 w-24 rounded-full object-cover"
              />
            ) : (
              <div className="h-24 w-24 rounded-full bg-[#1A237E] flex items-center justify-center text-white text-3xl font-bold">
                {name.charAt(0)}
              </div>
            )}
          </div>
          <form onSubmit={handleSubmit} className="space-y-4 ">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Profile Photo
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-[#1A237E] file:text-white file:cursor-pointer hover:file:bg-[#2A337E]"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Role</label>
              <Input value={user.role} disabled className="bg-gray-100" />
            </div>
            <div className="flex gap-4 pt-4">
              <Button type="submit" className="flex-1 bg-[#1A237E] hover:bg-[#2A337E]">
                Update Profile
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleChangePassword}
                className="flex-1 border-[#1A237E] text-[#1A237E] hover:bg-[#1A237E] hover:text-white"
              >
                <Lock className="mr-2 h-4 w-4" /> Change Password
              </Button>
            </div>
          </form>
          {successMessage && (
            <div className="mt-4 p-4 rounded-md bg-green-100 border border-green-400 text-green-700">
              {successMessage}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
