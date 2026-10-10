"use client";

import { useEffect, useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search, X, Loader2 } from "lucide-react";

const TYPES = [
  { value: "INTERNSHIP", label: "Internship" },
  { value: "JOB", label: "Job" },
  { value: "HACKATHON", label: "Hackathon" },
  { value: "CASE_COMPETITION", label: "Case competition" },
  { value: "OPEN_SOURCE", label: "Open source" },
];

const CLOSING = [
  { value: "", label: "Any deadline" },
  { value: "3", label: "Closing in 3 days" },
  { value: "7", label: "Closing in 7 days" },
  { value: "30", label: "Closing in 30 days" },
];

const STIPEND = [
  { value: "", label: "Any stipend" },
  { value: "5000", label: "5,000 or more" },
  { value: "10000", label: "10,000 or more" },
  { value: "25000", label: "25,000 or more" },
  { value: "50000", label: "50,000 or more" },
];

const SORTS = [
  { value: "new", label: "Newest first" },
  { value: "deadline", label: "Deadline soonest" },
  { value: "stipend", label: "Highest stipend" },
];

const selectClass =
  "w-full lg:w-auto min-w-0 bg-[#0a0a14] border border-white/10 rounded-xl px-3 py-2.5 text-sm text-gray-200 focus:outline-none focus:border-cyan-500 transition";

export default function ExploreFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const urlQ = params.get("q") ?? "";
  const [q, setQ] = useState(urlQ);

  const activeTypes = (params.get("type") ?? "").split(",").filter(Boolean);
  const remote = params.get("remote") === "1";
  const hasFilters = ["q", "type", "remote", "closing", "minStipend", "sort"].some((k) =>
    params.get(k)
  );

  function update(changes: Record<string, string | null>) {
    const next = new URLSearchParams(params.toString());
    for (const [key, value] of Object.entries(changes)) {
      if (value) next.set(key, value);
      else next.delete(key);
    }
    next.delete("page"); // any filter change goes back to page 1
    const qs = next.toString();
    startTransition(() => {
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    });
  }

  // Keep the input in sync when the URL changes (e.g. "Clear all")
  useEffect(() => {
    setQ(urlQ);
  }, [urlQ]);

  // Debounce the search box
  useEffect(() => {
    if (q === urlQ) return;
    const t = setTimeout(() => update({ q: q.trim() || null }), 400);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q]);

  function toggleType(value: string) {
    const next = activeTypes.includes(value)
      ? activeTypes.filter((t) => t !== value)
      : [...activeTypes, value];
    update({ type: next.length ? next.join(",") : null });
  }

  const chip = (on: boolean) =>
    `px-3 sm:px-4 py-2 rounded-lg text-xs font-bold border transition ${
      on
        ? "bg-cyan-500/20 border-cyan-500 text-cyan-400"
        : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10"
    }`;

  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-4 sm:p-5 backdrop-blur-xl space-y-4">
      <div className="flex flex-col lg:flex-row gap-3">
        <div className="relative flex-1 min-w-0">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-gray-500" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            type="search"
            placeholder="Search by role, company, location or skill"
            aria-label="Search opportunities"
            className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-500 transition"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 lg:flex gap-3">
          <select
            aria-label="Deadline"
            value={params.get("closing") ?? ""}
            onChange={(e) => update({ closing: e.target.value || null })}
            className={selectClass}
          >
            {CLOSING.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          <select
            aria-label="Minimum stipend"
            value={params.get("minStipend") ?? ""}
            onChange={(e) => update({ minStipend: e.target.value || null })}
            className={selectClass}
          >
            {STIPEND.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          <select
            aria-label="Sort by"
            value={params.get("sort") ?? "new"}
            onChange={(e) => update({ sort: e.target.value === "new" ? null : e.target.value })}
            className={selectClass}
          >
            {SORTS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {TYPES.map((t) => {
          const on = activeTypes.includes(t.value);
          return (
            <button
              key={t.value}
              type="button"
              aria-pressed={on}
              onClick={() => toggleType(t.value)}
              className={chip(on)}
            >
              {t.label}
            </button>
          );
        })}

        <button
          type="button"
          aria-pressed={remote}
          onClick={() => update({ remote: remote ? null : "1" })}
          className={chip(remote)}
        >
          Remote only
        </button>

        <div className="sm:ml-auto flex items-center gap-3">
          {isPending && <Loader2 className="w-4 h-4 text-cyan-400 animate-spin" aria-label="Updating results" />}
          {hasFilters && (
            <button
              type="button"
              onClick={() => {
                setQ("");
                startTransition(() => router.replace(pathname, { scroll: false }));
              }}
              className="flex items-center gap-1 text-xs font-semibold text-gray-400 hover:text-white transition"
            >
              <X className="w-3.5 h-3.5" /> Clear all
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
