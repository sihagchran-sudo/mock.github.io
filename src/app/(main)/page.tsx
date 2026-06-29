'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { CATEGORIES, EXAMS, MOCK_TESTS } from '@/mockData';
import { BLOGS } from '@/blogData';
import TestCard from '@/components/TestCard';
import { siteConfig } from '@/siteConfig';

const SYLLABUS_CATEGORIES = [
  { key: 'ALL', label: 'All Exams' },
  { key: 'SSC Exams', label: 'SSC Exams' },
  { key: 'HSSC Exams', label: 'HSSC Exams' },
  { key: 'Railways', label: 'Railways' },
  { key: 'State Police', label: 'State Police' },
  { key: 'Teacher Exams', label: 'Teaching Exams' },
  { key: 'Defence', label: 'Defence' },
  { key: 'State Exams', label: 'State General' },
];

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSyllabusCategory, setSelectedSyllabusCategory] = useState('ALL');
  const [blogsList, setBlogsList] = useState<any[]>(BLOGS);
  const [selectedExamCategory, setSelectedExamCategory] = useState('ALL');
  const [activeDetailsExam, setActiveDetailsExam] = useState<any | null>(null);

  const [mockTestsCount, setMockTestsCount] = useState(MOCK_TESTS.length);
  const [activeStudents, setActiveStudents] = useState(siteConfig.baseActiveStudents);

  useEffect(() => {
    // Fetch updated blogs list from database
    const fetchBlogs = async () => {
      try {
        const res = await fetch("/api/admin/blog");
        const data = await res.json();
        if (res.ok && data.articles) {
          setBlogsList(data.articles);
        }
      } catch (e) {
        // Fallback is already BLOGS in state
      }
    };
    fetchBlogs();

    // Fetch mock test count dynamically
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/stats");
        if (res.ok) {
          const data = await res.json();
          if (data.mockTestsCount) {
            setMockTestsCount(data.mockTestsCount);
          }
        }
      } catch (err) {
        console.error("Failed to load test count stats:", err);
      }
    };
    fetchStats();

    // Cosmetic animation for active students count (not a real analytics feed)
    const interval = setInterval(() => {
      setActiveStudents((prev) => {
        const minBound = siteConfig.baseActiveStudents - 15;
        const maxBound = siteConfig.baseActiveStudents + 15;
        // Random drift between -8 and +8
        const drift = Math.floor(Math.random() * 17) - 8;
        let nextVal = prev + drift;
        if (nextVal < minBound) nextVal = minBound + Math.floor(Math.random() * 5);
        if (nextVal > maxBound) nextVal = maxBound - Math.floor(Math.random() * 5);
        return nextVal;
      });
    }, 30000); // every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const EXAM_ICONS: Record<string, string> = {
    // SSC
    'ssc-cgl': '✍️',
    'ssc-chsl': '📝',
    'ssc-mts': '📋',
    'ssc-gd-constable': '👮',
    'ssc-cpo': '🚓',
    'ssc-stenographer': '⌨️',
    'ssc-je': '⚙️',
    // HSSC
    'hssc-haryana-police': '👮',
    'hssc-cet': '🌾',
    // State Police
    'up-police-constable': '👮',
    'up-police-si': '🚓',
    'delhi-police-constable': '👮',
    'bihar-police-constable': '👮',
    'rajasthan-police-constable': '👮',
    'cisf-capf-constable': '🛡️',
    // Teaching
    'ctet': '🎓',
    'htet': '🏫',
    // Railways
    'rrb-ntpc': '🚆',
    'rrb-group-d': '🛤️',
    'rrb-alp': '🚂',
    'rpf-si': '👮',
    // Defence (Army)
    'army-agniveer-gd': '🎖️',
    'army-agniveer-technical': '⚙️',
    'army-agniveer-tradesman': '🛠️',
    'army-agniveer-clerk': '💼',
    // State General
    'upsssc-pet': '📋',
    'up-patwari': '🗺️',
    'rajasthan-patwari': '🗺️',
    'ib-acio': '🕵️',
    'dsssb-various': '🏢',
  };

