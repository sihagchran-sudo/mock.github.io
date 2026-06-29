'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { EXAMS } from "@/mockData";

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

  // Tabs state
  const [activeTab, setActiveTab] = useState<"users" | "blogs" | "resources" | "settings">("users");

  // Analytics states
  const [analytics, setAnalytics] = useState<{ totalUsers: number; activePasses: number; testsTakenToday: number; totalDownloads: number } | null>(null);
  const [analyticsLoading, setAnalyticsLoading] = useState(false);

  // Platform Settings states
  const [bannerTextSetting, setBannerTextSetting] = useState("");
  const [bannerLinkSetting, setBannerLinkSetting] = useState("");
  const [bannerVisibleSetting, setBannerVisibleSetting] = useState("true");
  const [bannerSaveLoading, setBannerSaveLoading] = useState(false);
  const [apiKeysConfigSetting, setApiKeysConfigSetting] = useState("");
  const [apiKeysSaveLoading, setApiKeysSaveLoading] = useState(false);

  // Custom Notification states
  const [notifTitle, setNotifTitle] = useState("");
  const [notifDesc, setNotifDesc] = useState("");
  const [notifLink, setNotifLink] = useState("/");
  const [notifBadge, setNotifBadge] = useState("Update");
  const [notifIcon, setNotifIcon] = useState("🔔");
  const [notifPushLoading, setNotifPushLoading] = useState(false);

  // User Pro pass states
  const [passExpiryDaysMap, setPassExpiryDaysMap] = useState<Record<string, string>>({}); // userId -> days
  const [passActionLoading, setPassActionLoading] = useState<Record<string, boolean>>({}); // userId -> loading

  // Blog Editor states
  const [selectedExamSlug, setSelectedExamSlug] = useState("");
  const [blogTitle, setBlogTitle] = useState("");
  const [blogDescription, setBlogDescription] = useState("");
  const [blogSections, setBlogSections] = useState<{ title: string; paragraphs: string[] }[]>([]);
  const [blogSaveLoading, setBlogSaveLoading] = useState(false);

  // Free Resources Management states
  interface FreeResource {
    id: string;
    title: string;
    description?: string;
    url: string;
    category: string;
    fileSize?: string;
    source?: string;
    isApproved: boolean;
    downloads?: number;
    rating?: number;
    createdAt?: string;
  }
  const [resources, setResources] = useState<FreeResource[]>([]);
  const [resourceLoading, setResourceLoading] = useState(false);
  const [newResTitle, setNewResTitle] = useState("");
  const [newResUrl, setNewResUrl] = useState("");
  const [newResCategory, setNewResCategory] = useState("Notes");
  const [newResSize, setNewResSize] = useState("");
  const [newResSource, setNewResSource] = useState("");
  const [newResDesc, setNewResDesc] = useState("");

  // Check auth on mount
  useEffect(() => {
    const savedAuth = sessionStorage.getItem("admin_authenticated");
    if (savedAuth === "true") {
      setIsAuthenticated(true);
      fetchUsers();
    }
  }, []);

  // Fetch blog data when exam changes
  useEffect(() => {
    if (!selectedExamSlug) {
      setBlogTitle("");
      setBlogDescription("");
      setBlogSections([]);
      return;
    }
    
    const fetchBlog = async () => {
      setError("");
      setSuccess("");
      try {
        const examObj = EXAMS.find(e => e.slug === selectedExamSlug);
        if (!examObj) return;

        const slug = `${selectedExamSlug}-info`;
        const secretKey = sessionStorage.getItem("admin_access_code") || accessCode;
        const res = await fetch(`/api/admin/blog?secret=${encodeURIComponent(secretKey)}&slug=${slug}`);
        const data = await res.json();
        
        if (res.ok && data.article) {
          setBlogTitle(data.article.title || "");
          setBlogDescription(data.article.description || "");
          setBlogSections(data.article.sections || []);
        } else {
          setBlogTitle(`${examObj.name} Information`);
          setBlogDescription("");
          setBlogSections([]);
        }
      } catch (err) {
        setError("Failed to load guide details from database.");
      }
    };

    fetchBlog();
  }, [selectedExamSlug]);

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (accessCode === ADMIN_SECRET) {
      setIsAuthenticated(true);
      sessionStorage.setItem("admin_authenticated", "true");
      sessionStorage.setItem("admin_access_code", accessCode);
      setError("");
      fetchUsers();
    } else {
      setError("Invalid admin access code. Please try again.");
    }
  };

  const handleAdminLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("admin_authenticated");
    sessionStorage.removeItem("admin_access_code");
    setUsers([]);
  };

  const addSection = () => {
    setBlogSections(prev => [...prev, { title: "", paragraphs: [""] }]);
  };

  const updateSectionTitle = (index: number, val: string) => {
    setBlogSections(prev => prev.map((sec, i) => i === index ? { ...sec, title: val } : sec));
  };

  const handleSaveBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedExamSlug) return;

    setBlogSaveLoading(true);
    setError("");
    setSuccess("");

    try {
      const examObj = EXAMS.find(e => e.slug === selectedExamSlug);
      if (!examObj) return;

      const slug = `${selectedExamSlug}-info`;
      const secretKey = sessionStorage.getItem("admin_access_code") || accessCode;
      
      const res = await fetch("/api/admin/blog?secret=" + encodeURIComponent(secretKey), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          slug,
          title: blogTitle,
          description: blogDescription,
          sections: blogSections.map(sec => ({
            title: sec.title,
            paragraphs: sec.paragraphs.filter(p => p.trim() !== ""),
          })),
          examSlug: examObj.slug,
          examName: examObj.name,
          category: examObj.slug.includes("sbi") || examObj.slug.includes("ibps") ? "Banking" : "State Exams",
          icon: "📝",
          type: "info",
          details: {
            authority: "Recruitment Authority",
            postName: examObj.name,
            eligibility: "Check official bulletin",
            ageLimit: "Check official bulletin",
            totalMarks: 100,
            durationMinutes: 90,
            negativeMarking: "No Negative Marking",
            subjects: [],
            fullSyllabus: [],
            prepTips: [],
          }
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to save guide.");
      } else {
        setSuccess(`Information guide for "${examObj.name}" saved successfully!`);
      }
    } catch (err) {
      setError("An unexpected error occurred while saving the guide.");
    } finally {
      setBlogSaveLoading(false);
    }
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

  const fetchResources = async () => {
    setResourceLoading(true);
    setError("");
    try {
      const secretKey = sessionStorage.getItem("admin_access_code") || ADMIN_SECRET;
      const res = await fetch(`/api/resources?secret=${encodeURIComponent(secretKey)}&includePending=true`);
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to fetch resources.");
      } else {
        setResources(data.resources || []);
      }
    } catch (err) {
      setError("An unexpected error occurred while loading resources.");
    } finally {
      setResourceLoading(false);
    }
  };

  // Fetch resources when authenticated or when activeTab becomes "resources"
  useEffect(() => {
    if (isAuthenticated && activeTab === "resources") {
      fetchResources();
    }
  }, [isAuthenticated, activeTab]);

  const handleApproveResource = async (id: string) => {
    setError("");
    setSuccess("");
    try {
      const secretKey = sessionStorage.getItem("admin_access_code") || ADMIN_SECRET;
      const res = await fetch(`/api/resources?secret=${encodeURIComponent(secretKey)}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, isApproved: true })
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to approve resource.");
      } else {
        setSuccess("Resource approved successfully!");
        setResources(prev => prev.map(r => r.id === id ? { ...r, isApproved: true } : r));
      }
    } catch (err) {
      setError("Failed to approve resource.");
    }
  };

  const handleDeleteResource = async (id: string, title: string) => {
    if (!window.confirm(`Are you sure you want to delete resource "${title}"?`)) {
      return;
    }
    setError("");
    setSuccess("");
    try {
      const secretKey = sessionStorage.getItem("admin_access_code") || ADMIN_SECRET;
      const res = await fetch(`/api/resources?secret=${encodeURIComponent(secretKey)}&id=${id}`, {
        method: "DELETE"
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to delete resource.");
      } else {
        setSuccess(`Resource "${title}" deleted successfully.`);
        setResources(prev => prev.filter(r => r.id !== id));
      }
    } catch (err) {
      setError("Failed to delete resource.");
    }
  };

  const handleAddResourceAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newResTitle || !newResUrl) return;

    setError("");
    setSuccess("");
    try {
      const secretKey = sessionStorage.getItem("admin_access_code") || ADMIN_SECRET;
      const res = await fetch(`/api/resources?secret=${encodeURIComponent(secretKey)}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newResTitle,
          url: newResUrl,
          category: newResCategory,
          description: newResDesc,
          fileSize: newResSize || "N/A",
          source: newResSource || "Admin",
          isApproved: true
        })
      });
      
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to add resource.");
      } else {
        setSuccess(`Resource "${newResTitle}" added and approved successfully!`);
        fetchResources(); // Refresh list
        // Reset form
        setNewResTitle("");
        setNewResUrl("");
        setNewResSize("");
        setNewResSource("");
        setNewResDesc("");
      }
    } catch (err) {
      setError("Failed to add resource.");
    }
  };

  const fetchAnalytics = async () => {
    setAnalyticsLoading(true);
    setError("");
    try {
      const secretKey = sessionStorage.getItem("admin_access_code") || ADMIN_SECRET;
      const res = await fetch(`/api/admin/analytics?secret=${encodeURIComponent(secretKey)}`);
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to load analytics.");
      } else {
        setAnalytics(data.stats || null);
      }
    } catch (err) {
      setError("An unexpected error occurred while loading analytics.");
    } finally {
      setAnalyticsLoading(false);
    }
  };

  const fetchBannerSettings = async () => {
    try {
      const res = await fetch("/api/admin/config");
      if (res.ok) {
        const data = await res.json();
        if (data.config) {
          setBannerTextSetting(data.config.banner_text || "");
          setBannerLinkSetting(data.config.banner_link || "");
          setBannerVisibleSetting(data.config.banner_visible || "true");
          setApiKeysConfigSetting(data.config.api_keys_config || "");
        }
      }
    } catch (err) {
      console.error("Failed to load banner settings:", err);
    }
  };

  const handleSaveBannerSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setBannerSaveLoading(true);
    setError("");
    setSuccess("");
    try {
      const secretKey = sessionStorage.getItem("admin_access_code") || ADMIN_SECRET;
      
      const saveSetting = async (key: string, value: string) => {
        const res = await fetch("/api/admin/config?secret=" + encodeURIComponent(secretKey), {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ key, value })
        });
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || "Failed to save key: " + key);
        }
      };

      await saveSetting("banner_text", bannerTextSetting);
      await saveSetting("banner_link", bannerLinkSetting);
      await saveSetting("banner_visible", bannerVisibleSetting);

      setSuccess("Announcement banner settings updated successfully!");
    } catch (err: any) {
      setError(err.message || "Failed to save banner settings.");
    } finally {
      setBannerSaveLoading(false);
    }
  };

  const handleSaveApiKeysSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiKeysSaveLoading(true);
    setError("");
    setSuccess("");
    try {
      // Validate that it is a valid JSON array
      try {
        const parsed = JSON.parse(apiKeysConfigSetting);
        if (!Array.isArray(parsed)) {
          throw new Error("Must be a JSON Array [ ... ]");
        }
      } catch (err) {
        throw new Error("Invalid JSON Array format. Please make sure the JSON structure is perfectly valid.");
      }

      const secretKey = sessionStorage.getItem("admin_access_code") || ADMIN_SECRET;
      const res = await fetch("/api/admin/config?secret=" + encodeURIComponent(secretKey), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: "api_keys_config", value: apiKeysConfigSetting })
      });
      
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to save API keys config.");
      }

      setSuccess("AI API Keys Configuration updated successfully in the database!");
    } catch (err: any) {
      setError(err.message || "Failed to save AI keys configuration.");
    } finally {
      setApiKeysSaveLoading(false);
    }
  };

  const handlePushNotification = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!notifTitle || !notifDesc) return;
    setNotifPushLoading(true);
    setError("");
    setSuccess("");
    try {
      const secretKey = sessionStorage.getItem("admin_access_code") || ADMIN_SECRET;
      const res = await fetch(`/api/admin/notifications?secret=${encodeURIComponent(secretKey)}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: notifTitle,
          desc: notifDesc,
          link: notifLink,
          badge: notifBadge,
          icon: notifIcon
        })
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to push notification.");
      } else {
        setSuccess("Global user notification pushed successfully!");
        setNotifTitle("");
        setNotifDesc("");
        setNotifLink("/");
        setNotifBadge("Update");
        setNotifIcon("🔔");
      }
    } catch (err) {
      setError("Failed to push notification.");
    } finally {
      setNotifPushLoading(false);
    }
  };

  const handleToggleProPass = async (userId: string, currentPassState: boolean) => {
    setPassActionLoading(prev => ({ ...prev, [userId]: true }));
    setError("");
    setSuccess("");
    try {
      const secretKey = sessionStorage.getItem("admin_access_code") || ADMIN_SECRET;
      const targetState = !currentPassState;
      const days = targetState ? passExpiryDaysMap[userId] || "365" : "0";

      const res = await fetch(`/api/admin/users?secret=${encodeURIComponent(secretKey)}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          isPassActive: targetState,
          passExpiryDays: days
        })
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to update user Pro pass.");
      } else {
        setSuccess(`User Pro Pass ${targetState ? "activated" : "deactivated"} successfully!`);
        // Update user state locally
        setUsers(prev => prev.map(u => u.id === userId ? { ...u, isPassActive: targetState } : u));
      }
    } catch (err) {
      setError("Failed to update user Pro pass status.");
    } finally {
      setPassActionLoading(prev => ({ ...prev, [userId]: false }));
    }
  };

  // Load initial dashboard metrics and banner settings when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchAnalytics();
      fetchBannerSettings();
    }
  }, [isAuthenticated]);

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
            <p className="text-xs text-slate-500 mt-0.5">Manage mock portal users and update exam guides</p>
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

        {/* KPI Metrics Dashboard Grid */}
        {analyticsLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[...Array(4)].map((_, idx) => (
              <div key={idx} className="bg-white border border-slate-100 p-5 rounded-2xl animate-pulse flex flex-col gap-2">
                <div className="w-1/2 h-3 bg-slate-100 rounded"></div>
                <div className="w-3/4 h-6 bg-slate-200 rounded"></div>
              </div>
            ))}
          </div>
        ) : analytics ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white border border-slate-200/80 p-5 rounded-2xl shadow-sm flex flex-col justify-between">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Users</span>
              <span className="text-xl sm:text-2xl font-extrabold text-slate-800 mt-1">{analytics.totalUsers}</span>
            </div>
            <div className="bg-white border border-slate-200/80 p-5 rounded-2xl shadow-sm flex flex-col justify-between">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Active passes</span>
              <span className="text-xl sm:text-2xl font-extrabold text-indigo-650 mt-1">{analytics.activePasses}</span>
            </div>
            <div className="bg-white border border-slate-200/80 p-5 rounded-2xl shadow-sm flex flex-col justify-between">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Tests Taken Today</span>
              <span className="text-xl sm:text-2xl font-extrabold text-emerald-600 mt-1">{analytics.testsTakenToday}</span>
            </div>
            <div className="bg-white border border-slate-200/80 p-5 rounded-2xl shadow-sm flex flex-col justify-between">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">PDF Downloads</span>
              <span className="text-xl sm:text-2xl font-extrabold text-amber-600 mt-1">{analytics.totalDownloads}</span>
            </div>
          </div>
        ) : null}

        {/* Tabs Selection Bar */}
        <div className="flex gap-4 border-b border-slate-200 mb-8 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab("users")}
            className={`pb-3 text-sm font-bold border-b-2 transition-all whitespace-nowrap ${
              activeTab === "users"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-slate-400 hover:text-slate-600"
            }`}
          >
            👥 User Directory
          </button>
          <button
            onClick={() => setActiveTab("blogs")}
            className={`pb-3 text-sm font-bold border-b-2 transition-all whitespace-nowrap ${
              activeTab === "blogs"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-slate-400 hover:text-slate-600"
            }`}
          >
            📝 Edit Exam Guides
          </button>
          <button
            onClick={() => setActiveTab("resources")}
            className={`pb-3 text-sm font-bold border-b-2 transition-all whitespace-nowrap ${
              activeTab === "resources"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-slate-400 hover:text-slate-600"
            }`}
          >
            📂 Free Resources
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={`pb-3 text-sm font-bold border-b-2 transition-all whitespace-nowrap ${
              activeTab === "settings"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-slate-400 hover:text-slate-600"
            }`}
          >
            ⚙️ Platform Settings
          </button>
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

        {activeTab === "users" ? (
          <>
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
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden animate-fade-in">
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
                          <td className="py-4 px-6 text-right flex justify-end items-center flex-wrap gap-2 pt-5">
                            {user.isPassActive ? (
                              <button
                                disabled={passActionLoading[user.id]}
                                onClick={() => handleToggleProPass(user.id, true)}
                                className="bg-amber-50 hover:bg-amber-100 disabled:opacity-50 text-amber-700 text-[10px] font-bold px-3 py-1.5 rounded-lg border border-amber-200 transition-all cursor-pointer"
                              >
                                {passActionLoading[user.id] ? "Updating..." : "Revoke Pro Pass"}
                              </button>
                            ) : (
                              <div className="flex items-center gap-1.5">
                                <select
                                  value={passExpiryDaysMap[user.id] || "365"}
                                  onChange={(e) => setPassExpiryDaysMap(prev => ({ ...prev, [user.id]: e.target.value }))}
                                  className="px-2 py-1 text-[10px] border border-slate-200 rounded bg-white text-slate-700 font-semibold focus:outline-none"
                                >
                                  <option value="30">30 Days</option>
                                  <option value="90">90 Days</option>
                                  <option value="180">180 Days</option>
                                  <option value="365">1 Year</option>
                                </select>
                                <button
                                  disabled={passActionLoading[user.id]}
                                  onClick={() => handleToggleProPass(user.id, false)}
                                  className="bg-emerald-50 hover:bg-emerald-100 disabled:opacity-50 text-emerald-700 text-[10px] font-bold px-3 py-1.5 rounded-lg border border-emerald-150 transition-all cursor-pointer"
                                >
                                  {passActionLoading[user.id] ? "Updating..." : "Grant Pro Pass"}
                                </button>
                              </div>
                            )}
                            <button
                              onClick={() => setResettingUser(user)}
                              className="bg-blue-50 hover:bg-blue-100 text-blue-700 text-[10px] font-bold px-3 py-1.5 rounded-lg border border-blue-100 transition-all cursor-pointer"
                            >
                              Reset
                            </button>
                            <button
                              onClick={() => handleDeleteUser(user.id, user.name || user.email)}
                              className="bg-red-50 hover:bg-red-100 text-red-650 text-[10px] font-bold px-3 py-1.5 rounded-lg border border-red-100 transition-all cursor-pointer"
                            >
                              Delete
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
          </>
        ) : activeTab === "blogs" ? (
          /* Guide Editor Form */
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
            <h2 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-3 mb-6">
              ✏️ Edit Exam Information Guide
            </h2>
            
            <form onSubmit={handleSaveBlog} className="space-y-6">
              {/* Select Exam */}
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">Select Exam</label>
                <select
                  required
                  value={selectedExamSlug}
                  onChange={(e) => setSelectedExamSlug(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-semibold"
                >
                  <option value="">-- Choose an Exam --</option>
                  {EXAMS.map(exam => (
                    <option key={exam.id} value={exam.slug}>
                      {exam.name}
                    </option>
                  ))}
                </select>
              </div>

              {selectedExamSlug && (
                <>
                  {/* Guide Title */}
                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">Guide Title</label>
                    <input
                      type="text"
                      required
                      value={blogTitle}
                      onChange={(e) => setBlogTitle(e.target.value)}
                      placeholder="e.g. SSC CGL Complete Information Guide"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium"
                    />
                  </div>

                  {/* Guide Description */}
                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">Guide Description (Optional)</label>
                    <textarea
                      value={blogDescription}
                      onChange={(e) => setBlogDescription(e.target.value)}
                      placeholder="Write a brief overview of the guide..."
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-850 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium resize-y"
                    />
                  </div>

                  {/* Sections List */}
                  <div className="space-y-4 border-t border-slate-100 pt-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-sm font-bold text-slate-700">Article Content Sections</h3>
                      <button
                        type="button"
                        onClick={addSection}
                        className="bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs px-3.5 py-2 rounded-lg font-bold transition-all"
                      >
                        ➕ Add New Section
                      </button>
                    </div>

                    {blogSections.map((sec, idx) => (
                      <div key={idx} className="p-5 border border-slate-200 rounded-2xl relative bg-slate-50/50">
                        {/* Remove Section button */}
                        <button
                          type="button"
                          onClick={() => setBlogSections(prev => prev.filter((_, i) => i !== idx))}
                          className="absolute top-4 right-4 text-xs font-bold text-red-500 hover:text-red-750 hover:underline"
                        >
                          Delete Section
                        </button>

                        <div className="space-y-4 max-w-2xl">
                          <div>
                            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Section Title</label>
                            <input
                              type="text"
                              required
                              value={sec.title}
                              onChange={(e) => updateSectionTitle(idx, e.target.value)}
                              placeholder="e.g. 1. Selection Process & Phases"
                              className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-800 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 font-semibold"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Section Paragraphs (Separate with an empty line)</label>
                            <textarea
                              required
                              value={sec.paragraphs.join("\n\n")}
                              onChange={(e) => {
                                const val = e.target.value;
                                setBlogSections(prev => prev.map((s, i) => i === idx ? { ...s, paragraphs: val.split("\n\n") } : s));
                              }}
                              placeholder="Type your paragraphs here. Press enter twice to separate paragraphs..."
                              rows={5}
                              className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-800 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 font-medium resize-y"
                            />
                          </div>
                        </div>
                      </div>
                    ))}

                    {blogSections.length === 0 && (
                      <div className="py-10 text-center border border-dashed border-slate-200 rounded-2xl text-slate-455 text-xs font-semibold">
                        No custom sections added yet. Click "Add New Section" to start writing your article.
                      </div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="border-t border-slate-100 pt-6 flex justify-end">
                    <button
                      type="submit"
                      disabled={blogSaveLoading}
                      className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-extrabold text-xs px-6 py-3 rounded-xl shadow-lg hover:shadow-blue-500/10 transition-all active:scale-98"
                    >
                      {blogSaveLoading ? "Saving Article..." : "Save Information Guide"}
                    </button>
                  </div>
                </>
              )}
            </form>
          </div>
        ) : activeTab === "resources" ? (
          /* Free Resources Manager Tab */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Add Resource Form (Left) */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm h-fit">
              <h2 className="text-sm font-extrabold text-slate-800 border-b border-slate-100 pb-3 mb-4">
                ➕ Add Free Resource / PDF
              </h2>
              
              <form onSubmit={handleAddResourceAdmin} className="space-y-4">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. NCERT Class 10 History"
                    value={newResTitle}
                    onChange={(e) => setNewResTitle(e.target.value)}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">PDF Link URL *</label>
                  <input
                    type="url"
                    required
                    placeholder="https://example.com/book.pdf"
                    value={newResUrl}
                    onChange={(e) => setNewResUrl(e.target.value)}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Category *</label>
                  <select
                    value={newResCategory}
                    onChange={(e) => setNewResCategory(e.target.value)}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs bg-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="NCERT Books">NCERT Books</option>
                    <option value="Notes">Study Notes & Formulas</option>
                    <option value="Official Syllabus">Syllabus Guides</option>
                    <option value="SSC Exams">SSC Materials</option>
                    <option value="HSSC Exams">HSSC Materials</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">File Size</label>
                    <input
                      type="text"
                      placeholder="e.g. 4.5 MB"
                      value={newResSize}
                      onChange={(e) => setNewResSize(e.target.value)}
                      className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Source</label>
                    <input
                      type="text"
                      placeholder="e.g. NCERT Official"
                      value={newResSource}
                      onChange={(e) => setNewResSource(e.target.value)}
                      className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Description (Optional)</label>
                  <textarea
                    placeholder="Short summary of the resource..."
                    rows={3}
                    value={newResDesc}
                    onChange={(e) => setNewResDesc(e.target.value)}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-blue-500 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-2.5 rounded-xl shadow-md transition-all active:scale-98"
                >
                  🚀 Add & Approve Resource
                </button>
              </form>
            </div>

            {/* Resources List (Right) */}
            <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm">
              <h2 className="text-sm font-extrabold text-slate-800 border-b border-slate-100 pb-3 mb-4 flex justify-between items-center">
                <span>📂 Moderation & PDF Catalog</span>
                <span className="text-[10px] bg-blue-50 text-blue-600 font-extrabold px-2 py-0.5 rounded-full">
                  {resources.length} Total
                </span>
              </h2>

              {resourceLoading ? (
                <div className="py-20 text-center flex flex-col items-center justify-center">
                  <div className="w-8 h-8 border-4 border-slate-100 border-t-blue-600 rounded-full animate-spin"></div>
                  <p className="text-xs text-slate-450 mt-4 font-semibold">Loading resources list...</p>
                </div>
              ) : resources.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50/50 text-slate-500 font-bold uppercase tracking-wider text-[9px]">
                        <th className="py-2.5 px-4">Title & Link</th>
                        <th className="py-2.5 px-4">Category</th>
                        <th className="py-2.5 px-4 text-center">Status</th>
                        <th className="py-2.5 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                      {resources.map((res) => (
                        <tr key={res.id} className="hover:bg-slate-50/30 transition-colors">
                          <td className="py-3 px-4 max-w-[200px]">
                            <div className="font-bold text-slate-800 truncate">{res.title}</div>
                            <a 
                              href={res.url} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="text-[10px] text-blue-600 hover:underline block truncate mt-0.5"
                            >
                              🔗 View PDF link
                            </a>
                            {res.description && (
                              <div className="text-[9px] text-slate-400 mt-1 line-clamp-1 italic">{res.description}</div>
                            )}
                          </td>
                          <td className="py-3 px-4">
                            <span className="text-[10px] bg-slate-100 text-slate-650 px-2 py-0.5 rounded-md border border-slate-200/50">
                              {res.category}
                            </span>
                            <div className="text-[9px] text-slate-400 mt-0.5">{res.fileSize || 'N/A'} • {res.source || 'Admin'}</div>
                          </td>
                          <td className="py-3 px-4 text-center">
                            <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                              res.isApproved
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                : "bg-amber-50 text-amber-700 border border-amber-250 animate-pulse"
                            }`}>
                              {res.isApproved ? "Approved" : "Pending"}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right flex justify-end gap-2 pt-4">
                            {!res.isApproved && (
                              <button
                                onClick={() => handleApproveResource(res.id)}
                                className="bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-[9px] font-bold px-2 py-1 rounded border border-emerald-150 transition-all"
                              >
                                Approve
                              </button>
                            )}
                            <button
                              onClick={() => handleDeleteResource(res.id, res.title)}
                              className="bg-red-50 hover:bg-red-100 text-red-600 text-[9px] font-bold px-2 py-1 rounded border border-red-150 transition-all"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="py-16 text-center text-slate-400 text-xs">
                  📭 No resources added yet. Submissions will appear here.
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Platform Settings Tab */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Announcement Banner Panel */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm h-fit">
              <h2 className="text-sm font-extrabold text-slate-800 border-b border-slate-100 pb-3 mb-4 flex items-center gap-1.5">
                <span>📢 Announcement Banner Control</span>
              </h2>
              <form onSubmit={handleSaveBannerSettings} className="space-y-4">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Banner Status</label>
                  <select
                    value={bannerVisibleSetting}
                    onChange={(e) => setBannerVisibleSetting(e.target.value)}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-xs bg-white focus:outline-none focus:border-blue-500 font-semibold"
                  >
                    <option value="true">Visible (बैनर दिखाएं)</option>
                    <option value="false">Hidden (बैनर छिपाएं)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Banner Alert Message *</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Enter announcement text to show on top of the website..."
                    value={bannerTextSetting}
                    onChange={(e) => setBannerTextSetting(e.target.value)}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-blue-500 font-medium resize-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Destination link / URL</label>
                  <input
                    type="text"
                    placeholder="e.g. /blog/ssc-stenographer-syllabus-pattern"
                    value={bannerLinkSetting}
                    onChange={(e) => setBannerLinkSetting(e.target.value)}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-blue-500 font-medium"
                  />
                </div>
                <button
                  type="submit"
                  disabled={bannerSaveLoading}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold text-xs py-2.5 rounded-xl shadow-md transition-all active:scale-98"
                >
                  {bannerSaveLoading ? "Saving Settings..." : "💾 Update Banner Announcement"}
                </button>
              </form>
            </div>

            {/* Dynamic Notification Pusher */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm h-fit">
              <h2 className="text-sm font-extrabold text-slate-800 border-b border-slate-100 pb-3 mb-4 flex items-center gap-1.5">
                <span>🔔 Broadcast Global Notification</span>
              </h2>
              <form onSubmit={handlePushNotification} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Badge Title</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Live Test, Update"
                      value={notifBadge}
                      onChange={(e) => setNotifBadge(e.target.value)}
                      className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Icon (Emoji)</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 🔔, 🏆, ⚡"
                      value={notifIcon}
                      onChange={(e) => setNotifIcon(e.target.value)}
                      className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Notification Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. HSSC Group D Exam date released!"
                    value={notifTitle}
                    onChange={(e) => setNotifTitle(e.target.value)}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-blue-500 font-bold text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Short Description *</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Enter short details for users..."
                    value={notifDesc}
                    onChange={(e) => setNotifDesc(e.target.value)}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-blue-500 resize-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Redirection Link</label>
                  <input
                    type="text"
                    placeholder="e.g. /dashboard or /free-resources"
                    value={notifLink}
                    onChange={(e) => setNotifLink(e.target.value)}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-blue-500"
                  />
                </div>
                <button
                  type="submit"
                  disabled={notifPushLoading}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold text-xs py-2.5 rounded-xl shadow-md transition-all active:scale-98"
                >
                  {notifPushLoading ? "Broadcasting..." : "🚀 Push Global Notification"}
                </button>
              </form>
            </div>

            {/* AI API Keys Configuration */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm h-fit lg:col-span-2">
              <h2 className="text-sm font-extrabold text-slate-800 border-b border-slate-100 pb-3 mb-4 flex items-center gap-1.5">
                <span>🔑 AI API Keys Configuration (Failover Control)</span>
              </h2>
              <form onSubmit={handleSaveApiKeysSettings} className="space-y-4">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                    API Keys JSON Config List
                  </label>
                  <textarea
                    required
                    rows={6}
                    placeholder='Enter API keys JSON list e.g. [{"provider":"openrouter","apiKey":"sk-...","baseUrl":"...","model":"..."}]'
                    value={apiKeysConfigSetting}
                    onChange={(e) => setApiKeysConfigSetting(e.target.value)}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-blue-500 font-mono resize-y"
                  />
                  <p className="text-[10px] text-slate-450 mt-1.5 leading-relaxed">
                    💡 <strong>Tip:</strong> Provide a valid JSON array of API keys. The first key in the list will be used primarily, and if it fails or returns an error, the system will automatically failover and retry using the subsequent keys in the list.
                  </p>
                </div>
                <button
                  type="submit"
                  disabled={apiKeysSaveLoading}
                  className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold text-xs py-2.5 px-6 rounded-xl shadow-md transition-all active:scale-98"
                >
                  {apiKeysSaveLoading ? "Saving Config..." : "💾 Save AI Keys Config"}
                </button>
              </form>
            </div>
          </div>
        )}

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
