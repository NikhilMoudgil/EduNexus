"use client";

import { PlacementApplication } from "@prisma/client";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

// Updated with the new Enum values
const COLORS = {
  BOOKMARKED: "#64748b",
  SENT: "#3b82f6", 
  ASSESSMENT_PENDING: "#eab308", 
  INTERVIEWING: "#8b5cf6", 
  OFFERED: "#10b981", 
  REJECTED: "#ef4444", 
  GHOSTED: "#71717a",
};

export default function StatusPieChart({ applications }: { applications: PlacementApplication[] }) {
  const data = [
    { name: "BOOKMARKED", value: applications.filter((a) => a.status === "BOOKMARKED").length },
    { name: "SENT", value: applications.filter((a) => a.status === "SENT").length },
    { name: "ASSESSMENT_PENDING", value: applications.filter((a) => a.status === "ASSESSMENT_PENDING").length },
    { name: "INTERVIEWING", value: applications.filter((a) => a.status === "INTERVIEWING").length },
    { name: "OFFERED", value: applications.filter((a) => a.status === "OFFERED").length },
    { name: "REJECTED", value: applications.filter((a) => a.status === "REJECTED").length },
    { name: "GHOSTED", value: applications.filter((a) => a.status === "GHOSTED").length },
  ].filter((d) => d.value > 0); 

  return (
    <div className="bg-white/5 border border-white/10 rounded-4xl p-8 backdrop-blur-xl shadow-2xl h-100 flex flex-col">
      <h3 className="text-lg font-bold mb-4">Pipeline Status</h3>
      <div className="grow">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} innerRadius={80} outerRadius={110} paddingAngle={5} dataKey="value" stroke="none">
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[entry.name as keyof typeof COLORS]} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ backgroundColor: "#0f172a", borderColor: "#1e293b", borderRadius: "12px", color: "#fff", border: "none" }} itemStyle={{ color: "#fff" }} />
            <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: "12px" }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}