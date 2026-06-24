'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setLoading(true);
    // Simulate API submission
    setTimeout(() => {
      setLoading(false);
      setIsSubmitted(true);
    }, 1000);
  };

  const faqs = [
    {
      q: "How do I upgrade to the PRO pass?",
      a: "Go to your Dashboard, click on 'Buy Pass' (or the orange pass button in the header), and complete the mock transaction. All premium tests will be unlocked instantly."
    },
    {
      q: "Are the mock tests based on the latest syllabus patterns?",
      a: "Yes! All mock tests on MockMaster are simulated according to the exact official notification guidelines, marks distribution, and negative marking rules."
    },
    {
      q: "How can I check my test performance analysis?",
      a: "After submitting any mock test, you are redirected to the Advanced Analytics Dashboard where you can see your percentile, rank, sectional speed, and correct/incorrect breakdown."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-600 border border-blue-100 uppercase tracking-wider">
            📬 Support Desk
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight">
            How can we help you today?
          </h1>
          <p className="text-slate-500 mt-2 text-sm sm:text-base max-w-xl mx-auto font-medium">
            Have queries about your PRO pass, syllabus details, or test scores? Write to us and our support team will assist you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Contact Form Card (Left/Center) */}
          <div className="lg:col-span-2 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-12 -mr-12 w-36 h-36 rounded-full bg-blue-500/5 blur-xl pointer-events-none"></div>
            
            {isSubmitted ? (
              <div className="py-12 text-center">
                <div className="w-16 h-16 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-full flex items-center justify-center text-3xl mx-auto mb-4 animate-bounce">
                  ✓
                </div>
                <h3 className="text-xl font-bold text-slate-800">Message Sent Successfully!</h3>
                <p className="text-slate-500 text-sm mt-2 max-w-sm mx-auto font-medium">
                  Thank you for reaching out. Our support agent will contact you at <strong>{formData.email}</strong> within 24 hours.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-6 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs py-2.5 px-5 rounded-xl transition-all"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter name"
                      className="w-full px-4 py-3 rounded-xl border border-slate-250 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 focus:outline-none transition-all text-sm font-medium text-slate-800"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="Enter email"
                      className="w-full px-4 py-3 rounded-xl border border-slate-250 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 focus:outline-none transition-all text-sm font-medium text-slate-800"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                    Query Category
                  </label>
                  <select
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-250 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 focus:outline-none transition-all text-sm font-medium text-slate-800 bg-white"
                  >
                    <option>General Inquiry</option>
                    <option>Premium Pass & Billing</option>
                    <option>Mock Test Content / Errors</option>
                    <option>Technical / Login Support</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your issue or query here..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-250 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 focus:outline-none transition-all text-sm font-medium text-slate-800"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-750 text-white font-bold text-xs py-3 px-8 rounded-xl shadow-md hover:shadow-blue-500/15 transition-all disabled:opacity-50 text-center flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <span className="w-4 h-4 rounded-full border-2 border-white/20 border-t-white animate-spin"></span>
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <span>🚀 Submit Ticket</span>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Support Side Details (Right) */}
          <div className="space-y-6">
            {/* Quick Details Card */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl p-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 -mt-10 -mr-10 w-24 h-24 rounded-full bg-blue-500/10 blur-xl pointer-events-none"></div>
              
              <h3 className="text-base font-bold mb-4 flex items-center gap-2 border-b border-white/10 pb-3">
                📞 Contact channels
              </h3>

              <div className="space-y-4 text-xs font-medium">
                <div>
                  <span className="text-slate-400 block mb-1">Email Support</span>
                  <span className="text-sm font-extrabold text-blue-300">support@mockmaster.com</span>
                </div>
                <div>
                  <span className="text-slate-400 block mb-1">Typical Response Time</span>
                  <span className="text-sm font-extrabold text-blue-300">Within 12-24 Hours</span>
                </div>
                <div>
                  <span className="text-slate-400 block mb-1">Support Hours</span>
                  <span className="text-sm font-extrabold text-blue-300">Monday - Saturday (9 AM - 6 PM)</span>
                </div>
              </div>
            </div>

            {/* Quick FAQs */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
              <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
                💡 Quick Answers
              </h3>
              
              <div className="space-y-4 divide-y divide-slate-100 text-xs font-medium">
                {faqs.map((faq, index) => (
                  <div key={index} className={index > 0 ? "pt-3.5" : ""}>
                    <h4 className="font-extrabold text-slate-800 leading-snug">{faq.q}</h4>
                    <p className="text-slate-500 mt-1 leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
