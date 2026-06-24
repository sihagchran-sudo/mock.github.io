import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Pitch */}
          <div className="col-span-1 md:col-span-1 space-y-4">
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              MockMaster
            </span>
            <p className="text-sm text-slate-400 leading-relaxed">
              India\'s leading online test preparation platform. Prepare for Banking, SSC, UPSC, and Railways with real-time test simulators.
            </p>
            <div className="flex space-x-4 text-xs text-slate-500">
              <span>Trusted by 10M+ Aspirants</span>
            </div>
          </div>

          {/* Popular Categories */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-100 mb-4">
              Popular Exams
            </h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/exam/sbi-po" className="hover:text-white transition-colors">SBI PO Prelims</Link></li>
              <li><Link href="/exam/ibps-po" className="hover:text-white transition-colors">IBPS PO Mocks</Link></li>
              <li><Link href="/exam/ssc-cgl" className="hover:text-white transition-colors">SSC CGL Tier 1</Link></li>
              <li><Link href="/exam/rrb-ntpc" className="hover:text-white transition-colors">RRB NTPC</Link></li>
            </ul>
          </div>

          {/* Platform Info */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-100 mb-4">
              Platform Features
            </h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><span className="text-slate-400">Full-length Mock Tests</span></li>
              <li><span className="text-slate-400">Sectional & Chapter Tests</span></li>
              <li><span className="text-slate-400">Detailed Visual Analytics</span></li>
              <li><span className="text-slate-400">Leaderboards & Percentiles</span></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-100 mb-4">
              Aspirant Support
            </h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><span className="text-slate-400">Frequently Asked Questions</span></li>
              <li><span className="text-slate-400">Contact Helpdesk</span></li>
              <li><span className="text-slate-400">Affiliate Program</span></li>
              <li><span className="text-slate-400">Privacy Policy</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
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
