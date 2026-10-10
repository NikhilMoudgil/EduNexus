"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase-browser";
import { RefreshCw } from "lucide-react";

// Subscribes to the public Opportunity table only. A user's own applications
// are refreshed through the server action + revalidatePath, not the browser client.
export default function LiveFeedBanner() {
  const router = useRouter();
  const [newCount, setNewCount] = useState(0);

  useEffect(() => {
    const channel = supabase
      .channel("explore:opportunities")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "Opportunity" },
        (payload) => {
          if ((payload.new as { isActive?: boolean }).isActive !== false) {
            setNewCount((c) => c + 1);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  if (newCount === 0) {
    return (
      <div className="flex items-center gap-2 text-xs text-gray-500">
        <span className="relative flex h-2 w-2">
          <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
        </span>
        Live. New listings appear here as they are added.
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => {
        router.refresh();
        setNewCount(0);
      }}
      className="w-full flex items-center justify-center gap-2 bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 rounded-2xl py-3 text-sm font-bold hover:bg-cyan-500/20 transition"
    >
      <RefreshCw className="w-4 h-4" />
      {newCount} new {newCount === 1 ? "listing" : "listings"} added. Show them
    </button>
  );
}
