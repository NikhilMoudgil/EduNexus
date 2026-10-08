"use client";

import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { PlacementApplication } from "@prisma/client";
import StatCards from "./StatCards";
import StatusPieChart from "./StatusPieChart";
import TimelineChart from "./TimelineChart";
import RecentApplications from "./RecentApplications";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface DashboardClientProps {
  userId: string;
  initialData: PlacementApplication[];
}

export default function DashboardClient({ userId, initialData }: DashboardClientProps) {
  const [applications, setApplications] = useState<PlacementApplication[]>(initialData);

  useEffect(() => {
    if (!userId) return;

    // 🚀 Real-time Supabase Subscription
    const channel = supabase
      .channel("realtime:applications")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "PlacementApplication", filter: `userId=eq.${userId}` },
        (payload) => {
          setApplications((currentApps) => {
            if (payload.eventType === "INSERT") return [payload.new as PlacementApplication, ...currentApps];
            if (payload.eventType === "UPDATE") return currentApps.map((app) => app.id === payload.new.id ? (payload.new as PlacementApplication) : app);
            if (payload.eventType === "DELETE") return currentApps.filter((app) => app.id !== payload.old.id);
            return currentApps;
          });
        }
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [userId]);

  return (
    <div className="space-y-6">
      {/* Top Row: Quick Stats */}
      <StatCards applications={applications} />

      {/* Middle Row: Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <StatusPieChart applications={applications} />
        </div>
        <div className="lg:col-span-2">
          <TimelineChart applications={applications} />
        </div>
      </div>

      {/* Bottom Row: Data Table */}
      <RecentApplications applications={applications} />
    </div>
  );
}