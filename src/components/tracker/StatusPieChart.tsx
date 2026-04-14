"use client";

import { PlacementApplication } from "@prisma/client";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

const COLORS = {
  SENT: "#3b82f6", // Blue
  INTERVIEWING: "#8b5cf6", // Purple
  OFFERED: "#10b981", // Green
  REJECTED: "#ef4444", // Red
};

export default function StatusPieChart({ applications }: { applications: PlacementApplication[] }) {
  const data = [
    { name: "SENT", value: applications.filter((a) => a.status === "SENT").length },
    { name: "INTERVIEWING", value: applications.filter((a) => a.status === "INTERVIEWING").length },
    { name: "OFFERED", value: applications.filter((a) => a.status === "OFFERED").length },
    { name: "REJECTED", value: applications.filter((a) => a.status === "REJECTED").length },
  ].filter((d) => d.value > 0); // Only show statuses that have data

  return (
    <div className="bg-white/5 border border-white/10 rounded-4xl p-8 backdrop-blur-xl shadow-2xl h-100 flex flex-col">
      <h3 className="text-lg font-bold mb-4">Application Status</h3>
      <div className="grow">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} innerRadius={80} outerRadius={110} paddingAngle={5} dataKey="value" stroke="none">
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[entry.name as keyof typeof COLORS]} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ backgroundColor: "#0f172a", borderColor: "#1e293b", borderRadius: "12px", color: "#fff" }} />
            <Legend verticalAlign="bottom" height={36} iconType="circle" />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}