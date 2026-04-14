"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import { addApplication } from "@/app/actions/placement";

export default function AddApplicationModal({ userId }: { userId: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const result = await addApplication(formData, userId);
    
    setIsSubmitting(false);
    
    if (result.success) {
      setIsOpen(false);
      // We don't even need router.refresh() because your Supabase Real-time listener will instantly update the UI!
    } else {
      alert(result.error);
    }
  }

  return (
    <>
      {/* The Trigger Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 bg-cyan-500 text-white px-5 py-2.5 rounded-xl hover:bg-cyan-600 transition shadow-[0_0_15px_rgba(6,182,212,0.4)] font-bold text-sm"
      >
        <Plus className="w-4 h-4" /> New Application
      </button>

      {/* The Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          {/* The Modal Box */}
          <div className="bg-[#0a0a14] border border-white/10 rounded-2xl w-full max-w-md p-6 shadow-2xl relative">
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            
            <h2 className="text-2xl font-bold text-white mb-6">Add Application</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Company Name</label>
                <input required name="company" type="text" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-cyan-500" placeholder="e.g. Google" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Role</label>
                <input required name="role" type="text" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-cyan-500" placeholder="e.g. Frontend Developer" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Status</label>
                  <select name="status" className="w-full bg-[#0a0a14] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-cyan-500">
                    <option value="SENT">Sent</option>
                    <option value="INTERVIEWING">Interviewing</option>
                    <option value="OFFERED">Offered</option>
                    <option value="REJECTED">Rejected</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Expected Salary</label>
                  <input name="salary" type="number" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-cyan-500" placeholder="e.g. 85000" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Notes (Optional)</label>
                <textarea name="notes" rows={3} className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-cyan-500" placeholder="Recruiter name, links, etc."></textarea>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 rounded-lg transition mt-4 disabled:opacity-50"
              >
                {isSubmitting ? "Saving..." : "Save Application"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}