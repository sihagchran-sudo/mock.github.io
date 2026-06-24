'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

export default function GoogleSignInModal() {
  const { isAuthModalOpen, setIsAuthModalOpen, loginWithGoogle } = useAuth();
  const [isCustom, setIsCustom] = useState(false);
  const [customName, setCustomName] = useState('');
  const [customEmail, setCustomEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isAuthModalOpen) return null;

  const mockAccounts = [
    { name: 'Rahul Sharma', email: 'rahul.sharma@gmail.com', avatar: 'RS' },
    { name: 'Priya Patel', email: 'priya.patel@gmail.com', avatar: 'PP' },
    { name: 'Amit Kumar', email: 'amit.kumar@gmail.com', avatar: 'AK' },
  ];

  const handleSelectAccount = async (name: string, email: string) => {
    setIsLoading(true);
    setError('');
    try {
      await loginWithGoogle(name, email);
    } catch (err) {
      setError('Failed to sign in. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitCustom = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customName.trim() || !customEmail.trim()) {
      setError('Please fill in all fields.');
      return;
    }
    if (!customEmail.includes('@') || !customEmail.includes('.')) {
      setError('Please enter a valid email address.');
      return;
    }

    setIsLoading(true);
    setError('');
    try {
      await loginWithGoogle(customName, customEmail);
    } catch (err) {
      setError('Failed to sign in. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      {/* Modal Container */}
      <div 
        className="w-full max-w-[450px] bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden relative flex flex-col p-8 sm:p-10 transition-all duration-300 transform scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Loading Overlay */}
        {isLoading && (
          <div className="absolute inset-0 bg-white/85 z-10 flex flex-col items-center justify-center">
            {/* Google-colored spinner */}
            <div className="w-12 h-12 border-4 border-slate-100 border-t-blue-600 border-r-red-500 border-b-yellow-500 border-l-green-500 rounded-full animate-spin"></div>
            <p className="text-sm font-semibold text-slate-600 mt-4 animate-pulse">Signing in with Google...</p>
          </div>
        )}

        {/* Close Button */}
        <button
          onClick={() => {
            setIsAuthModalOpen(false);
            setIsCustom(false);
            setError('');
          }}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1.5 hover:bg-slate-100 rounded-full transition-all"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Google Header */}
        <div className="flex flex-col items-center text-center mb-6">
          {/* Custom SVG Google Logo */}
          <svg className="w-8 h-8 mb-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <h2 className="text-xl font-bold text-slate-800">Sign in with Google</h2>
          <p className="text-xs text-slate-500 mt-1">to continue to MockMaster Portal</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg p-3 mb-4 flex items-center gap-2">
            <span>⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {!isCustom ? (
          /* Account Selector */
          <div className="space-y-4">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Choose an account</p>
            <div className="space-y-2.5 max-h-[220px] overflow-y-auto pr-1">
              {mockAccounts.map((account) => (
                <button
                  key={account.email}
                  onClick={() => handleSelectAccount(account.name, account.email)}
                  className="w-full flex items-center gap-3.5 p-3 rounded-lg border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all text-left group"
                >
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xs border border-blue-200 group-hover:scale-105 transition-transform">
                    {account.avatar}
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <p className="text-xs font-bold text-slate-800 truncate">{account.name}</p>
                    <p className="text-[10px] text-slate-400 truncate">{account.email}</p>
                  </div>
                  <svg className="w-4 h-4 text-slate-300 group-hover:text-slate-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              ))}
            </div>

            <button
              onClick={() => setIsCustom(true)}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-lg border border-dashed border-slate-300 hover:border-blue-500 hover:bg-blue-50/30 text-xs font-bold text-blue-600 hover:text-blue-700 transition-all mt-4"
            >
              <span>➕</span>
              <span>Use another account / Create new</span>
            </button>
          </div>
        ) : (
          /* Custom Form */
          <form onSubmit={handleSubmitCustom} className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Full Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                className="w-full border border-slate-300 rounded-lg px-3.5 py-2 text-xs focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Email Address</label>
              <input
                type="email"
                placeholder="username@gmail.com"
                value={customEmail}
                onChange={(e) => setCustomEmail(e.target.value)}
                className="w-full border border-slate-300 rounded-lg px-3.5 py-2 text-xs focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                required
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setIsCustom(false);
                  setError('');
                }}
                className="flex-1 border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold py-2.5 rounded-lg transition-colors"
              >
                Back
              </button>
              <button
                type="submit"
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2.5 rounded-lg transition-all shadow-sm hover:shadow active:scale-95"
              >
                Sign In
              </button>
            </div>
          </form>
        )}

        {/* Footer info */}
        <div className="mt-6 pt-4 border-t border-slate-100 text-center">
          <p className="text-[10px] text-slate-400">
            By signing in, you agree to our Terms of Service and Privacy Policy. Secure sandbox simulation.
          </p>
        </div>
      </div>
    </div>
  );
}
