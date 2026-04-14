import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#05050f] border-t border-white/10 pt-16 pb-8 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-1">
            <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 tracking-tighter block mb-4">
              EduNexus
            </span>
            <p className="text-sm text-gray-500 leading-relaxed pr-4">
              Empowering learners with structured paths to success through community-driven roadmaps.
            </p>
          </div>

          {/* Resources Column */}
          <div>
            <h4 className="text-white font-bold mb-4">Resources</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link href="/roadmaps" className="hover:text-cyan-400 transition-colors">All Roadmaps</Link></li>
              <li><Link href="#" className="hover:text-cyan-400 transition-colors">Popular Topics</Link></li>
              <li><Link href="#" className="hover:text-cyan-400 transition-colors">Community Guidelines</Link></li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="text-white font-bold mb-4">Company</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link href="#" className="hover:text-cyan-400 transition-colors">About Us</Link></li>
              <li><Link href="#" className="hover:text-cyan-400 transition-colors">Careers</Link></li>
              <li><Link href="#" className="hover:text-cyan-400 transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Connect Column */}
          <div>
            <h4 className="text-white font-bold mb-4">Connect</h4>
            {/* Removed the circular backgrounds to match the minimal look of your old screenshot */}
            <div className="flex gap-6">
              <a href="#" className="text-gray-400 hover:text-cyan-400 text-xl transition-all hover:-translate-y-1">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-cyan-400 text-xl transition-all hover:-translate-y-1">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-cyan-400 text-xl transition-all hover:-translate-y-1">
                <i className="fab fa-github"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-cyan-400 text-xl transition-all hover:-translate-y-1">
                <i className="fab fa-discord"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Centered Copyright */}
        <div className="pt-8 border-t border-white/5 flex justify-center items-center">
          <p className="text-xs text-gray-600">
            © {new Date().getFullYear()} EduNexus. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}