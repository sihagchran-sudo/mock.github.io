'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data: session, status } = useSession();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Contact Us', href: '/contact' },
    { name: 'Privacy Policy', href: '/privacy' },
  ];

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
    <nav className="border-b border-slate-100 bg-white/80 backdrop-blur-lg sticky top-0 z-50 shadow-sm transition-all duration-300">
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

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-slate-600 hover:text-blue-600 focus:outline-none"
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
  );
}
