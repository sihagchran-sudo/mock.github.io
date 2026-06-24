'use client';

import { useState, useEffect } from "react";
import Link from "next/link";

interface AdminUser {
  id: string;
  name: string | null;
  email: string;
  isPassActive: boolean;
  createdAt: string;
}

const ADMIN_SECRET = "MockMasterAdmin77#";

export default function AdminDashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessCode, setAccessCode] = useState("");
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  // Password Reset Modal states
  const [resettingUser, setResettingUser] = useState<AdminUser | null>(null);
  const [newPassword, setNewPassword] = useState("");
  const [resetLoading, setResetLoading] = useState(false);
  const [resetError, setResetError] = useState("");

  // Check auth on mount
  useEffect(() => {
    const savedAuth = sessionStorage.getItem("admin_authenticated");
    if (savedAuth === "true") {
      setIsAuthenticated(true);
      fetchUsers();
    }
  }, []);

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (accessCode === ADMIN_SECRET) {
      setIsAuthenticated(true);
      sessionStorage.setItem("admin_authenticated", "true");
      setError("");
      fetchUsers();
    } else {
      setError("Invalid admin access code. Please try again.");
    }
  };

  const handleAdminLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("admin_authenticated");
    setUsers([]);
  };

  const fetchUsers = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/admin/users?secret=${encodeURIComponent(ADMIN_SECRET)}`);
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to fetch users.");
      } else {
        setUsers(data.users || []);
      }
    } catch (err) {
      setError("An unexpected error occurred while loading users.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId: string, userName: string) => {
    if (!window.confirm(`Are you sure you want to delete user "${userName}"? All their test history will be deleted permanentally.`)) {
      return;
    }

    setError("");
    setSuccess("");
    try {
      const res = await fetch("/api/admin/users?secret=" + encodeURIComponent(ADMIN_SECRET), {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to delete user.");
      } else {
        setSuccess(`User "${userName}" deleted successfully.`);
        setUsers(prev => prev.filter(u => u.id !== userId));
      }
    } catch (err) {
      setError("Failed to delete user. Please try again.");
    }
  };

  const handlePasswordResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resettingUser) return;

    if (newPassword.length < 4) {
      setResetError("Password must be at least 4 characters long.");
      return;
    }

    setResetLoading(true);
    setResetError("");
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: resettingUser.email,
          newPassword,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setResetError(data.error || "Failed to reset password.");
      } else {
        setSuccess(`Password for user "${resettingUser.email}" reset successfully.`);
        setResettingUser(null);
        setNewPassword("");
      }
    } catch (err) {
      setResetError("Failed to reset password. Please try again.");
    } finally {
      setResetLoading(false);
    }
  };

  const filteredUsers = users.filter(u => {
    const q = searchQuery.toLowerCase();
    return (
      (u.name || "").toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q)
    );
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-slate-800 border border-slate-700 rounded-3xl p-8 sm:p-10 shadow-2xl relative text-white">
          <div className="text-center mb-8">
            <span className="text-3xl mb-2 inline-block">🛡️</span>
            <h2 className="text-xl font-extrabold tracking-tight">MockMaster Admin</h2>
            <p className="text-xs text-slate-400 mt-1">Please enter your secret access code to enter</p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-xl p-3.5 mb-5 flex items-start gap-2.5">
              <span>⚠️</span>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleAuthSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider">Access Code</label>
              <input
                type="password"
                required
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
                placeholder="Enter admin password"
                className="w-full px-4 py-3 rounded-xl border border-slate-750 bg-slate-900/50 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm placeholder:text-slate-600"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-3.5 px-4 rounded-xl shadow-md transition-all active:scale-98 mt-2"
            >
              Verify & Access
            </button>
          </form>

          <div className="mt-8 text-center text-xs text-slate-500">
            <Link href="/" className="hover:underline">Back to Home</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white border border-slate-200 p-6 rounded-2xl shadow-sm mb-8">
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 flex items-center gap-2">
              🛡️ Admin Control Panel
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">Manage mock portal users and reset accounts</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={fetchUsers}
              className="border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs px-4 py-2.5 rounded-lg font-bold shadow-sm transition-all"
            >
              🔄 Refresh List
            </button>
            <button
              onClick={handleAdminLogout}
              className="bg-red-50 hover:bg-red-100 text-red-700 text-xs px-4 py-2.5 rounded-lg font-bold shadow-sm transition-all"
            >
              Logout Admin
            </button>
          </div>
        </div>

        {/* Global Notifications */}
        {success && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs rounded-xl p-3.5 mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span>✅</span>
              <span>{success}</span>
            </div>
            <button onClick={() => setSuccess("")} className="text-emerald-500 hover:text-emerald-800 text-sm font-bold">×</button>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl p-3.5 mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span>⚠️</span>
              <span>{error}</span>
            </div>
            <button onClick={() => setError("")} className="text-red-500 hover:text-red-800 text-sm font-bold">×</button>
          </div>
        )}

        {/* Search and Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="md:col-span-3 bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex items-center">
            <span className="text-slate-400 mr-2.5 pl-1">🔍</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search students by Name or User ID (Username)..."
              className="w-full text-sm outline-none text-slate-800 placeholder:text-slate-400"
            />
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm text-center flex flex-col justify-center">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Registered</p>
            <p className="text-2xl font-extrabold text-blue-600 mt-1">{users.length} Users</p>
          </div>
        </div>

        {/* User Table Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            {loading ? (
              <div className="py-20 text-center flex flex-col items-center justify-center">
                <div className="w-8 h-8 border-4 border-slate-100 border-t-blue-600 rounded-full animate-spin"></div>
                <p className="text-xs text-slate-450 mt-4 font-semibold">Loading user registry...</p>
              </div>
            ) : filteredUsers.length > 0 ? (
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-55/30 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                    <th className="py-3 px-6">Name</th>
                    <th className="py-3 px-6">User ID (Username)</th>
                    <th className="py-3 px-6">Registration Date</th>
                    <th className="py-3 px-6 text-center">Plan status</th>
                    <th className="py-3 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-4 px-6 font-bold text-slate-800">{user.name || "N/A"}</td>
                      <td className="py-4 px-6 font-mono text-slate-600">{user.email}</td>
                      <td className="py-4 px-6 text-slate-500">
                        {new Date(user.createdAt).toLocaleDateString(undefined, {
                          dateStyle: "medium"
                        })}
                      </td>
                      <td className="py-4 px-6 text-center">
                        <span className={`px-2.5 py-1 rounded-full text-[9px] font-bold ${
                          user.isPassActive
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-250"
                            : "bg-slate-100 text-slate-600 border border-slate-200"
                        }`}>
                          {user.isPassActive ? "Pro Premium" : "Free Pass"}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right flex justify-end gap-2.5">
                        <button
                          onClick={() => setResettingUser(user)}
                          className="bg-blue-50 hover:bg-blue-100 text-blue-700 text-[10px] font-bold px-3 py-1.5 rounded-lg shadow-sm border border-blue-100 transition-all"
                        >
                          Reset Password
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user.id, user.name || user.email)}
                          className="bg-red-50 hover:bg-red-100 text-red-600 text-[10px] font-bold px-3 py-1.5 rounded-lg shadow-sm border border-red-100 transition-all"
                        >
                          Delete User
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="py-20 text-center text-slate-450 font-semibold text-xs">
                📭 No registered users found.
              </div>
            )}
          </div>
        </div>

        {/* Reset Password Modal Overlay */}
        {resettingUser && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 sm:p-8 relative">
              <h3 className="text-base font-bold text-slate-900 mb-2">Reset Password</h3>
              <p className="text-xs text-slate-500 mb-6">
                Type a new password for <span className="font-semibold text-slate-800">{resettingUser.email}</span>.
              </p>

              {resetError && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl p-3 mb-4">
                  ⚠️ {resetError}
                </div>
              )}

              <form onSubmit={handlePasswordResetSubmit} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">New Password</label>
                  <input
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Min 4 characters"
                    className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-xs focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    autoFocus
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setResettingUser(null);
                      setNewPassword("");
                      setResetError("");
                    }}
                    className="flex-1 border border-slate-250 hover:bg-slate-50 text-slate-700 text-xs font-bold py-2.5 rounded-xl transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={resetLoading}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-xs font-bold py-2.5 rounded-xl transition-all shadow-sm"
                  >
                    {resetLoading ? "Updating..." : "Update Password"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
