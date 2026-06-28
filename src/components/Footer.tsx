import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-page text-slate-600 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Pitch */}
          <div className="col-span-1 md:col-span-1 space-y-4">
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-650 bg-clip-text text-transparent">
              MockMaster
            </span>
            <p className="text-sm text-slate-500 leading-relaxed">
              India's leading online test preparation platform. Prepare for SSC, Railways, State Police, HSSC, and Defence exams with real-time test simulators.
            </p>
            <div className="flex space-x-4 text-xs text-slate-500">
              <span>Trusted by 10M+ Aspirants</span>
            </div>
          </div>

          {/* Popular Categories */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 mb-4">
              Popular Exams
            </h3>
            <ul className="space-y-2 text-sm text-slate-600 font-medium">
              <li><Link href="/exam/ssc-cgl" className="hover:text-blue-650 transition-colors">SSC CGL Tier 1</Link></li>
              <li><Link href="/exam/rrb-ntpc" className="hover:text-blue-650 transition-colors">RRB NTPC</Link></li>
              <li><Link href="/exam/ssc-gd-constable" className="hover:text-blue-650 transition-colors">SSC GD Constable</Link></li>
              <li><Link href="/exam/upsssc-pet" className="hover:text-blue-650 transition-colors">UPSSSC PET</Link></li>
            </ul>
          </div>

          {/* Platform Info */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 mb-4">
              Platform Features
            </h3>
            <ul className="space-y-2 text-sm text-slate-600 font-medium">
              <li><span className="text-slate-550">Full-length Mock Tests</span></li>
              <li><span className="text-slate-550">Sectional & Chapter Tests</span></li>
              <li><span className="text-slate-550">Detailed Visual Analytics</span></li>
              <li><span className="text-slate-550">Leaderboards & Percentiles</span></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 mb-4">
              Aspirant Support
            </h3>
            <ul className="space-y-2 text-sm text-slate-600 font-medium">
              <li><span className="text-slate-550">Frequently Asked Questions</span></li>
              <li><span className="text-slate-550">Contact Helpdesk</span></li>
              <li><span className="text-slate-550">Affiliate Program</span></li>
              <li><span className="text-slate-550">Privacy Policy</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-12 pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
          <p>© {new Date().getFullYear()} MockMaster Prep Platforms Ltd. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <span>Made for Excellence</span>
            <span>Secure 256-bit SSL Payments</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
