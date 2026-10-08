import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function AddApplicationModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-[#0A0F1C]/80 backdrop-blur-sm" />
        
        {/* Modal Content */}
        <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative w-full max-w-lg bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
            <h2 className="text-lg font-semibold text-white">Track Opportunity</h2>
            <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors"><X className="w-5 h-5" /></button>
          </div>
          
          <form className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 sm:col-span-1">
                <label className="block text-xs font-medium text-slate-400 mb-1.5">Company / Organization</label>
                <input type="text" className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors" placeholder="e.g. Microsoft" required />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label className="block text-xs font-medium text-slate-400 mb-1.5">Role</label>
                <input type="text" className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors" placeholder="e.g. Frontend Intern" required />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 sm:col-span-1">
                <label className="block text-xs font-medium text-slate-400 mb-1.5">Type</label>
                <select className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500 appearance-none">
                  <option value="JOB">Job</option>
                  <option value="INTERNSHIP">Internship</option>
                  <option value="HACKATHON">Hackathon</option>
                  <option value="CASE_COMPETITION">Case Competition</option>
                  <option value="OPEN_SOURCE">Open Source</option>
                </select>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label className="block text-xs font-medium text-slate-400 mb-1.5">Status</label>
                <select className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500 appearance-none">
                  <option value="BOOKMARKED">Bookmarked</option>
                  <option value="SENT">Applied</option>
                  <option value="ASSESSMENT_PENDING">Assessment Pending</option>
                  <option value="INTERVIEWING">Interviewing</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Posting Link (Optional)</label>
              <input type="url" className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors" placeholder="https://" />
            </div>

            <div className="pt-4 flex justify-end gap-3">
              <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-slate-400 hover:text-white transition-colors">Cancel</button>
              <button type="submit" className="px-5 py-2 text-sm font-medium bg-cyan-500 text-slate-950 rounded-lg hover:bg-cyan-400 transition-colors">Save Opportunity</button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}