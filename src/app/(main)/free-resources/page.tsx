'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

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

const RESOURCE_CATEGORIES = [
  { key: 'ALL', label: 'All Resources', icon: '📚' },
  { key: 'NCERT Books', label: 'NCERT Books', icon: '🏫' },
  { key: 'Notes', label: 'Study Notes & Formulas', icon: '✍️' },
  { key: 'Official Syllabus', label: 'Syllabus Guides', icon: '📋' },
  { key: 'SSC Exams', label: 'SSC Materials', icon: '📝' },
  { key: 'HSSC Exams', label: 'HSSC Materials', icon: '🌾' },
];

export default function FreeResourcesPage() {
  const [resources, setResources] = useState<FreeResource[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [isLoading, setIsLoading] = useState(true);

  // Suggestion form states
  const [suggestTitle, setSuggestTitle] = useState('');
  const [suggestUrl, setSuggestUrl] = useState('');
  const [suggestCategory, setSuggestCategory] = useState('Notes');
  const [suggestDesc, setSuggestDesc] = useState('');
  const [suggestSize, setSuggestSize] = useState('');
  const [suggestSource, setSuggestSource] = useState('');
  const [formMessage, setFormMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function loadResources() {
      try {
        const res = await fetch('/api/resources');
        if (res.ok) {
          const data = await res.json();
          setResources(data.resources || []);
        }
      } catch (err) {
        console.error('Failed to load resources:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadResources();
  }, []);

  const handleDownloadClick = async (id: string, url: string) => {
    // Open in a new window/tab safely
    window.open(url, '_blank', 'noopener,noreferrer');
    
    // Trigger download count increment API
    try {
      await fetch('/api/resources', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
      
      // Immediately reflect increments locally
      setResources(prev => prev.map(r => r.id === id ? { ...r, downloads: (r.downloads || 0) + 1 } : r));
    } catch (err) {
      console.error('Failed to increment download count:', err);
    }
  };

  const getCategoryColorStyles = (category: string) => {
    switch (category) {
      case 'HSSC Exams':
        return 'bg-blue-50 text-blue-600 border border-blue-100';
      case 'NCERT Books':
        return 'bg-purple-50 text-purple-650 border border-purple-100';
      case 'SSC Exams':
        return 'bg-teal-50 text-teal-600 border border-teal-100';
      case 'Notes':
        return 'bg-amber-50 text-amber-600 border border-amber-100';
      default:
        return 'bg-indigo-50 text-indigo-650 border border-indigo-150';
    }
  };

  const getCategorySvgIcon = (category: string) => {
    switch (category) {
      case 'NCERT Books':
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        );
      case 'Notes':
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        );
      case 'Official Syllabus':
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
    }
  };

  const handleSuggestSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!suggestTitle || !suggestUrl) {
      setFormMessage({ type: 'error', text: 'Please enter both Title and PDF Link.' });
      return;
    }

    setIsSubmitting(true);
    setFormMessage(null);

    try {
      const res = await fetch('/api/resources', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: suggestTitle,
          url: suggestUrl,
          category: suggestCategory,
          description: suggestDesc,
          fileSize: suggestSize || 'N/A',
          source: suggestSource || 'User Suggestion',
          isApproved: false // Auto-sets to false for moderation
        })
      });

      if (res.ok) {
        setFormMessage({
          type: 'success',
          text: 'Thank you! Your resource has been submitted. It will appear on the site once approved by our editorial team.'
        });
        // Clear fields
        setSuggestTitle('');
        setSuggestUrl('');
        setSuggestDesc('');
        setSuggestSize('');
        setSuggestSource('');
      } else {
        const data = await res.json();
        setFormMessage({ type: 'error', text: data.error || 'Failed to submit resource.' });
      }
    } catch (err) {
      setFormMessage({ type: 'error', text: 'Server connection error. Please try again later.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredResources = resources.filter(res => {
    const matchesSearch = 
      res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (res.description || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (res.source || '').toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'ALL' || res.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'NCERT Books': return '🏫';
      case 'Notes': return '✍️';
      case 'Official Syllabus': return '📋';
      case 'SSC Exams': return '📝';
      case 'HSSC Exams': return '🌾';
      default: return '📚';
    }
  };

  return (
    <div className="min-h-screen bg-page py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Hero Section */}
        <div className="text-center mb-12">
          <span className="bg-blue-100 text-blue-805 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm border border-blue-200">
            Free Library
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
            Free E-Books & Study Materials
          </h1>
          <p className="text-slate-500 mt-2.5 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Download high-quality preparation materials, official previous year papers, syllabi, and reference textbooks legally.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto mb-8 relative">
          <input
            type="text"
            placeholder="Search by book name, topic, or source..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-2xl py-3.5 pl-5 pr-12 text-sm text-slate-800 shadow-md shadow-slate-100 focus:outline-none focus:border-blue-500 transition-all font-medium"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg">
            🔍
          </span>
        </div>

        {/* Category Tabs */}
        <div className="flex gap-2 pb-4 mb-10 overflow-x-auto scrollbar-none border-b border-slate-200">
          {RESOURCE_CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`py-2 px-4 text-xs font-bold rounded-full border transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-500/10'
                    : 'bg-white border-slate-200 text-slate-650 hover:text-slate-850 hover:border-slate-350'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Catalog Grid */}
        {isLoading ? (
          <div className="py-20 text-center">
            <span className="inline-block w-8 h-8 rounded-full border-4 border-slate-200 border-t-blue-600 animate-spin"></span>
            <p className="text-slate-450 text-xs mt-3 font-bold uppercase tracking-wider">Loading resources...</p>
          </div>
        ) : filteredResources.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {filteredResources.map((res) => (
              <div 
                key={res.id}
                className="bg-white border border-slate-200/80 rounded-xl p-4 hover:shadow-lg hover:border-blue-500/20 transition-all duration-300 flex flex-col justify-between"
              >
                {/* 1. Top row */}
                <div>
                  <div className="flex items-center justify-between">
                    <div className={`w-[34px] h-[34px] rounded-lg flex items-center justify-center ${getCategoryColorStyles(res.category)}`}>
                      {getCategorySvgIcon(res.category)}
                    </div>
                    <span className="text-[9px] bg-slate-100 text-slate-500 border border-slate-200/50 px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                      PDF
                    </span>
                  </div>

                  {/* 2. Title */}
                  <h3 className="font-bold text-slate-800 text-sm sm:text-base mt-3 leading-snug">
                    {res.title}
                  </h3>
                  
                  {/* 3. Description */}
                  {res.description && (
                    <p className="text-slate-500 text-xs mt-2 leading-relaxed line-clamp-2">
                      {res.description}
                    </p>
                  )}
                </div>

                <div>
                  {/* 4. Stats row */}
                  <div className="flex items-center justify-between text-xs text-slate-500 mt-4 pt-3 border-t border-slate-100">
                    <div className="flex items-center gap-3">
                      {/* Download Count */}
                      <div className="flex items-center gap-1">
                        <svg className="w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        <span className="font-semibold text-[11px] text-slate-600">{res.downloads || 0} downloads</span>
                      </div>

                      {/* Rating (Omit if not available) */}
                      {res.rating !== undefined && res.rating !== null && (
                        <div className="flex items-center gap-1">
                          <svg className="w-3.5 h-3.5 text-amber-500 fill-amber-500" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span className="font-bold text-slate-700 text-[11px]">{res.rating.toFixed(1)}</span>
                        </div>
                      )}
                    </div>

                    {/* Source / Attribution */}
                    <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">
                      Source: {res.source || 'Official'}
                    </span>
                  </div>

                  {/* 5. CTA button */}
                  <button
                    onClick={() => handleDownloadClick(res.id, res.url)}
                    className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2.5 rounded-xl transition-all shadow-md shadow-blue-500/10 active:scale-98 flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    📥 Download free
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-16 text-center bg-white border border-dashed border-slate-200 rounded-3xl mb-16">
            <span className="text-3xl">📂</span>
            <h3 className="font-bold text-slate-700 mt-3 text-sm">No Free Resources Found</h3>
            <p className="text-slate-400 text-xs mt-1">Try resetting filters or adjusting search queries.</p>
          </div>
        )}

        {/* Suggestion Form Section */}
        <div className="bg-slate-900 rounded-3xl p-6 sm:p-10 text-white relative overflow-hidden shadow-xl">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none"></div>
          
          <div className="relative z-10 max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-extrabold tracking-tight">Suggest a Free Resource</h2>
              <p className="text-slate-400 text-xs mt-2 leading-relaxed">
                Found a verified, free, and legally shareable preparation ebook or official previous year paper PDF? Share the link below to help fellow students.
              </p>
            </div>

            <form onSubmit={handleSuggestSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-300 tracking-wider mb-1">
                    Book / Resource Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. NCERT Class 12 Polity E-Book"
                    value={suggestTitle}
                    onChange={(e) => setSuggestTitle(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-blue-500 transition-all font-medium"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-300 tracking-wider mb-1">
                    PDF URL Link *
                  </label>
                  <input
                    type="url"
                    required
                    placeholder="https://example.com/file.pdf"
                    value={suggestUrl}
                    onChange={(e) => setSuggestUrl(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-blue-500 transition-all font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-300 tracking-wider mb-1">
                    Category *
                  </label>
                  <select
                    value={suggestCategory}
                    onChange={(e) => setSuggestCategory(e.target.value)}
                    className="w-full bg-slate-800 border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-blue-500 transition-all"
                  >
                    <option value="NCERT Books">NCERT Books</option>
                    <option value="Notes">Study Notes & Formulas</option>
                    <option value="Official Syllabus">Syllabus Guides</option>
                    <option value="SSC Exams">SSC Materials</option>
                    <option value="HSSC Exams">HSSC Materials</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-300 tracking-wider mb-1">
                    File Size (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 5.4 MB"
                    value={suggestSize}
                    onChange={(e) => setSuggestSize(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-blue-500 transition-all font-medium"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-300 tracking-wider mb-1">
                    Source/Publisher (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. NCERT Official"
                    value={suggestSource}
                    onChange={(e) => setSuggestSource(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-blue-500 transition-all font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-300 tracking-wider mb-1">
                  Brief Description
                </label>
                <textarea
                  placeholder="Summarize what this study guide contains to help students before download..."
                  rows={2}
                  value={suggestDesc}
                  onChange={(e) => setSuggestDesc(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-blue-500 transition-all font-medium"
                />
              </div>

              {formMessage && (
                <div className={`p-4 rounded-xl text-xs font-bold leading-relaxed ${
                  formMessage.type === 'success' 
                    ? 'bg-emerald-500/10 border border-emerald-500/25 text-emerald-400' 
                    : 'bg-red-500/10 border border-red-500/25 text-red-400'
                }`}>
                  {formMessage.text}
                </div>
              )}

              <div className="text-center pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex justify-center items-center bg-accent-cta hover:bg-accent-cta-hover text-slate-900 font-bold text-sm px-8 py-3.5 rounded-xl shadow-lg shadow-amber-500/20 transition-all active:scale-98 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? 'Submitting...' : '🚀 Submit Resource'}
                </button>
              </div>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
