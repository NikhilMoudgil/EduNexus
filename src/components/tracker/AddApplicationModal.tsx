"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Plus, X, Link as LinkIcon, Calendar, Hash } from "lucide-react";
import { addApplication } from "@/app/actions/placement";

const TYPES = ["JOB", "INTERNSHIP", "HACKATHON", "CASE_COMPETITION", "OPEN_SOURCE"];

export default function AddApplicationModal({ userId }: { userId: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [oppType, setOppType] = useState("JOB");
  const [mounted, setMounted] = useState(false);

  // The portal needs `document`, which only exists after the first client render
  useEffect(() => setMounted(true), []);

  function close() {
    setIsOpen(false);
    setOppType("JOB"); // the form unmounts, so reset the selected type with it
  }

  // While open: lock page scroll and close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const result = await addApplication(formData, userId);

    setIsSubmitting(false);

    if (result.success) {
      close();
    } else {
      alert(result.error);
    }
  }

  const inputClass =
    "w-full min-w-0 bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-cyan-500";

  const modal = (
    <div
      className="fixed inset-0 z-[1000] flex items-end sm:items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-opportunity-title"
        className="bg-[#0a0a14] border border-white/10 rounded-2xl w-full max-w-lg p-5 sm:p-6 shadow-2xl relative overflow-y-auto max-h-[90dvh] custom-scrollbar"
      >
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute top-4 right-4 p-1 text-gray-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 id="add-opportunity-title" className="text-xl sm:text-2xl font-bold text-white mb-6 pr-8">
          Track New Opportunity
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Type Selector */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Opportunity Type</label>
            <div className="flex flex-wrap gap-2 pb-2">
              {TYPES.map((type) => (
                <label
                  key={type}
                  className={`cursor-pointer px-3 sm:px-4 py-2 rounded-lg text-xs font-bold border transition focus-within:ring-2 focus-within:ring-cyan-500/60 ${
                    oppType === type
                      ? "bg-cyan-500/20 border-cyan-500 text-cyan-400"
                      : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10"
                  }`}
                >
                  <input
                    type="radio"
                    name="type"
                    value={type}
                    className="sr-only"
                    onChange={(e) => setOppType(e.target.value)}
                    defaultChecked={type === "JOB"}
                  />
                  {type.replaceAll("_", " ")}
                </label>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Company / Organizer</label>
              <input required name="company" type="text" className={inputClass} placeholder="e.g. Google, Unstop" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">{oppType === "HACKATHON" ? "Team/Project Name" : "Role"}</label>
              <input required name="role" type="text" className={inputClass} placeholder={oppType === "HACKATHON" ? "e.g. Solo / Team Nexus" : "e.g. Frontend Intern"} />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Status</label>
              <select name="status" className="w-full min-w-0 bg-[#0a0a14] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-cyan-500">
                <option value="BOOKMARKED">Bookmarked</option>
                <option value="SENT">Applied / Registered</option>
                <option value="ASSESSMENT_PENDING">Assessment Pending</option>
                <option value="INTERVIEWING">Interviewing</option>
                <option value="OFFERED">Offered / Won</option>
                <option value="REJECTED">Rejected</option>
                <option value="GHOSTED">Ghosted</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Deadline / Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-500 pointer-events-none" />
                <input name="deadline" type="date" className={`${inputClass} pl-10 [color-scheme:dark]`} />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Link</label>
            <div className="relative">
              <LinkIcon className="absolute left-3 top-3 w-5 h-5 text-gray-500 pointer-events-none" />
              <input name="link" type="url" className={`${inputClass} pl-10`} placeholder="https://..." />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Skills / Tags (Comma separated)</label>
            <div className="relative">
              <Hash className="absolute left-3 top-3 w-5 h-5 text-gray-500 pointer-events-none" />
              <input name="tags" type="text" className={`${inputClass} pl-10`} placeholder="React, Next.js, Data Analysis" />
            </div>
          </div>

          {oppType === "JOB" || oppType === "INTERNSHIP" ? (
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Expected Salary / Stipend</label>
              <input name="salary" type="number" className={inputClass} placeholder="e.g. 85000" />
            </div>
          ) : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 rounded-lg transition mt-4 disabled:opacity-50"
          >
            {isSubmitting ? "Saving..." : "Save Opportunity"}
          </button>
        </form>
      </div>
    </div>
  );

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 bg-cyan-500 text-white px-5 py-2.5 rounded-xl hover:bg-cyan-600 transition shadow-[0_0_15px_rgba(6,182,212,0.4)] font-bold text-sm"
      >
        <Plus className="w-4 h-4" /> Add Opportunity
      </button>

      {isOpen && mounted ? createPortal(modal, document.body) : null}
    </>
  );
}
