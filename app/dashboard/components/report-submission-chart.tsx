"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

export function ReportSubmissionChart({ data }: { data: { name: string; submitted: number; pending: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="submitted" fill="#cdcdcc" />
        <Bar dataKey="pending" fill="#FFD700" />
      </BarChart>
    </ResponsiveContainer>
  )
}
