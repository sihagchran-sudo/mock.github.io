'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { TestAttempt, INITIAL_ATTEMPTS, getTestById } from '@/mockData';
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';

type DashboardTab = 'PROFILE' | 'PASSES' | 'HISTORY';

export default function DashboardPage() {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<DashboardTab>('PROFILE');
  const [attempts, setAttempts] = useState<TestAttempt[]>([]);
  const [upgrading, setUpgrading] = useState(false);

  // Load attempt history (localStorage + mock templates)
  useEffect(() => {
    const email = session?.user?.email;
    if (email) {
      const storedAttempts = JSON.parse(localStorage.getItem('mock_attempts') || '[]');
      const allAttempts = [...storedAttempts, ...INITIAL_ATTEMPTS];
      const userAttempts = allAttempts.filter(a => a.userId === email);
      setAttempts(userAttempts);
    } else {
      setAttempts([]);
    }
  }, [session]);

  // Compute aggregate prep stats
  const totalAttempted = attempts.length;
  const completedAttempts = attempts.filter(a => a.status === 'COMPLETED');
  const avgScore = completedAttempts.length > 0
    ? Math.round((completedAttempts.reduce((acc, curr) => acc + curr.score, 0) / completedAttempts.length) * 10) / 10
    : 0;
  const avgAccuracy = completedAttempts.length > 0
    ? Math.round(completedAttempts.reduce((acc, curr) => acc + curr.accuracy, 0) / completedAttempts.length)
    : 0;

  // Helper to get initials
  const getInitials = (name: string | null | undefined, email: string | null | undefined) => {
    if (name) {
      return name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase();
    }
    if (email) {
      return email.slice(0, 2).toUpperCase();
    }
    return 'U';
  };

  const handleUpgradePass = async () => {
    setUpgrading(true);
    try {
      const res = await fetch("/api/user/upgrade", {
        method: "POST",
      });
      if (res.ok) {
        // Trigger NextAuth session update
        await update({ isPremium: true });
        alert("Congratulations! Your Premium Pro Pass is now active.");
      } else {
        alert("Failed to purchase pass. Please try again.");
      }
    } catch (err) {
      alert("Error upgrading pass.");
    } finally {
      setUpgrading(false);
    }
  };

  // Loading state
  if (status === "loading") {
    return (
      <div className="min-h-[50vh] flex items-center justify-center flex-col">
        <div className="w-10 h-10 border-4 border-slate-100 border-t-blue-600 rounded-full animate-spin"></div>
        <p className="text-xs font-semibold text-slate-500 mt-4">Loading dashboard details...</p>
      </div>
    );
  }

  // Guest State (Not Logged In)
  if (status === "unauthenticated" || !session?.user) {
    return (
      <div className="max-w-md mx-auto my-16 px-4">
        <div className="bg-white border border-slate-200 rounded-3xl p-8 text-center shadow-lg">
          <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-6 border border-blue-100">
            <span className="text-3xl">🔑</span>
          </div>
          <h2 className="text-xl font-bold text-slate-800 mb-2">Access Your Dashboard</h2>
          <p className="text-slate-500 text-xs leading-relaxed mb-6">
            Log in with your account to track mock test attempts, view detailed post-test score reports, and unlock your personalized preparation statistics.
          </p>
          
          <Link
            href="/signin"
            className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm py-3 px-4 rounded-xl shadow-sm hover:shadow-md transition-all text-center"
          >
            Go to Sign In
          </Link>
        </div>
      </div>
    );
  }

  const user = session.user;
  // @ts-ignore
  const isPremium = user.isPremium || false;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        
        {/* Left Sidebar Navigation */}
        <aside className="w-full lg:w-64 shrink-0">
          <div className="bg-white border border-slate-200 rounded-2xl p-4 lg:p-5 shadow-sm space-y-4 lg:space-y-6">
            {/* Short Profile summary */}
            <div className="flex flex-row lg:flex-col items-center lg:text-center gap-4 pb-4 border-b border-slate-100">
              <div className="w-12 h-12 lg:w-16 lg:h-16 shrink-0 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white text-lg lg:text-xl font-extrabold lg:mx-auto shadow-md border-4 border-white">
                {getInitials(user.name, user.email)}
              </div>
              <div className="min-w-0">
                <h3 className="font-bold text-slate-800 text-sm truncate">{user.name || 'Student'}</h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">
                  {isPremium ? '👑 Premium Pro' : 'Free Account'}
                </p>
              </div>
            </div>

            {/* Nav list */}
            <nav className="flex flex-row overflow-x-auto gap-2 pt-1 scrollbar-none lg:flex-col lg:space-y-1 lg:pt-0">
              <button
                onClick={() => setActiveTab('PROFILE')}
                className={`px-4 py-2 lg:py-2.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap lg:w-full lg:text-left ${
                  activeTab === 'PROFILE'
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-800'
                }`}
              >
                👤 Profile Overview
              </button>
              <button
                onClick={() => setActiveTab('HISTORY')}
                className={`px-4 py-2 lg:py-2.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap lg:w-full lg:text-left ${
                  activeTab === 'HISTORY'
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-800'
                }`}
              >
                📝 Test History
              </button>
              <button
                onClick={() => setActiveTab('PASSES')}
                className={`px-4 py-2 lg:py-2.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap lg:w-full lg:text-left ${
                  activeTab === 'PASSES'
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-800'
                }`}
              >
                🎟️ Passes & Billing
              </button>
            </nav>
          </div>
        </aside>

        {/* Main Content Window */}
        <div className="flex-grow">
          {/* Tab 1: Profile Overview */}
          {activeTab === 'PROFILE' && (
            <div className="space-y-6 lg:space-y-8">
              {/* Profile Card Header */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 lg:p-6 shadow-sm">
                <h2 className="font-extrabold text-slate-800 text-base lg:text-lg mb-4">Aspirant Profile</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-slate-400 font-medium block">Full Name</span>
                    <span className="text-slate-800 font-bold">{user.name || 'Not Provided'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-medium block">Email Address</span>
                    <span className="text-slate-800 font-bold">{user.email}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-medium block">Pass Status</span>
                    <span className="text-slate-800 font-bold">
                      {isPremium ? (
                        <span className="text-emerald-600">Pro Active (Unlimited Access)</span>
                      ) : (
                        <span className="text-amber-600">Free Tier</span>
                      )}
                    </span>
                  </div>
                </div>
              </div>

              {/* Prep Statistics grid */}
              <div className="grid grid-cols-3 gap-3 sm:gap-6">
                <div className="bg-white border border-slate-200 rounded-2xl p-3 sm:p-5 shadow-sm text-center flex flex-col justify-center">
                  <span className="text-lg sm:text-2xl block mb-1">📊</span>
                  <p className="text-slate-400 text-[8px] sm:text-[10px] font-bold uppercase tracking-wider leading-tight">Mock Attempts</p>
                  <p className="text-xl sm:text-3xl font-extrabold text-slate-800 mt-1">{totalAttempted}</p>
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl p-3 sm:p-5 shadow-sm text-center flex flex-col justify-center">
                  <span className="text-lg sm:text-2xl block mb-1">🎯</span>
                  <p className="text-slate-400 text-[8px] sm:text-[10px] font-bold uppercase tracking-wider leading-tight">Average Score</p>
                  <p className="text-xl sm:text-3xl font-extrabold text-blue-600 mt-1">{avgScore}</p>
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl p-3 sm:p-5 shadow-sm text-center flex flex-col justify-center">
                  <span className="text-lg sm:text-2xl block mb-1">⚡</span>
                  <p className="text-slate-400 text-[8px] sm:text-[10px] font-bold uppercase tracking-wider leading-tight">Accuracy</p>
                  <p className="text-xl sm:text-3xl font-extrabold text-emerald-600 mt-1">{avgAccuracy}%</p>
                </div>
              </div>

              {/* Recents banner */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 lg:p-6 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-extrabold text-slate-800 text-sm">Recent Test Attempts</h3>
                  <button onClick={() => setActiveTab('HISTORY')} className="text-xs text-blue-600 font-bold hover:underline">
                    View All
                  </button>
                </div>
                {attempts.length > 0 ? (
                  <div className="divide-y divide-slate-100">
                    {attempts.slice(0, 2).map((att) => {
                      const test = getTestById(att.testId);
                      return (
                        <div key={att.id} className="py-4 first:pt-0 last:pb-0 flex items-center justify-between gap-4">
                          <div className="min-w-0">
                            <p className="text-sm font-bold text-slate-800 truncate">{test?.title || 'Mock Test'}</p>
                            <p className="text-[10px] text-slate-400 mt-0.5">Attempted on: {new Date(att.startedAt).toLocaleDateString()}</p>
                          </div>
                          <Link
                            href={`/analytics/${att.id}`}
                            className="bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs px-3.5 py-1.5 rounded-lg border border-slate-200 font-bold transition-all shrink-0"
                          >
                            View Report →
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-xs text-slate-400 italic text-center py-4">No recent test attempts registered.</p>
                )}
              </div>
            </div>
          )}

          {/* Tab 2: Attempt History */}
          {activeTab === 'HISTORY' && (
            <div className="bg-white border border-slate-200 rounded-2xl p-5 lg:p-6 shadow-sm">
              <h2 className="font-extrabold text-slate-800 text-base mb-6">Complete Test History</h2>
              
              {attempts.length > 0 ? (
                <div>
                  {/* Mobile List View */}
                  <div className="block sm:hidden space-y-4">
                    {attempts.map((att) => {
                      const test = getTestById(att.testId);
                      return (
                        <div key={att.id} className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-3">
                          <div className="flex justify-between items-start">
                            <div className="min-w-0">
                              <p className="font-bold text-slate-800 text-sm leading-snug">{test?.title || 'Mock Preparational Test'}</p>
                              <p className="text-[10px] text-slate-400 mt-0.5">Date: {new Date(att.startedAt).toLocaleDateString()}</p>
                            </div>
                            <span className="bg-indigo-50 border border-indigo-100 text-indigo-700 px-2 py-0.5 rounded text-[10px] font-bold shrink-0">
                              {att.percentile}%ile
                            </span>
                          </div>
                          
                          <div className="flex justify-between items-center pt-2.5 border-t border-slate-200/50 text-xs">
                            <div className="flex gap-4">
                              <div>
                                <span className="text-slate-400 block text-[9px] font-bold uppercase tracking-wider">Score</span>
                                <span className="font-bold text-slate-700">{att.score}/{test?.totalMarks || 100}</span>
                              </div>
                              <div>
                                <span className="text-slate-400 block text-[9px] font-bold uppercase tracking-wider">Accuracy</span>
                                <span className="font-bold text-emerald-600">{att.accuracy}%</span>
                              </div>
                            </div>
                            
                            <Link
                              href={`/analytics/${att.id}`}
                              className="bg-blue-600 hover:bg-blue-700 text-white text-[11px] px-3.5 py-1.5 rounded-lg font-bold transition-all shadow-sm"
                            >
                              Review
                            </Link>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Desktop Table View */}
                  <div className="hidden sm:block overflow-x-auto">
                    <table className="w-full text-left text-xs divide-y divide-slate-200">
                      <thead>
                        <tr className="text-slate-400 font-bold uppercase tracking-wider">
                          <th className="pb-3.5">Mock Test Details</th>
                          <th className="pb-3.5">Score</th>
                          <th className="pb-3.5">Accuracy</th>
                          <th className="pb-3.5">Percentile</th>
                          <th className="pb-3.5 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {attempts.map((att) => {
                          const test = getTestById(att.testId);
                          return (
                            <tr key={att.id} className="hover:bg-slate-50/50">
                              <td className="py-4">
                                <p className="font-bold text-slate-800 text-sm">{test?.title || 'Mock Preparational Test'}</p>
                                <p className="text-[10px] text-slate-400 mt-0.5">Date: {new Date(att.startedAt).toLocaleDateString()}</p>
                              </td>
                              <td className="py-4 font-bold text-slate-700">{att.score} / {test?.totalMarks || 100}</td>
                              <td className="py-4">
                                <span className="font-bold text-emerald-600">{att.accuracy}%</span>
                              </td>
                              <td className="py-4">
                                <span className="bg-indigo-50 border border-indigo-100 text-indigo-700 px-2 py-0.5 rounded font-bold">
                                  {att.percentile}%ile
                                </span>
                              </td>
                              <td className="py-4 text-right">
                                <Link
                                  href={`/analytics/${att.id}`}
                                  className="bg-blue-600 hover:bg-blue-700 text-white text-[11px] px-3.5 py-1.5 rounded-lg font-bold transition-all shadow-sm"
                                >
                                  Review
                                </Link>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <div className="py-16 text-center">
                  <span className="text-3xl">📝</span>
                  <h3 className="font-bold text-slate-800 mt-4 text-base">No Tests Attempted</h3>
                  <p className="text-slate-400 text-xs mt-1">Select an exam category from the home page and take your first mock test!</p>
                  <Link href="/" className="mt-5 inline-block bg-blue-600 text-white text-xs px-4 py-2 rounded-lg font-bold">
                    Start Prep Now
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* Tab 3: Passes & Subscriptions */}
          {activeTab === 'PASSES' && (
            <div className="space-y-6">
              {isPremium ? (
                /* Premium Design Card if Active */
                <div className="bg-gradient-to-br from-amber-500 via-orange-600 to-red-600 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
                  <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-white/10 blur-xl pointer-events-none"></div>
                  <div className="absolute -bottom-8 -left-8 w-36 h-36 bg-amber-400/20 rounded-full blur-lg pointer-events-none"></div>

                  <div className="relative z-10 flex flex-col justify-between h-40">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="bg-white/20 text-white border border-white/20 text-[10px] uppercase font-extrabold tracking-widest px-2.5 py-1 rounded-md">
                          Active Prep Subscription
                        </span>
                        <h3 className="text-2xl font-black tracking-wide mt-3">MockMaster Yearly Pass</h3>
                      </div>
                      <span className="text-3xl">👑</span>
                    </div>

                    <div className="flex justify-between items-end border-t border-white/20 pt-4 text-xs font-semibold text-orange-50">
                      <div>
                        <p className="text-[10px] text-orange-200">VALID UNTIL</p>
                        <p className="font-bold">31 December 2027</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-orange-200">PLAN STATUS</p>
                        <p className="bg-emerald-500/90 text-white font-bold px-2.5 py-0.5 rounded-full text-[10px]">
                          ACTIVE PRO
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* Billing upgrade CTA if not premium */
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="space-y-2">
                    <h3 className="font-extrabold text-slate-800 text-base">Unlock Pro Prep Pass</h3>
                    <p className="text-slate-500 text-xs leading-relaxed max-w-md">
                      Get unlimited attempts to all HSSC Haryana Police, SSC, and Banking exams with complete answer keys, performance percentiles, and detailed explanations.
                    </p>
                    <ul className="text-xs text-slate-600 font-medium space-y-1.5 pt-2">
                      <li className="flex items-center gap-2">
                        <span className="text-emerald-500 font-bold">✓</span> Unlimited Mock Tests & Sectionals
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-emerald-500 font-bold">✓</span> Detailed Step-by-Step solutions
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-emerald-500 font-bold">✓</span> Live analytics & percentile gauges
                      </li>
                    </ul>
                  </div>
                  
                  <div className="shrink-0 text-center md:text-right space-y-3">
                    <div>
                      <span className="text-slate-400 text-xs line-through block">₹999/yr</span>
                      <span className="text-3xl font-black text-slate-850">₹399<span className="text-xs font-medium text-slate-500">/year</span></span>
                    </div>
                    
                    <button
                      onClick={handleUpgradePass}
                      disabled={upgrading}
                      className="w-full md:w-auto bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white text-xs font-bold py-2.5 px-6 rounded-xl transition-all shadow-md hover:shadow-lg active:scale-95 disabled:opacity-50"
                    >
                      {upgrading ? "Upgrading..." : "Buy Premium Pass"}
                    </button>
                  </div>
                </div>
              )}

              {/* Invoicing / billing mock */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                <h3 className="font-extrabold text-slate-800 text-sm mb-4">Billing History</h3>
                <div className="divide-y divide-slate-100 text-xs font-medium text-slate-500">
                  {isPremium ? (
                    <div className="py-3 flex justify-between">
                      <div>
                        <p className="font-bold text-slate-800">Pass Purchase (1 Year Pro)</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">Inv: #INV-2026-981</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-slate-800">₹399.00</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">Paid via UPI</p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-xs text-slate-400 italic text-center py-4">No billing invoices found.</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
