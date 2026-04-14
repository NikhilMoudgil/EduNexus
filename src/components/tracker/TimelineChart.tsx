"use client";

import { PlacementApplication } from "@prisma/client";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function TimelineChart({ applications }: { applications: PlacementApplication[] }) {
  // Aggregate applications by Month
  const monthlyData = applications.reduce((acc: any, app) => {
    const month = new Date(app.dateApplied).toLocaleString("default", { month: "short" });
    if (!acc[month]) acc[month] = { name: month, applications: 0 };
    acc[month].applications += 1;
    return acc;
  }, {});

  const data = Object.values(monthlyData);

  return (
    <div className="bg-white/5 border border-white/10 rounded-4xl p-8 backdrop-blur-xl shadow-2xl h-100 flex flex-col">
      <h3 className="text-lg font-bold mb-4">Application Timeline</h3>
      <div className="grow">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff15" vertical={false} />
            <XAxis dataKey="name" stroke="#64748b" tick={{ fill: "#64748b", fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis stroke="#64748b" tick={{ fill: "#64748b", fontSize: 12 }} axisLine={false} tickLine={false} allowDecimals={false} />
            <Tooltip contentStyle={{ backgroundColor: "#0f172a", borderColor: "#1e293b", borderRadius: "12px", color: "#fff" }} />
            <Line type="monotone" dataKey="applications" stroke="#06b6d4" strokeWidth={3} dot={{ r: 4, fill: "#06b6d4", strokeWidth: 2, stroke: "#0f172a" }} activeDot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}