export default function PrivacyPolicyPage() {
  const sections = [
    {
      title: "1. Information We Collect",
      content: "We collect minimal personal data to run the mock test platform, including your registered name, email address (for authentication purposes), test attempt responses, duration spent on sections, and analytics results.",
      icon: "📋"
    },
    {
      title: "2. How We Use Your Information",
      content: "Your data is strictly used to store your mock test attempts history, build your dashboard performance metrics, calculate real Z-score ranks and percentiles, and display name initials on mock leaderboard arrays for competitive context.",
      icon: "⚙️"
    },
    {
      title: "3. Payment & Billing Details",
      content: "MockMaster uses secure mock transaction checkouts. We do not collect or store actual credit card info, CVV numbers, or bank account credentials. Upgrade processing is handled securely with simulated validations.",
      icon: "💳"
    },
    {
      title: "4. Data Storage & Security",
      content: "All passwords are securely hashed using modern cryptographic protocols (Bcrypt) before storage. We deploy industrial-standard safeguards to prevent unauthorized access or modification of your test progress profiles.",
      icon: "🔒"
    },
    {
      title: "5. Cookies & Tracking",
      content: "We use essential session tokens and local storage values to maintain authentication states, track your ongoing mock test attempts timers, and save preferences. No cross-site advertisement scripts are integrated.",
      icon: "🍪"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header section */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm mb-8 relative overflow-hidden text-center sm:text-left">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-48 h-48 rounded-full bg-blue-500/5 blur-2xl pointer-events-none"></div>
          
          <span className="text-xs bg-blue-50 text-blue-600 font-bold px-3 py-1 rounded-full border border-blue-100 uppercase tracking-wider">
            ⚖️ Legal Documentation
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-4 leading-tight">
            Privacy Policy
          </h1>
          <p className="text-slate-500 mt-2 text-xs sm:text-sm font-semibold">
            Last Updated: June 24, 2026 • Effective Date: June 24, 2026
          </p>
        </div>

        {/* Content list layout */}
        <div className="space-y-6">
          {sections.map((sec, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:border-slate-300 transition-colors flex gap-4 items-start"
            >
              <span className="text-2xl p-2.5 bg-slate-50 border border-slate-100 rounded-2xl shrink-0">
                {sec.icon}
              </span>
              <div>
                <h3 className="font-extrabold text-slate-800 text-base sm:text-lg mb-2">
                  {sec.title}
                </h3>
                <p className="text-slate-650 text-xs sm:text-sm font-medium leading-relaxed">
                  {sec.content}
                </p>
              </div>
            </div>
          ))}

          {/* Contact callout block */}
          <div className="bg-blue-600 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden text-center sm:text-left">
            <div className="absolute top-0 right-0 -mt-12 -mr-12 w-32 h-32 rounded-full bg-white/10 blur-xl pointer-events-none"></div>
            
            <h3 className="text-base sm:text-lg font-bold mb-2">
              Questions regarding our policies?
            </h3>
            <p className="text-blue-100 text-xs sm:text-sm font-medium mb-6 leading-relaxed max-w-xl">
              If you have any doubts, inquiries, or data-deletion requests, please write to our privacy officer directly.
            </p>
            <a
              href="mailto:support@mockmaster.com"
              className="inline-flex items-center gap-1.5 bg-white text-blue-600 hover:bg-blue-50 font-extrabold text-xs py-3.5 px-6 rounded-xl shadow-md transition-all active:scale-98"
            >
              ✉ Support Inbox (support@mockmaster.com)
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
