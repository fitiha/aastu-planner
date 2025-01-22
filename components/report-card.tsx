import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface ReportCardProps {
  report: {
    id: string;
    planId: string;
    quarter: string;
    value: number;
    notes: string;
    status: string;
    comment?: string;
    submissionDate: string;
  };
  plan: {
    title: string;
    value: number;
    which_quarter: string;
    end_date: string;
  };
  onEdit?: (id: string, updatedReport: any) => void;
  onResubmit?: (id: string) => void;
}

export function ReportCard({
  report,
  plan,
  onEdit,
  onResubmit,
}: ReportCardProps) {
  console.log("report card is", report, plan);
  const [isEditing, setIsEditing] = useState(false);
  const [editedReport, setEditedReport] = useState(report);
  const progress = Math.round(
    (report.value / plan.value) * 100
  );

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onEdit?.(report.id, editedReport);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedReport(report);
    setIsEditing(false);
  };

  const handleResubmit = async () => {
    try {
      const token = localStorage.getItem("token"); // Retrieve the token from localStorage
      if (!token) {
        throw new Error("Authentication token not found");
      }

      const response = await fetch(
        `https://planning-server-ui10.onrender.com/update/report/${report.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...report,
            status: "Pending",
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to resubmit the report");
      }

      const updatedReport = await response.json();
      console.log("Report resubmitted successfully:", updatedReport);

      // Optionally trigger the parent component's callback
      onResubmit?.(report.id);
    } catch (error) {
      console.error("Error resubmitting the report:", error);
      alert("Failed to resubmit the report. Please try again.");
    }
  };

  const formattedDate = new Date(plan.end_date).toLocaleDateString(
    "en-GB",
    {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }
  );

  return (
    <Card className="mb-4 border-[#A38901]">
      <CardHeader className="bg-[#2E2E31] text-white">
        <CardTitle className="text-lg">
          Report for {plan.title} - {plan.which_quarter}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <p className="text-sm mb-2">Submission Date: {formattedDate}</p>
        <div className="mb-2">
          <Progress value={progress} className="w-full" />
          <p className="text-sm text-right">{progress}% Complete</p>
        </div>
        <p className="text-sm mb-2">
          Accomplished:{" "}
          {isEditing ? (
            <Input
              type="number"
              value={editedReport.value}
              onChange={(e) =>
                setEditedReport({
                  ...editedReport,
                  value: Number(e.target.value),
                })
              }
            />
          ) : (
            report.value
          )}{" "}
          out of {plan.value}
        </p>
        {isEditing ? (
          <Textarea
            value={editedReport.notes}
            onChange={(e) =>
              setEditedReport({ ...editedReport, notes: e.target.value })
            }
            className="mb-2"
          />
        ) : (
          <p className="text-sm mb-2">{report.notes}</p>
        )}
        {report.comment && (
          <div className="bg-red-50 p-2 rounded-md mb-2">
            <p className="text-sm text-red-600">{report.comment}</p>
          </div>
        )}
        {report.status === "Rejected" && (
          <div className="flex gap-2">
            {isEditing ? (
              <>
                <Button onClick={handleSave} size="sm">
                  Save
                </Button>
                <Button onClick={handleCancel} size="sm" variant="outline">
                  Cancel
                </Button>
              </>
            ) : (
              <Button onClick={handleEdit} size="sm">
                Edit
              </Button>
            )}
            {!isEditing && (
              <Button onClick={handleResubmit} size="sm" variant="outline">
                Resubmit
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
