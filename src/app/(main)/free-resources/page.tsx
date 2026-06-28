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
                className="bg-white border border-slate-200/80 rounded-2xl p-5 hover:shadow-lg hover:border-blue-500/20 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] bg-slate-50 border border-slate-100 text-slate-600 font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
                      <span>{getCategoryIcon(res.category)}</span>
                      <span>{res.category}</span>
                    </span>
                    <span className="text-[9px] bg-blue-50 text-blue-600 font-extrabold px-2 py-0.5 rounded-md">
                      {res.fileSize || 'N/A'}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-slate-800 text-base leading-snug">
                    {res.title}
                  </h3>
                  
                  {res.description && (
                    <p className="text-slate-500 text-xs mt-2 leading-relaxed font-medium">
                      {res.description}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between mt-5 pt-4 border-t border-slate-100">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">
                    Source: {res.source || 'Official'}
                  </span>
                  
                  <a
                    href={res.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center bg-accent-cta hover:bg-accent-cta-hover text-white text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-sm shadow-amber-500/10 cursor-pointer"
                  >
                    📥 Download PDF
                  </a>
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
