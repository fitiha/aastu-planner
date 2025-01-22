"use client"

import { type ReactNode, useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Notifications } from "@/components/notifications"
import { motion } from "framer-motion"
import {
  LayoutDashboard,
  FileText,
  Users,
  PillIcon as Pillar,
  Bell,
  UserPlus,
  LogOut,
  User,
  ClipboardList,
  FileBarChart,
  Building,
  Cog,
} from "lucide-react"
import { Card } from "@/components/ui/card"

interface User {
  id: string
  full_name: string
  email: string
  role: string
}

const fadeInLeft = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.5, ease: "easeOut" },
}

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" },
}

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    } else {
      router.push("/login")
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("currentUser")
    router.push("/login")
  }

  const roleBasedLinks = () => {
    if (!user) return null

    switch (user.role) {
      case "planning_office":
        return (
          <>
            <Link
              href="/dashboard/university-plans"
              className="flex items-center gap-3 py-2.5 px-4 rounded-lg hover:bg-[#888671]  text-white  transition-all duration-300 group"
            >
              <Building className="h-5 w-5 transition-transform group-hover:scale-110" />
              University Plans
            </Link>
            <Link
              href="/dashboard/vp-reports"
              className="flex items-center gap-3 py-2.5 px-4 rounded-lg hover:bg-[#888671]  text-white  transition-all duration-300 group"
            >
              <FileBarChart className="h-5 w-5 transition-transform group-hover:scale-110" />
              VP Reports
            </Link>
          </>
        )
      case "vice_president":
      case "director":
      case "team_lead":
        return (
          <>
            <Link
              href="/dashboard/my-plans"
              className="flex items-center gap-3 py-2.5 px-4 rounded-lg hover:bg-[#888671]  text-white  transition-all duration-300 group"
            >
              <ClipboardList className="h-5 w-5 transition-transform group-hover:scale-110" />
              My Plans
            </Link>
            <Link
              href="/dashboard/my-reports"
              className="flex items-center gap-3 py-2.5 px-4 rounded-lg hover:bg-[#888671]  text-white  transition-all duration-300 group"
            >
              <FileText className="h-5 w-5 transition-transform group-hover:scale-110" />
              My Reports
            </Link>
            <Link
              href="/dashboard/my-team"
              className="flex items-center gap-3 py-2.5 px-4 rounded-lg hover:bg-[#888671]  text-white transition-all duration-300 group"
            >
              <Users className="h-5 w-5 transition-transform group-hover:scale-110" />
              My Team
            </Link>
          </>
        )
      case "staff":
        return (
          <>
            <Link
              href="/dashboard/my-plans"
              className="flex items-center gap-3 py-2.5 px-4 rounded-lg hover:bg-[#888671]  text-white  transition-all duration-300 group"
            >
              <ClipboardList className="h-5 w-5 transition-transform group-hover:scale-110" />
              My Plans
            </Link>
            <Link
              href="/dashboard/my-reports"
              className="flex items-center gap-3 py-2.5 px-4 rounded-lg hover:bg-[#888671]  text-white transition-all duration-300 group"
            >
              <FileText className="h-5 w-5 transition-transform group-hover:scale-110" />

              My Reports
            </Link>
          </>
        )
      default:
        return null
    }
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-[#00205B]/5  to-[#FFD700]/5">
      {/* Decorative background elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#00205B]/5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#FFD700]/5 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
      </div>

      {/* Sidebar */}
      <motion.aside
        className="w-64 bg-[#00205B] backdrop-blur-xl border-r border-[#00205B]/10 shadow-lg fixed h-full overflow-y-auto"
        initial="initial"
        animate="animate"
        variants={fadeInLeft}
      >
        <div className="p-6 border-b border-[#00205B]/10">
          <motion.div
            className="flex flex-col items-center space-y-4"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative flex">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/aastu.jpg-d43UUeNRQmSnXhzJocQ2d7NvHHjutz.jpeg"
                alt="AASTU Logo"
                className="h-20 w-auto rounded-full drop-shadow-md"
              />
              <motion.div
                className="absolute -z-10 inset-0 bg-[#FFD700]/20 rounded-full blur-xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
              <h1 className="text-2xl p-4 font-bold text-white tracking-tight">AASTU Planner</h1>

            </div>
          </motion.div>
        </div>

        <nav className="p-4 space-y-2">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 py-2.5 px-4 rounded-lg hover:bg-[#888671]  text-white transition-all duration-300 group"
          >
            <LayoutDashboard className="h-5 w-5 transition-transform group-hover:scale-110" />
            Dashboard
          </Link>
          {roleBasedLinks()}
          <Link
            href="/dashboard/pillars"
            className="flex items-center gap-3 py-2.5 px-4 rounded-lg hover:bg-[#888671]  text-white  transition-all duration-300 group"
          >
            <Pillar className="h-5 w-5 transition-transform group-hover:scale-110" />
            University Pillars
          </Link>
          <Link
            href="/dashboard/announcements"
            className="flex items-center gap-3 py-2.5 px-4 rounded-lg hover:bg-[#888671]  text-white  transition-all duration-300 group"
          >
            <Bell className="h-5 w-5 transition-transform group-hover:scale-110" />
            Announcements
          </Link>
          {user && user.role !== "staff" && (
            <Link
              href="/dashboard/signup-requests"
              className="flex items-center gap-3 py-2.5 px-4 rounded-lg hover:bg-[#888671]  text-white transition-all duration-300 group"
            >
              <UserPlus className="h-5 w-5 transition-transform group-hover:scale-110" />
              Signup Requests
            </Link>
          )}
        </nav>


        <motion.div className="absolute bottom-0 left-0 w-full" variants={fadeIn}>
          <Card className="m-4 bg-gradient-to-br from-[#00205B] to-[#001845] text-white border-none shadow-xl">
            <Link
              href="/dashboard/profile"
              className="flex items-center gap-3 p-3 hover:bg-white/10 rounded-lg transition-all duration-300"
            >
              <div className="bg-white/10 p-2 rounded-lg">
                <User className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium">{user.full_name}</p>
                <p className="text-sm opacity-75 capitalize">{user.role.replace("_", " ")}</p>
              </div>
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 w-full bg-[#FFD700] hover:bg-[#FFD700]/90 text-[#00205B] font-medium px-4 py-3 rounded-lg transition-all duration-300 mt-3"
            >
              <LogOut className="h-5 w-5" />
              Logout
            </button>
          </Card>
        </motion.div>
      </motion.aside>

      {/* Main content */}
      <motion.main className="flex-1 p-8 ml-64" initial="initial" animate="animate" variants={fadeIn}>
        <div className="flex justify-end mb-6">
          <Notifications />
        </div>
        <div className="relative">
          {children}
          <motion.div
            className="absolute top-0 right-0 -z-10"
            initial={{ opacity: 0, rotate: -45 }}
            animate={{ opacity: 0.03, rotate: 0 }}
            transition={{ duration: 1 }}
          >
            <Cog className="w-64 h-64 text-[#00205B]" />
          </motion.div>
        </div>
      </motion.main>
    </div>
  )
}