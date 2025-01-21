"use client";

import { useState, useEffect } from "react";
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

interface SignupRequest {
  id: string;
  userId: string;
  superiorId: string;
  requestDate: string;
}

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
  const router = useRouter();

  useEffect(() => {
    const fetchRequests = async () => {
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
          const data = await response.json();
          setRequests(data.length ? data : []);
        } catch (error) {
          console.error("Failed to fetch requests:", error);
          setRequests([]);
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
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/aastu.jpg-oDwUB2nTEh9lUbV13ex90FkBNCbmJx.jpeg"
          alt="AASTU Logo"
          className="h-32 w-auto rounded-full"
        />
        <h1 className="text-3xl font-bold text-[#1A237E]">Signup Requests</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-[#1A237E]">Pending Requests</CardTitle>
        </CardHeader>
        <CardContent>
          {requests === null ? (
            <p>Loading...</p>
          ) : requests.length === 0 ? (
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
    </div>
  );
}
