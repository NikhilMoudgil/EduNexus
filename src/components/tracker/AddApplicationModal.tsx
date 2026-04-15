"use client";

import { useState } from "react";
import { Plus, X, Link as LinkIcon, Calendar, Hash } from "lucide-react";
import { addApplication } from "@/app/actions/placement";

export default function AddApplicationModal({ userId }: { userId: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [oppType, setOppType] = useState("JOB");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const result = await addApplication(formData, userId);
    
    setIsSubmitting(false);
    
    if (result.success) {
      setIsOpen(false);
    } else {
      alert(result.error);
    }
  }

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 bg-cyan-500 text-white px-5 py-2.5 rounded-xl hover:bg-cyan-600 transition shadow-[0_0_15px_rgba(6,182,212,0.4)] font-bold text-sm"
      >
        <Plus className="w-4 h-4" /> Add Opportunity
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[#0a0a14] border border-white/10 rounded-2xl w-full max-w-lg p-6 shadow-2xl relative overflow-y-auto max-h-[90vh] custom-scrollbar">
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            
            <h2 className="text-2xl font-bold text-white mb-6">Track New Opportunity</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Type Selector */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Opportunity Type</label>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {["JOB", "INTERNSHIP", "HACKATHON", "CASE_COMPETITION"].map((type) => (
                    <label key={type} className={`cursor-pointer px-4 py-2 rounded-lg text-xs font-bold border transition ${oppType === type ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400' : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'}`}>
                      <input type="radio" name="type" value={type} className="hidden" onChange={(e) => setOppType(e.target.value)} defaultChecked={type === "JOB"} />
                      {type.replace("_", " ")}
                    </label>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Company / Organizer</label>
                  <input required name="company" type="text" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-cyan-500" placeholder="e.g. Google, Unstop" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">{oppType === 'HACKATHON' ? 'Team/Project Name' : 'Role'}</label>
                  <input required name="role" type="text" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-cyan-500" placeholder={oppType === 'HACKATHON' ? 'e.g. Solo / Team Nexus' : 'e.g. Frontend Intern'} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Status</label>
                  <select name="status" className="w-full bg-[#0a0a14] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-cyan-500">
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
                    <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
                    <input name="deadline" type="date" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 pl-10 text-white focus:outline-none focus:border-cyan-500 [color-scheme:dark]" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Link</label>
                <div className="relative">
                  <LinkIcon className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
                  <input name="link" type="url" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 pl-10 text-white focus:outline-none focus:border-cyan-500" placeholder="https://..." />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Skills / Tags (Comma separated)</label>
                <div className="relative">
                  <Hash className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
                  <input name="tags" type="text" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 pl-10 text-white focus:outline-none focus:border-cyan-500" placeholder="React, Next.js, Data Analysis" />
                </div>
              </div>

              {oppType === "JOB" || oppType === "INTERNSHIP" ? (
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Expected Salary / Stipend</label>
                  <input name="salary" type="number" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-cyan-500" placeholder="e.g. 85000" />
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
      )}
    </>
  );
}