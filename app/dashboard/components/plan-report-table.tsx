"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const data = [
  { id: 1, plan: "Strategic Plan 2023", status: "In Progress", lastReport: "Q2 2023", progress: "65%" },
  { id: 2, plan: "Research Initiative", status: "Completed", lastReport: "Q4 2023", progress: "100%" },
  { id: 3, plan: "Curriculum Update", status: "Not Started", lastReport: "N/A", progress: "0%" },
  { id: 4, plan: "Faculty Development", status: "In Progress", lastReport: "Q3 2023", progress: "75%" },
  { id: 5, plan: "Student Engagement", status: "In Progress", lastReport: "Q1 2024", progress: "40%" },
]

export function PlanReportTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Plan Name</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Last Report</TableHead>
          <TableHead>Progress</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.plan}</TableCell>
            <TableCell>{item.status}</TableCell>
            <TableCell>{item.lastReport}</TableCell>
            <TableCell>{item.progress}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}