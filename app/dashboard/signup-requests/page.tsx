"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion"
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface PendingUser {
  _id: string;
  full_name: string;
  email: string;
  role: string;
  superior: string;
  status: string;
}

export default function SignupRequestsPage() {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [requests, setRequests] = useState<PendingUser[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  }

  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      setError(null);

      const storedUser = localStorage.getItem("currentUser");
      const token = localStorage.getItem("token");

      if (storedUser && token) {
        const parsedUser = JSON.parse(storedUser);
        setCurrentUser(parsedUser);

        try {
          const response = await fetch(
            "https://planning-server-ui10.onrender.com/users/unverified",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
          }

          const data = await response.json();

          setRequests(data && Array.isArray(data) ? data : []);
        } catch (error) {
          console.error("Failed to fetch requests:", error);
          setError(error instanceof Error ? error.message : "Unknown error");
          setRequests([]);
        } finally {
          setLoading(false);
        }
      } else {
        router.push("/login");
      }
    };

    fetchRequests();
  }, [router]);

  const handleApprove = async (userId: string) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await fetch(
        "https://planning-server-ui10.onrender.com/verify",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ user_id: userId }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to approve request");
      }

      setRequests(requests?.filter((req) => req._id !== userId) || null);
    } catch (error) {
      console.error("Failed to approve request:", error);
    }
  };

  const handleDecline = async (userId: string) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await fetch(
        "https://planning-server-ui10.onrender.com/reject",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ user_id: userId }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to decline request");
      }

      setRequests(requests?.filter((req) => req._id !== userId) || null);
    } catch (error) {
      console.error("Failed to decline request:", error);
    }
  };

  if (!currentUser) return null;

  return (
    <div className="container mx-auto py-8 space-y-8 bg-gradient-to-b rounded-xl from-blue-100 to-white transition-all duration-300 ease-in-out">
      <motion.div
        className="flex items-center gap-3 mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1 className="text-3xl font-bold text-[#1A237E] px-4" {...fadeInUp}>
        Signup Requests
        </motion.h1>
      </motion.div>
      <motion.div {...fadeInUp}>
      <Card>
        <CardHeader>
          <CardTitle className="text-[#1A237E]">Pending Requests</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-500">Error: {error}</p>
          ) : !requests || requests.length === 0 ? ( // Added "!requests ||" to handle null
            <p>There are no signup requests.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-[#1A237E]">Name</TableHead>
                  <TableHead className="text-[#1A237E]">Email</TableHead>
                  <TableHead className="text-[#1A237E]">Role</TableHead>
                  <TableHead className="text-[#1A237E]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {requests.map((request) => (
                  <TableRow key={request._id}>
                    <TableCell>{request.full_name}</TableCell>
                    <TableCell>{request.email}</TableCell>
                    <TableCell>{request.role}</TableCell>
                    <TableCell>
                      <Button
                        onClick={() => handleApprove(request._id)}
                        className="mr-2 bg-[#1A237E] text-white"
                      >
                        Approve
                      </Button>
                      <Button
                        onClick={() => handleDecline(request._id)}
                        variant="destructive"
                      >
                        Decline
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
      </motion.div>
    </div>
  );
}
