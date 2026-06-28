'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isBannerVisible, setIsBannerVisible] = useState(true);
  const [isNotifDropdownOpen, setIsNotifDropdownOpen] = useState(false);
  const [hasUnreadNotifs, setHasUnreadNotifs] = useState(false);
  const [isMobileNotifsOpen, setIsMobileNotifsOpen] = useState(false);
  
  const { data: session, status } = useSession();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Contact Us', href: '/contact' },
    { name: 'Privacy Policy', href: '/privacy' },
  ];

  const notifications = [
    {
      id: 'notif-steno-2026',
      title: 'SSC Stenographer Guide & Tests Live!',
      desc: 'Grade C & D detailed pattern with new sectional timings & mock tests is now active.',
      link: '/blog/ssc-stenographer-syllabus-pattern',
      date: 'June 28, 2026',
      badge: 'Exam Guide',
      icon: '✍️',
    },
    {
      id: 'notif-hssc-police-2026',
      title: 'HSSC Haryana Police Constable Live!',
      desc: 'Complete syllabus weightage details, physical criteria, & premium mock tests added.',
      link: '/blog/hssc-haryana-police-constable-syllabus-pattern',
      date: 'June 28, 2026',
      badge: 'Exam Guide',
      icon: '👮',
    },
    {
      id: 'notif-filters-2026',
      title: 'Exam Category Filters Active',
      desc: 'Easily find exams by category (SSC, HSSC, State Police, etc.) on the homepage.',
      link: '/',
      date: 'June 27, 2026',
      badge: 'Feature',
      icon: '⚡',
    },
  ];

  useEffect(() => {
    // Check if top banner has been dismissed
    const bannerDismissed = localStorage.getItem('mockmaster_banner_dismissed_2026_06_28');
    if (bannerDismissed === 'true') {
      setIsBannerVisible(false);
    }

    // Check if user has read the notifications
    const lastRead = localStorage.getItem('mockmaster_notif_last_read_2026_06_28');
    if (!lastRead) {
      setHasUnreadNotifs(true);
    }
  }, []);

  const handleDismissBanner = () => {
    localStorage.setItem('mockmaster_banner_dismissed_2026_06_28', 'true');
    setIsBannerVisible(false);
  };

  const handleToggleNotif = () => {
    setIsNotifDropdownOpen(!isNotifDropdownOpen);
    if (!isNotifDropdownOpen) {
      setHasUnreadNotifs(false);
      localStorage.setItem('mockmaster_notif_last_read_2026_06_28', new Date().toISOString());
    }
  };

  const handleMobileNotifToggle = () => {
    setIsMobileNotifsOpen(!isMobileNotifsOpen);
    setHasUnreadNotifs(false);
    localStorage.setItem('mockmaster_notif_last_read_2026_06_28', new Date().toISOString());
  };

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

  const user = session?.user;
  // @ts-ignore
  const isPremium = user?.isPremium || false;

  return (
    <>
      {/* 1. TOP ANNOUNCEMENT BANNER */}
      {isBannerVisible && (
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white py-2.5 px-4 text-center relative z-50 flex items-center justify-between text-xs md:text-sm font-semibold select-none border-b border-white/10 shadow-md">
          <div className="flex-1 flex items-center justify-center gap-2 flex-wrap">
            <span className="bg-amber-500 text-slate-900 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
              New
            </span>
            <span>
              SSC Stenographer & HSSC Police Constable syllabus guides & mock tests are live!
            </span>
            <Link 
              href="/blog/ssc-stenographer-syllabus-pattern" 
              onClick={handleDismissBanner}
              className="text-amber-400 hover:text-amber-300 underline font-bold transition-colors ml-1"
            >
              Read Guide Now &rarr;
            </Link>
          </div>
          <button 
            onClick={handleDismissBanner}
            className="text-white/70 hover:text-white transition-colors p-1 rounded hover:bg-white/10 ml-2"
            aria-label="Dismiss Announcement"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      {/* 2. NAVIGATION BAR */}
      <nav className="border-b border-slate-100 bg-white/80 backdrop-blur-lg sticky top-0 z-40 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2 group">
                <span className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent group-hover:scale-[1.02] transition-transform">
                  MockMaster
                </span>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider font-sans shadow-sm border border-emerald-200">
                  PRO
                </span>
              </Link>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-6">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-xs font-bold transition-all relative py-5.5 px-1 hover:text-blue-600 ${
                      isActive 
                        ? 'text-blue-600 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-gradient-to-r after:from-blue-600 after:to-indigo-600 after:rounded-full' 
                        : 'text-slate-500'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
              
              {/* Notification Bell Dropdown */}
              <div className="relative">
                <button
                  onClick={handleToggleNotif}
                  className="p-2 text-slate-500 hover:text-blue-600 rounded-full hover:bg-slate-50 transition-all duration-200 relative cursor-pointer focus:outline-none"
                  aria-label="View notifications"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  {hasUnreadNotifs && (
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-500 ring-2 ring-white animate-pulse"></span>
                  )}
                </button>
                
                {isNotifDropdownOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsNotifDropdownOpen(false)}></div>
                    <div className="absolute right-0 mt-3 w-80 bg-white/95 backdrop-blur-md border border-slate-200/80 rounded-2xl shadow-xl shadow-slate-900/10 z-50 origin-top-right overflow-hidden transition-all duration-200">
                      <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                        <h3 className="font-extrabold text-slate-800 text-sm">Updates & News</h3>
                        <span className="text-[9px] bg-blue-50 text-blue-600 font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
                          What's New
                        </span>
                      </div>
                      
                      <div className="max-h-96 overflow-y-auto divide-y divide-slate-100">
                        {notifications.map((notif) => (
                          <Link
                            key={notif.id}
                            href={notif.link}
                            onClick={() => setIsNotifDropdownOpen(false)}
                            className="p-4 flex gap-3 hover:bg-slate-50/50 transition-colors block text-left"
                          >
                            <span className="text-xl p-2 bg-slate-50 border border-slate-100 rounded-xl shrink-0 h-9 w-9 flex items-center justify-center shadow-sm">
                              {notif.icon}
                            </span>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-1.5 mb-0.5">
                                <span className="text-[9px] bg-amber-50 text-amber-700 font-bold px-1.5 py-0.5 rounded border border-amber-100/50">
                                  {notif.badge}
                                </span>
                                <span className="text-[8px] text-slate-400 font-medium">{notif.date}</span>
                              </div>
                              <h4 className="font-bold text-slate-800 text-xs leading-snug truncate">
                                {notif.title}
                              </h4>
                              <p className="text-[10px] text-slate-500 mt-0.5 leading-relaxed line-clamp-2">
                                {notif.desc}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>
                      
                      <div className="p-3 bg-slate-50/50 text-center border-t border-slate-100">
                        <Link
                          href="/"
                          onClick={() => setIsNotifDropdownOpen(false)}
                          className="text-[9px] font-extrabold text-blue-600 hover:text-blue-700 transition-colors uppercase tracking-wider"
                        >
                          View Homepage
                        </Link>
                      </div>
                    </div>
                  </>
                )}
              </div>
              
              {status === "authenticated" && user ? (
                /* Logged In State */
                <div className="flex items-center space-x-4">
                  {isPremium ? (
                    <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-lg px-3 py-1.5 font-medium flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      Pass Active (Pro)
                    </div>
                  ) : (
                    <>
                      <div className="bg-amber-50 border border-amber-200/50 text-amber-800 text-[10px] rounded-lg px-2.5 py-1.5 font-bold flex items-center gap-1.5 uppercase tracking-wide">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                        Free Pass
                      </div>
                      <Link
                        href="/dashboard"
                        className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white text-[11px] px-4 py-2 rounded-xl font-extrabold shadow-md shadow-orange-500/10 hover:shadow-orange-500/20 transition-all active:scale-98 flex items-center gap-1.5"
                      >
                        <span>✨</span> Buy Pass
                      </Link>
                    </>
                  )}
                  
                  {/* Profile Avatar and Log Out */}
                  <div className="flex items-center space-x-3 pl-4 border-l border-slate-200">
                    <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold border border-blue-700 text-xs shadow-sm">
                      {getInitials(user.name, user.email)}
                    </div>
                    <div className="hidden lg:block text-left max-w-[120px]">
                      <p className="text-xs font-semibold text-slate-800 leading-tight truncate">{user.name || 'Student'}</p>
                      <p className="text-[10px] text-slate-400 truncate">{user.email}</p>
                    </div>
                    
                    <button
                      onClick={() => signOut({ callbackUrl: "/" })}
                      className="text-slate-400 hover:text-red-600 text-xs font-bold px-2 py-1 hover:bg-red-50 rounded border border-transparent hover:border-red-100 transition-all"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                /* Logged Out State */
                <div className="flex items-center space-x-4">
                  <Link
                    href="/signin"
                    className="bg-accent-cta hover:bg-accent-cta-hover text-white text-[11px] px-5 py-2.5 rounded-xl font-extrabold shadow-md shadow-amber-500/10 hover:shadow-amber-500/20 transition-all active:scale-98"
                  >
                    Sign In
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu & Bell Trigger Wrapper */}
            <div className="flex items-center space-x-3 md:hidden">
              {/* Mobile Bell Button */}
              <button
                onClick={handleMobileNotifToggle}
                className="p-2 text-slate-500 hover:text-blue-600 rounded-full relative focus:outline-none"
                aria-label="View updates"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                {hasUnreadNotifs && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-500 ring-2 ring-white animate-pulse"></span>
                )}
              </button>

              {/* Burger Menu */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-slate-600 hover:text-blue-600 focus:outline-none p-1"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Updates Drawer / Accordion */}
        {isMobileNotifsOpen && (
          <div className="md:hidden border-t border-slate-100 bg-slate-50 px-4 py-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-extrabold text-slate-800 text-xs uppercase tracking-wider">Recent Updates</h3>
              <button 
                onClick={() => setIsMobileNotifsOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-xs font-bold"
              >
                Close
              </button>
            </div>
            <div className="space-y-3">
              {notifications.map((notif) => (
                <Link
                  key={notif.id}
                  href={notif.link}
                  onClick={() => setIsMobileNotifsOpen(false)}
                  className="bg-white p-3 rounded-xl border border-slate-200/75 flex gap-3 shadow-sm block text-left"
                >
                  <span className="text-lg shrink-0">{notif.icon}</span>
                  <div>
                    <div className="flex items-center gap-1.5 flex-wrap mb-0.5">
                      <span className="text-[8px] bg-amber-50 text-amber-700 font-bold px-1.5 py-0.2 rounded border border-amber-100">
                        {notif.badge}
                      </span>
                      <span className="text-[8px] text-slate-400">{notif.date}</span>
                    </div>
                    <h4 className="font-bold text-slate-800 text-xs leading-snug">{notif.title}</h4>
                    <p className="text-[10px] text-slate-500 mt-0.5 leading-relaxed">{notif.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-2 pb-4 space-y-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isActive ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50 hover:text-blue-600'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            
            <div className="pt-4 border-t border-slate-200 flex flex-col space-y-3">
              {status === "authenticated" && user ? (
                <>
                  <div className="flex items-center gap-3 px-3 py-2">
                    <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xs">
                      {getInitials(user.name, user.email)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-800">{user.name || 'Student'}</p>
                      <p className="text-[10px] text-slate-400">{user.email}</p>
                    </div>
                  </div>

                  {isPremium ? (
                    <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-lg px-3 py-2 font-medium flex items-center justify-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      Pass Active (Pro)
                    </div>
                  ) : (
                    <>
                      <div className="bg-amber-50 border border-amber-200 text-amber-800 text-xs rounded-lg px-3 py-2 font-medium flex items-center justify-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                        Free Pass
                      </div>
                      <Link
                        href="/dashboard"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="bg-accent-cta text-white text-center px-4 py-2 rounded-lg font-medium hover:bg-accent-cta-hover transition-colors"
                      >
                        Buy Pass
                      </Link>
                    </>
                  )}

                  <button
                    onClick={() => {
                      signOut({ callbackUrl: "/" });
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full border border-red-200 hover:bg-red-50 text-red-600 text-center px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  href="/signin"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full bg-accent-cta hover:bg-accent-cta-hover text-white text-center px-4 py-2.5 rounded-lg font-bold shadow-sm"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