const EXAM_CATEGORIES = [
  { id: 'ALL', name: 'All Categories', icon: '⚡' },
  { id: 'cat-ssc', name: 'SSC Exams', icon: '📝' },
  { id: 'cat-hssc', name: 'HSSC Exams', icon: '📋' },
  { id: 'cat-police', name: 'State Police', icon: '👮' },
  { id: 'cat-railways', name: 'Railways', icon: '🚆' },
  { id: 'cat-defence', name: 'Defence', icon: '⚔️' },
  { id: 'cat-teaching', name: 'Teaching', icon: '🎓' },
  { id: 'cat-state-general', name: 'State General', icon: '🗺️' },
];

  // Filter exams based on search query
  const filteredExams = EXAMS.filter(exam =>
    exam.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    exam.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter exams based on search query AND category selection
  const filteredExamsForGrid = EXAMS.filter(exam => {
    const matchesSearch = exam.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          exam.description.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;
    
    if (selectedExamCategory === 'ALL') return true;
    return exam.categoryId === selectedExamCategory;
  });

  // Popular exams list
  const popularExams = EXAMS.filter(e => e.popular);
  // Popular mock tests list (take first 3)
  const popularTests = MOCK_TESTS.filter(t => t.testType === 'FULL').slice(0, 3);

  // Filtered blogs for syllabus
  const filteredBlogs = blogsList.filter(blog => {
    if (selectedSyllabusCategory === 'ALL') return true;
    return blog.category === selectedSyllabusCategory;
  });

  return (
    <div className="min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative bg-slate-950 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-950/50 via-slate-950 to-slate-950 text-white overflow-hidden py-16 lg:py-24 px-4 sm:px-6 lg:px-8 border-b border-blue-950/40">
        {/* Radial Glow Accents */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-[130px] pointer-events-none -mr-40 -mt-40"></div>
        <div className="absolute bottom-10 left-1/3 w-[450px] h-[450px] rounded-full bg-amber-500/5 blur-[120px] pointer-events-none -ml-20 -mb-20"></div>
        
        {/* Sleek diagonal grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_at_center,white,transparent_80%)] pointer-events-none"></div>

        {/* Subtle 2D Motion Overlays (Absolute floating badges in background) */}
        <div className="hidden lg:block absolute top-[15%] left-[4%] animate-float-slow pointer-events-none select-none z-0">
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-4 py-2 shadow-lg text-white text-xs font-semibold flex items-center gap-2">
            <span>🎯</span> 99th Percentile
          </div>
        </div>
        <div className="hidden lg:block absolute bottom-[25%] left-[5%] animate-float-delay pointer-events-none select-none z-0">
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-4 py-2 shadow-lg text-white text-xs font-semibold flex items-center gap-2">
            <span>📈</span> Accuracy: +95%
          </div>
        </div>
        <div className="hidden lg:block absolute top-[18%] right-[40%] animate-float-delay pointer-events-none select-none z-0">
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-4 py-2 shadow-lg text-white text-xs font-semibold flex items-center gap-2">
            <span>⏱️</span> Real-time Timer
          </div>
        </div>
        <div className="hidden lg:block absolute bottom-[28%] right-[38%] animate-float-slow pointer-events-none select-none z-0">
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-4 py-2 shadow-lg text-white text-xs font-semibold flex items-center gap-2">
            <span>🏆</span> Cut-off Cleared
          </div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column */}
            <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-white/5 backdrop-blur-md text-blue-300 border border-white/10 shadow-lg">
                🚀 Powered by AI Exam Analytics
              </span>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-white">
                Leave Exam Fear Behind. Practice in a{' '}
                <span className="bg-gradient-to-r from-amber-400 to-amber-500 bg-clip-text text-transparent">
                  Real Test Environment.
                </span>
              </h1>
              
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal max-w-2xl">
                Feeling nervous about the final exam day is normal, but it shouldn't lower your score. Our platform gives you the exact feel of the real exam hall. Practice with the same screen layout, manage the real countdown timer, and test your speed before the actual day. We show you exactly where you are making mistakes so you can fix them fast. Build your confidence, manage your time better, and get ready to clear the cut-off.
              </p>

              {/* Mobile/Tablet Badges Showcase */}
              <div className="flex flex-wrap gap-2 py-2 lg:hidden w-full">
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-3 py-1.5 shadow-sm text-white text-[10px] sm:text-xs font-semibold flex items-center gap-1.5">
                  <span>🎯</span> 99th Percentile
                </div>
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-3 py-1.5 shadow-sm text-white text-[10px] sm:text-xs font-semibold flex items-center gap-1.5">
                  <span>📈</span> Accuracy: +95%
                </div>
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-3 py-1.5 shadow-sm text-white text-[10px] sm:text-xs font-semibold flex items-center gap-1.5">
                  <span>⏱️</span> Real-time Timer
                </div>
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-3 py-1.5 shadow-sm text-white text-[10px] sm:text-xs font-semibold flex items-center gap-1.5">
                  <span>🏆</span> Cut-off Cleared
                </div>
              </div>

              {/* Primary CTA Button */}
              <div className="pt-2">
                <Link
                  href="#exams-grid"
                  className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-slate-950 font-extrabold text-xs px-8 py-3.5 rounded-xl shadow-lg shadow-amber-500/10 hover:shadow-amber-500/25 active:scale-98 transition-all inline-flex items-center gap-2 cursor-pointer"
                >
                  🚀 Start Free Practice
                </Link>
              </div>

              {/* Exam Search Bar */}
              <div className="w-full max-w-lg relative pt-4">
                <div className="flex shadow-2xl shadow-blue-950/20 rounded-xl overflow-hidden bg-white/5 backdrop-blur-md text-white border border-white/10 focus-within:ring-2 focus-within:ring-blue-500/30 focus-within:border-blue-500/40 transition-all">
                  <span className="flex items-center justify-center pl-4 text-base">
                    🔍
                  </span>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search exams (e.g. SBI PO, SSC CGL, RRB)..."
                    className="w-full px-4 py-3.5 focus:outline-none bg-transparent text-white font-semibold placeholder:text-slate-500 text-sm sm:text-base text-left"
                  />
                </div>

                {/* Live Search Suggestions Dropdown */}
                {searchQuery && (
                  <div className="absolute left-0 right-0 mt-2 bg-slate-900 border border-white/10 rounded-xl shadow-2xl z-50 text-white max-h-60 overflow-y-auto text-left divide-y divide-white/5">
                    {filteredExams.length > 0 ? (
                      filteredExams.map((exam) => (
                        <Link
                          key={exam.id}
                          href={`/exam/${exam.slug}`}
                          className="block px-5 py-3.5 hover:bg-white/5 transition-colors"
                        >
                          <div className="font-semibold text-white text-sm">{exam.name}</div>
                          <div className="text-xs text-slate-400 mt-0.5">{exam.description}</div>
                        </Link>
                      ))
                    ) : (
                      <div className="px-5 py-4 text-sm text-slate-500 italic text-center">
                        No exams found matching your search.
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Quick exam tags */}
              <div className="flex flex-wrap items-center gap-2.5 pt-2">
                <span className="text-xs text-slate-500 font-bold">Popular:</span>
                {popularExams.map(exam => (
                  <Link
                    key={exam.id}
                    href={`/exam/${exam.slug}`}
                    className="text-[11px] bg-white/5 hover:bg-white/10 hover:text-amber-400 text-slate-300 border border-white/8 font-semibold px-3.5 py-1.5 rounded-full transition-all"
                  >
                    {exam.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Right Column (Desktop Only Stats Card) */}
            <div className="lg:col-span-5 hidden lg:flex flex-col items-center justify-center">
              <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-6 shadow-2xl w-full max-w-sm flex flex-col gap-6 relative overflow-hidden">
                {/* Glow behind the stats card */}
                <div className="absolute -top-10 -right-10 w-24 h-24 rounded-full bg-blue-500/20 blur-xl pointer-events-none"></div>
                
                {/* Mock Tests Count */}
                <div className="flex items-center gap-4">
                  <span className="p-3.5 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-2xl flex items-center justify-center shrink-0">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </span>
                  <div className="text-left">
                    <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider leading-none">Mock Tests Available</div>
                    <div className="text-xl font-black text-white mt-1.5">{mockTestsCount}+ Tests</div>
                  </div>
                </div>

                {/* Selections This Year */}
                <div className="flex items-center gap-4">
                  <span className="p-3.5 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-2xl flex items-center justify-center shrink-0">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v5m-3 0h6m-6-14h6m-6 4h6m.5-4a2.5 2.5 0 110 5h-.5m-6-5a2.5 2.5 0 100 5h.5M12 3a9 9 0 00-9 9m18 0a9 9 0 00-9-9" />
                    </svg>
                  </span>
                  <div className="text-left">
                    <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider leading-none">Selections This Year</div>
                    <div className="text-xl font-black text-amber-450 mt-1.5">{siteConfig.selectionsThisYear}+ Candidates</div>
                  </div>
                </div>

                {/* Active practicing users */}
                <div className="flex items-center gap-4">
                  <span className="p-3.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-2xl flex items-center justify-center relative shrink-0">
                    <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-emerald-500 rounded-full animate-ping"></span>
                    <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-emerald-500 rounded-full"></span>
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </span>
                  <div className="text-left">
                    <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider leading-none">Practicing Right Now</div>
                    <div className="text-xl font-black text-emerald-450 mt-1.5">{activeStudents} Students</div>
                  </div>
                </div>

                {/* Overlapping trust indicators */}
                <div className="border-t border-white/5 pt-4 flex items-center gap-3 w-full">
                  <div className="flex -space-x-2 shrink-0">
                    <div className="w-8 h-8 rounded-full border border-slate-950 bg-blue-500 flex items-center justify-center text-[10px] font-bold text-white shadow-md select-none">A</div>
                    <div className="w-8 h-8 rounded-full border border-slate-950 bg-emerald-550 flex items-center justify-center text-[10px] font-bold text-white shadow-md select-none">S</div>
                    <div className="w-8 h-8 rounded-full border border-slate-950 bg-amber-500 flex items-center justify-center text-[10px] font-bold text-white shadow-md select-none">R</div>
                    <div className="w-8 h-8 rounded-full border border-slate-950 bg-purple-500 flex items-center justify-center text-[10px] font-bold text-white shadow-md select-none">P</div>
                  </div>
                  <div className="text-left">
                    <div className="text-[11px] font-black text-white leading-tight">Trusted by 10M+ Aspirants</div>
                    <div className="text-[9px] text-slate-400 leading-none mt-0.5">Across India</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATS STRIP */}
      <div className="max-w-5xl mx-auto px-4 -mt-10 sm:-mt-12 relative z-20 select-none">
        <div className="bg-gradient-to-r from-slate-900 to-blue-950 border border-white/10 rounded-2xl p-5 shadow-2xl backdrop-blur-md">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-white/5">
            {/* Stat 1: Mock Tests */}
            <div className="flex items-center justify-center gap-3.5 py-2.5 md:py-0 md:px-6">
              <span className="p-2.5 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-xl flex items-center justify-center shrink-0">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </span>
              <div className="text-left">
                <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider leading-none">Mock Tests Available</div>
                <div className="text-base font-extrabold text-white mt-1">{mockTestsCount}+ Tests</div>
              </div>
            </div>

            {/* Stat 2: Selections */}
            <div className="flex items-center justify-center gap-3.5 py-3.5 md:py-0 md:px-6">
              <span className="p-2.5 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-xl flex items-center justify-center shrink-0">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v5m-3 0h6m-6-14h6m-6 4h6m.5-4a2.5 2.5 0 110 5h-.5m-6-5a2.5 2.5 0 100 5h.5M12 3a9 9 0 00-9 9m18 0a9 9 0 00-9-9" />
                </svg>
              </span>
              <div className="text-left">
                <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider leading-none">Selections This Year</div>
                <div className="text-base font-extrabold text-amber-450 mt-1">{siteConfig.selectionsThisYear}+ Candidates</div>
              </div>
            </div>

            {/* Stat 3: Active Students */}
            <div className="flex items-center justify-center gap-3.5 py-2.5 md:py-0 md:px-6">
              <span className="p-2.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-xl flex items-center justify-center relative shrink-0">
                <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></span>
                <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </span>
              <div className="text-left">
                <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider leading-none">Practicing Right Now</div>
                <div className="text-base font-extrabold text-emerald-450 mt-1">{activeStudents} Students</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Exams Grid */}
      <section id="exams-grid" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center md:text-left mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Target Your Exam Goal
          </h2>
          <p className="text-slate-500 mt-3 text-sm sm:text-base max-w-2xl leading-relaxed">
            Directly select your target exam and start practicing real-time mock tests with customized syllabus patterns.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex gap-2.5 pb-4 mb-10 overflow-x-auto scrollbar-none border-b border-slate-200 justify-start sm:justify-center">
          {EXAM_CATEGORIES.map((cat) => {
            const isActive = selectedExamCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedExamCategory(cat.id)}
                className={`py-2 px-4.5 text-xs font-bold rounded-full border transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 active:scale-98 ${
                  isActive
                    ? 'bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-500/10'
                    : 'bg-white border-slate-200 text-slate-650 hover:text-slate-850 hover:border-slate-350'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredExamsForGrid.map((exam) => {
            const examTests = MOCK_TESTS.filter(t => t.examId === exam.id);
            const duration = examTests.find(t => t.testType === 'FULL')?.duration || 90;
            const marks = examTests.find(t => t.testType === 'FULL')?.totalMarks || 100;
            
            return (
              <div
                key={exam.id}
                className="group bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:shadow-blue-900/5 hover:border-blue-500/40 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between min-h-[250px]"
              >
                <div className="space-y-4 text-left">
                  <div className="flex items-center justify-between w-full">
                    {/* Styled Icon Container */}
                    <span className="text-2xl sm:text-3xl p-3 bg-gradient-to-br from-blue-50 to-indigo-50/50 text-blue-600 border border-blue-100/50 rounded-2xl inline-flex items-center justify-center shrink-0 group-hover:scale-105 transition-all duration-300">
                      {EXAM_ICONS[exam.slug] || '📝'}
                    </span>
                    
                    {exam.popular && (
                      <span className="bg-amber-500/10 text-amber-700 text-[10px] font-extrabold px-2.5 py-1 rounded-full border border-amber-500/20 shrink-0">
                        Popular
                      </span>
                    )}
                  </div>

                  <div className="min-w-0">
                    <h3 className="font-extrabold text-slate-800 text-base sm:text-lg leading-snug group-hover:text-blue-600 transition-colors">
                      {exam.name}
                    </h3>
                    <p className="text-slate-500 text-xs mt-2 line-clamp-2 leading-relaxed">
                      {exam.description}
                    </p>

                    {/* Dynamic Exam Details Badges */}
                    <div className="flex items-center gap-3 mt-3.5 text-[10px] font-bold text-slate-400">
                      <span className="flex items-center gap-1">⏱️ {duration} Mins</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">📊 {marks} Marks</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2.5 mt-6 pt-4 border-t border-slate-100 w-full items-center">
                  <button
                    onClick={() => setActiveDetailsExam(exam)}
                    className="flex-1 text-center bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200/50 font-bold text-xs py-2.5 rounded-xl transition-all cursor-pointer min-h-[36px]"
                  >
                    View Details
                  </button>
                  <Link
                    href={`/exam/${exam.slug}`}
                    className="flex-1 text-center bg-accent-cta hover:bg-accent-cta-hover text-white font-bold text-xs py-2.5 rounded-xl shadow-md hover:shadow-amber-500/10 transition-all cursor-pointer min-h-[36px] flex items-center justify-center"
                  >
                    Start Mocks
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 2.5 TCS iON Test Simulator Preview Section */}
      <section className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white py-16 sm:py-24 overflow-hidden relative border-t border-white/5">
        {/* Background Gradients */}
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-blue-500/10 blur-[100px] pointer-events-none -mr-20 -mb-20"></div>
        <div className="absolute top-0 left-0 w-[400px] h-[400px] rounded-full bg-indigo-600/10 blur-[120px] pointer-events-none -ml-20 -mt-20"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left side: features list */}
            <div className="lg:col-span-6 text-left space-y-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-300 border border-amber-500/20 shadow-sm uppercase tracking-wider">
                ⚡ 100% Exam Simulator
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                Experience the Real{' '}
                <span className="bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent">
                  TCS iON Exam Interface
                </span>
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Zero surprise elements on the exam day. Rehearse with the exact same UI layout, navigation palette, section guidelines, and countdown logic that you will face in the exam hall.
              </p>
              
              {/* Feature Points Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-start gap-3 bg-white/5 border border-white/15 rounded-xl p-3.5 backdrop-blur-sm">
                  <span className="text-xl shrink-0">⏱️</span>
                  <div>
                    <h4 className="font-bold text-white text-sm">Real-time Timer</h4>
                    <p className="text-slate-400 text-xs mt-1 leading-relaxed">Sectional timer countdown with automated locking.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-white/5 border border-white/15 rounded-xl p-3.5 backdrop-blur-sm">
                  <span className="text-xl shrink-0">🟢</span>
                  <div>
                    <h4 className="font-bold text-white text-sm">Question Palette</h4>
                    <p className="text-slate-400 text-xs mt-1 leading-relaxed">Standard Answered, Unanswered, and Marked states.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-white/5 border border-white/15 rounded-xl p-3.5 backdrop-blur-sm">
                  <span className="text-xl shrink-0">🗂️</span>
                  <div>
                    <h4 className="font-bold text-white text-sm">Section Switching</h4>
                    <p className="text-slate-400 text-xs mt-1 leading-relaxed">Official layout structure for paper navigation.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-white/5 border border-white/15 rounded-xl p-3.5 backdrop-blur-sm">
                  <span className="text-xl shrink-0">📊</span>
                  <div>
                    <h4 className="font-bold text-white text-sm">Visual Scorecard</h4>
                    <p className="text-slate-400 text-xs mt-1 leading-relaxed">Detailed subject percentiles and ranking metrics.</p>
                  </div>
                </div>
              </div>

              {/* Call to Action Button */}
              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                <Link
                  href="/exam/ssc-cgl"
                  className="inline-flex justify-center items-center bg-accent-cta hover:bg-accent-cta-hover text-white font-bold text-sm px-8 py-4 rounded-xl shadow-lg shadow-amber-500/25 transition-all hover:scale-102 active:scale-98 min-h-[48px] text-center cursor-pointer"
                >
                  Launch Demo Simulator
                </Link>
                <Link
                  href="/dashboard"
                  className="inline-flex justify-center items-center bg-white/10 hover:bg-white/15 text-slate-100 border border-white/10 font-bold text-sm px-8 py-4 rounded-xl transition-all active:scale-98 min-h-[48px] text-center cursor-pointer"
                >
                  View Saved Tests
                </Link>
              </div>
            </div>

            {/* Right side: Mockup Showcase */}
            <div className="lg:col-span-6 relative flex justify-center items-center mt-8 lg:mt-0">
              <div className="relative w-full max-w-[500px]">
                {/* Glow ring around laptop */}
                <div className="absolute inset-0 bg-blue-500/10 rounded-3xl blur-2xl -z-10 transform scale-105"></div>
                
                {/* Glassmorphic border container */}
                <div className="p-3 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md shadow-2xl">
                  <img
                    src="/test_simulator_mockup.png"
                    alt="TCS iON Test Simulator Laptop Mockup"
                    className="w-full h-auto object-contain rounded-lg border border-white/10 select-none shadow-lg"
                    draggable="false"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Exam Syllabus & Official Notifications Blog Section */}
      <section className="bg-slate-50/50 py-20 border-y border-slate-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center md:text-left mb-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Official Exam Syllabus & Patterns
            </h2>
            <p className="text-slate-500 mt-3 text-sm sm:text-base max-w-2xl leading-relaxed">
              Read official patterns, section weightage, age limit, and direct syllabus insights from sarkari alerts.
            </p>
          </div>

          {/* Syllabus Category Filter Tabs */}
          <div className="flex gap-2 pb-4 mb-10 overflow-x-auto scrollbar-none border-b border-slate-200">
            {SYLLABUS_CATEGORIES.map((cat) => {
              const isActive = selectedSyllabusCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => setSelectedSyllabusCategory(cat.key)}
                  className={`py-2.5 px-5 text-xs font-bold rounded-full border transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-500/10'
                      : 'bg-white border-slate-200 text-slate-650 hover:text-slate-850 hover:border-slate-350'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredBlogs.map((blog) => (
              <div 
                key={blog.slug} 
                className="group bg-white rounded-3xl border border-slate-200/70 p-6 shadow-sm hover:shadow-xl hover:shadow-blue-900/5 hover:border-blue-500/30 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Category and Read time */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-[10px] bg-blue-50 text-blue-600 font-extrabold px-3 py-1.5 rounded-full uppercase tracking-wider border border-blue-100/50">
                      {blog.category}
                    </span>
                    <span className="text-[10px] text-slate-400 font-bold flex items-center gap-1">
                      ⏱️ {blog.readTime}
                    </span>
                  </div>

                  {/* Icon & Title */}
                  <div className="flex gap-4 items-start mb-4">
                    <span className="text-3xl p-3 bg-slate-50 border border-slate-100 rounded-2xl shrink-0 group-hover:scale-105 transition-transform duration-300">
                      {blog.icon}
                    </span>
                    <div>
                      <Link href={`/blog/${blog.slug}`} className="hover:text-blue-600 transition-colors">
                        <h3 className="font-extrabold text-slate-800 text-base sm:text-lg leading-snug group-hover:text-blue-600 transition-colors">
                          {blog.title}
                        </h3>
                      </Link>
                      <p className="text-[10px] text-slate-400 mt-1.5 font-bold uppercase tracking-wider">
                        Authority: {blog.authorityBadge || (blog.details as any)?.authority || 'Official Board'}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-slate-500 text-xs sm:text-sm line-clamp-2 leading-relaxed mb-6 font-medium">
                    {blog.description}
                  </p>
                </div>

                {/* Buttons Action Group */}
                <div className="flex gap-3 pt-5 border-t border-slate-100">
                  <Link
                    href={`/blog/${blog.slug}`}
                    className="flex-1 text-center bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200/50 font-bold text-xs py-3.5 px-4 rounded-xl transition-all min-h-[44px] flex items-center justify-center cursor-pointer"
                  >
                    View Details
                  </Link>
                  <Link
                    href={`/exam/${blog.examSlug}`}
                    className="flex-1 text-center bg-accent-cta hover:bg-accent-cta-hover text-white font-bold text-xs py-3.5 px-4 rounded-xl shadow-md hover:shadow-amber-500/10 transition-all min-h-[44px] flex items-center justify-center cursor-pointer"
                  >
                    Start Mock Test
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Stats / Trust Banner */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
            <div className="pt-4 md:pt-0">
              <p className="text-3xl sm:text-5xl font-black tracking-tight text-white">50M+</p>
              <p className="text-xs sm:text-sm text-blue-100 mt-2.5 font-bold uppercase tracking-wider">Tests Attempted</p>
            </div>
            <div className="pt-8 md:pt-0">
              <p className="text-3xl sm:text-5xl font-black tracking-tight text-white">10M+</p>
              <p className="text-xs sm:text-sm text-blue-100 mt-2.5 font-bold uppercase tracking-wider">Registered Users</p>
            </div>
            <div className="pt-8 md:pt-0">
              <p className="text-3xl sm:text-5xl font-black tracking-tight text-white">500+</p>
              <p className="text-xs sm:text-sm text-blue-100 mt-2.5 font-bold uppercase tracking-wider">Govt Exams Covered</p>
            </div>
            <div className="pt-8 md:pt-0">
              <p className="text-3xl sm:text-5xl font-black tracking-tight text-white">98.7%</p>
              <p className="text-xs sm:text-sm text-blue-100 mt-2.5 font-bold uppercase tracking-wider">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </section>

      {activeDetailsExam && (() => {
        const exam = activeDetailsExam;
        const examTests = MOCK_TESTS.filter(t => t.examId === exam.id);
        const fullMock = examTests.find(t => t.testType === 'FULL') || examTests[0];
        
        let sections = ["General Knowledge", "Reasoning Ability", "Quantitative Aptitude"];
        if (exam.slug.startsWith('ssc-')) {
          sections = ["General Intelligence & Reasoning", "Quantitative Aptitude", "English Comprehension", "General Awareness"];
        } else if (exam.slug.startsWith('hssc-')) {
          sections = ["Haryana GK", "General Knowledge & Science", "Reasoning & Maths", "Hindi & English"];
        } else if (exam.slug.startsWith('up-police-')) {
          sections = ["General Knowledge", "General Hindi", "Numerical & Mental Ability", "Reasoning & Mental Aptitude"];
        } else if (exam.slug.includes('rrb-') || exam.slug.includes('rpf-')) {
          sections = ["General Awareness", "Mathematics", "General Intelligence & Reasoning"];
        } else if (exam.slug.includes('ctet') || exam.slug.includes('htet')) {
          sections = ["Child Development & Pedagogy", "Language I", "Language II", "Mathematics", "Environmental Studies"];
        } else if (exam.slug.startsWith('army-')) {
          sections = ["General Science", "General Knowledge", "Mathematics", "Logical Reasoning"];
        }
        
        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-md transition-all duration-300">
            <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto border border-slate-200 shadow-2xl flex flex-col justify-between relative z-50">
              {/* Close Button */}
              <button 
                onClick={() => setActiveDetailsExam(null)} 
                className="absolute top-5 right-5 text-slate-400 hover:text-slate-650 transition-colors p-2 bg-slate-100 hover:bg-slate-200 rounded-full cursor-pointer z-10 text-sm leading-none"
              >
                ✕
              </button>

              {/* Modal Header */}
              <div className="p-6 sm:p-8 border-b border-slate-150 bg-slate-50/50 text-left">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-3xl p-3.5 bg-white border border-slate-150 rounded-2xl shadow-sm inline-flex items-center justify-center shrink-0">
                    {EXAM_ICONS[exam.slug] || '📝'}
                  </span>
                  <div>
                    <span className="text-[10px] bg-blue-50 text-blue-600 font-extrabold px-3 py-1 rounded-full border border-blue-100 uppercase tracking-wider">
                      {CATEGORIES.find(c => c.id === exam.categoryId)?.name || 'Exam'}
                    </span>
                    <h2 className="text-xl sm:text-2xl font-black text-slate-800 mt-1.5 leading-tight">{exam.name}</h2>
                  </div>
                </div>
                <p className="text-slate-500 text-xs sm:text-sm font-medium leading-relaxed">{exam.description}</p>
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-8 space-y-6 flex-grow text-left">
                {/* Quick Stats Grid */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-150 text-center">
                    <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">Total Tests</span>
                    <span className="font-extrabold text-slate-800 text-xs sm:text-sm">{examTests.length} Mocks</span>
                  </div>
                  <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-150 text-center">
                    <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">Duration</span>
                    <span className="font-extrabold text-slate-800 text-xs sm:text-sm">{(fullMock?.duration) || 90} Mins</span>
                  </div>
                  <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-150 text-center">
                    <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">Max Marks</span>
                    <span className="font-extrabold text-slate-800 text-xs sm:text-sm">{(fullMock?.totalMarks) || 100} Marks</span>
                  </div>
                </div>

                {/* Syllabus Sections */}
                <div>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Syllabus Subjects Covered</h3>
                  <div className="flex flex-wrap gap-2">
                    {sections.map((sec, i) => (
                      <span key={i} className="text-xs bg-blue-50/50 text-blue-800 border border-blue-100 font-semibold px-3 py-1.5 rounded-xl">
                        {sec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Tests List */}
                <div>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3.5">Available Practice Mocks</h3>
                  <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
                    {examTests.map(test => (
                      <div key={test.id} className="flex items-center justify-between p-3.5 bg-white border border-slate-200 hover:border-slate-300 rounded-2xl shadow-sm transition-all gap-4">
                        <div className="text-left">
                          <h4 className="font-extrabold text-slate-800 text-xs sm:text-sm">{test.title}</h4>
                          <p className="text-[10px] text-slate-400 mt-1 font-bold">
                            {test.questionCount} Qs • {test.duration} Mins • {test.testType} Mock
                          </p>
                        </div>
                        <Link 
                          href={`/exam/${exam.slug}`}
                          className="bg-accent-cta hover:bg-accent-cta-hover text-white text-[10px] font-black px-4 py-2 rounded-xl shadow-sm transition-all whitespace-nowrap active:scale-98"
                        >
                          Start Mocks
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-6 bg-slate-50/50 border-t border-slate-150 flex items-center justify-end gap-3 rounded-b-3xl">
                <button 
                  onClick={() => setActiveDetailsExam(null)} 
                  className="px-5 py-2.5 bg-white hover:bg-slate-100 border border-slate-250 rounded-xl text-slate-700 text-xs font-bold transition-all cursor-pointer active:scale-98"
                >
                  Close
                </button>
                <Link 
                  href={`/exam/${exam.slug}`}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 rounded-xl text-white text-xs font-extrabold transition-all shadow-sm active:scale-98"
                >
                  Start Mock Test Series
                </Link>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
