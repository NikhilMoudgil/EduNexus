"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { Bookmark, BookmarkCheck, Loader2 } from "lucide-react";
import { trackOpportunity } from "@/app/actions/opportunities";

export default function TrackButton({
  opportunityId,
  initiallyTracked,
}: {
  opportunityId: string;
  initiallyTracked: boolean;
}) {
  const [tracked, setTracked] = useState(initiallyTracked);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  if (tracked) {
    return (
      <Link
        href="/tracker"
        className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-bold hover:bg-green-500/20 transition"
      >
        <BookmarkCheck className="w-4 h-4" /> Tracked
      </Link>
    );
  }

  return (
    <div className="flex flex-col items-end">
      <button
        type="button"
        disabled={isPending}
        onClick={() => {
          setError(null);
          startTransition(async () => {
            const res = await trackOpportunity(opportunityId);
            if (res.success) setTracked(true);
            else if (res.error === "Already in your tracker") setTracked(true);
            else setError(res.error ?? "Could not track this listing");
          });
        }}
        className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2.5 rounded-xl text-sm font-bold transition shadow-[0_0_15px_rgba(6,182,212,0.3)] disabled:opacity-60"
      >
        {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Bookmark className="w-4 h-4" />}
        {isPending ? "Tracking" : "Track"}
      </button>
      <p role="status" aria-live="polite" className="text-[11px] text-red-400 mt-1 empty:hidden">
        {error}
      </p>
    </div>
  );
}
