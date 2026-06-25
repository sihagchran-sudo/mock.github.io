'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { CATEGORIES, EXAMS, MOCK_TESTS } from '@/mockData';
import { BLOGS } from '@/blogData';
import TestCard from '@/components/TestCard';

const SYLLABUS_CATEGORIES = [
  { key: 'ALL', label: 'All Exams' },
  { key: 'Banking', label: 'Banking & Insurance' },
  { key: 'SSC Exams', label: 'SSC Exams' },
  { key: 'Civil Services', label: 'Civil Services' },
  { key: 'Railways', label: 'Railways' },
  { key: 'State Police', label: 'State Police' },
  { key: 'Teacher Exams', label: 'Teaching Exams' },
  { key: 'State Exams', label: 'State General' },
];

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSyllabusCategory, setSelectedSyllabusCategory] = useState('ALL');
  const [blogsList, setBlogsList] = useState<any[]>(BLOGS);

  // Fetch updated blogs list from database
  useEffect(() => {
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
  }, []);

  const EXAM_ICONS: Record<string, string> = {
    'sbi-po': '🏛️',
    'ibps-po': '🏦',
    'ssc-cgl': '✍️',
    'ssc-chsl': '📝',
    'ssc-mts': '📋',
    'upsc-cse': '🎖️',
    'rrb-ntpc': '🚆',
    'hssc-haryana-police': '👮',
  };

  // Filter exams based on search query
  const filteredExams = EXAMS.filter(exam =>
    exam.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    exam.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
      {/* 1. Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50/90 via-sky-50/60 to-white/70 backdrop-blur-lg text-slate-800 overflow-hidden py-16 lg:py-24 px-4 sm:px-6 lg:px-8 border-b border-blue-100/50">
        {/* Background Decorative Elements (Sleek light blue/indigo blur reflections) */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-blue-200/20 blur-[120px] pointer-events-none -mr-40 -mt-40"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-indigo-200/20 blur-[100px] pointer-events-none -ml-20 -mb-20"></div>
        
        {/* Sleek diagonal grid pattern using pure CSS SVG to look highly premium on light background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.015)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_at_center,white,transparent_80%)] pointer-events-none"></div>

        {/* Subtle 2D Motion Overlays (Absolute floating badges in background) */}
        <div className="hidden lg:block absolute top-[18%] left-[6%] animate-float-slow pointer-events-none select-none z-0">
          <div className="bg-white border border-slate-200/80 rounded-xl px-3.5 py-2.5 shadow-md text-slate-800 text-xs font-bold opacity-[0.18] flex items-center gap-2">
            <span>🎯</span> 99th Percentile
          </div>
        </div>
        <div className="hidden lg:block absolute bottom-[22%] left-[8%] animate-float-delay pointer-events-none select-none z-0">
          <div className="bg-white border border-slate-200/80 rounded-xl px-4 py-2.5 shadow-md text-slate-800 text-xs font-bold opacity-[0.16] flex items-center gap-2">
            <span>📈</span> Accuracy: +95%
          </div>
        </div>
        <div className="hidden lg:block absolute top-[22%] right-[6%] animate-float-delay pointer-events-none select-none z-0">
          <div className="bg-white border border-slate-200/80 rounded-xl px-4 py-2.5 shadow-md text-slate-800 text-xs font-bold opacity-[0.18] flex items-center gap-2">
            <span>⏱️</span> Real-time Timer
          </div>
        </div>
        <div className="hidden lg:block absolute bottom-[26%] right-[8%] animate-float-slow pointer-events-none select-none z-0">
          <div className="bg-white border border-slate-200/80 rounded-xl px-4 py-2.5 shadow-md text-slate-800 text-xs font-bold opacity-[0.16] flex items-center gap-2">
            <span>🏆</span> Cut-off Cleared
          </div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10 flex flex-col items-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-650 border border-blue-100 mb-6 shadow-sm">
            🚀 Powered by AI Exam Analytics
          </span>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-6 leading-tight max-w-3xl text-slate-900">
            Leave Exam Fear Behind. Practice in a{' '}
            <span className="bg-gradient-to-r from-amber-500 via-amber-600 to-orange-500 bg-clip-text text-transparent">
              Real Test Environment.
            </span>
          </h1>
          
          <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto mb-10 leading-relaxed font-normal">
            Feeling nervous about the final exam day is normal, but it shouldn't lower your score. Our platform gives you the exact feel of the real exam hall. Practice with the same screen layout, manage the real countdown timer, and test your speed before the actual day. We show you exactly where you are making mistakes so you can fix them fast. Build your confidence, manage your time better, and get ready to clear the cut-off.
          </p>

          {/* Exam Search Bar */}
          <div className="w-full max-w-lg relative mb-8">
            <div className="flex shadow-xl shadow-slate-100 rounded-xl overflow-hidden bg-white text-slate-800 border border-slate-200 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all">
              <span className="flex items-center justify-center pl-4 bg-white text-base">
                🔍
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search exams (e.g. SBI PO, SSC CGL, RRB)..."
                className="w-full px-4 py-3.5 focus:outline-none text-slate-800 font-semibold placeholder:text-slate-400 text-sm sm:text-base text-left"
              />
            </div>

            {/* Live Search Suggestions Dropdown */}
            {searchQuery && (
              <div className="absolute left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-slate-100 z-50 text-slate-800 max-h-60 overflow-y-auto text-left divide-y divide-slate-50">
                {filteredExams.length > 0 ? (
                  filteredExams.map((exam) => (
                    <Link
                      key={exam.id}
                      href={`/exam/${exam.slug}`}
                      className="block px-5 py-3.5 hover:bg-slate-50 transition-colors"
                    >
                      <div className="font-semibold text-slate-800 text-sm">{exam.name}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{exam.description}</div>
                    </Link>
                  ))
                ) : (
                  <div className="px-5 py-4 text-sm text-slate-400 italic text-center">
                    No exams found matching your search.
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Trust Ticker (Above the Fold, Centered) */}
          <div className="w-full max-w-2xl flex flex-wrap justify-center gap-3 sm:gap-4 mb-8">
            <div className="bg-white border border-slate-200/80 rounded-xl px-4 py-2.5 flex items-center gap-2.5 shadow-sm hover:shadow-md hover:border-slate-350 transition-all text-left">
              <span className="text-base sm:text-lg shrink-0">🏆</span>
              <div>
                <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider leading-none">Attempted</div>
                <div className="text-sm sm:text-base font-extrabold text-blue-600 mt-0.5">10M+ Tests</div>
              </div>
            </div>
            <div className="bg-white border border-slate-200/80 rounded-xl px-4 py-2.5 flex items-center gap-2.5 shadow-sm hover:shadow-md hover:border-slate-350 transition-all text-left">
              <span className="text-base sm:text-lg shrink-0">🎓</span>
              <div>
                <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider leading-none">Exams Covered</div>
                <div className="text-sm sm:text-base font-extrabold text-indigo-600 mt-0.5">500+ Govt</div>
              </div>
            </div>
            <div className="bg-white border border-slate-200/80 rounded-xl px-4 py-2.5 flex items-center gap-2.5 shadow-sm hover:shadow-md hover:border-slate-350 transition-all text-left">
              <span className="text-base sm:text-lg shrink-0">⚡</span>
              <div>
                <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider leading-none">User Rating</div>
                <div className="text-sm sm:text-base font-extrabold text-emerald-600 mt-0.5">4.8 / 5.0</div>
              </div>
            </div>
          </div>

          {/* Quick exam tags */}
          <div className="flex flex-wrap justify-center items-center gap-2.5">
            <span className="text-xs text-slate-500 font-bold">Popular:</span>
            {popularExams.map(exam => (
              <Link
                key={exam.id}
                href={`/exam/${exam.slug}`}
                className="text-xs bg-slate-100 hover:bg-slate-200 hover:text-blue-600 text-slate-650 border border-slate-200/60 font-semibold px-3.5 py-1.5 rounded-full transition-all"
              >
                {exam.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Exams Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center md:text-left mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Target Your Exam Goal
          </h2>
          <p className="text-slate-500 mt-3 text-sm sm:text-base max-w-2xl leading-relaxed">
            Directly select your target exam and start practicing real-time mock tests with customized syllabus patterns.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {EXAMS.map((exam) => (
            <Link
              key={exam.id}
              href={`/exam/${exam.slug}`}
              className="group bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:shadow-blue-900/5 hover:border-blue-500/40 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between min-h-[220px]"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between w-full">
                  {/* Styled Icon Container */}
                  <span className="text-2xl sm:text-3xl p-3 bg-gradient-to-br from-blue-50 to-indigo-50/50 text-blue-600 border border-blue-100/50 rounded-2xl inline-flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                    {EXAM_ICONS[exam.slug] || '📝'}
                  </span>
                  
                  {exam.popular && (
                    <span className="bg-amber-500/10 text-amber-700 text-[10px] font-extrabold px-2.5 py-1 rounded-full border border-amber-500/20 shrink-0">
                      Popular
                    </span>
                  )}
                </div>

                <div className="min-w-0 text-left">
                  <h3 className="font-extrabold text-slate-800 text-base sm:text-lg leading-snug group-hover:text-blue-600 transition-colors">
                    {exam.name}
                  </h3>
                  <p className="text-slate-500 text-xs mt-2 line-clamp-2 leading-relaxed">
                    {exam.description}
                  </p>
                </div>
              </div>
              
              <div className="flex mt-6 pt-4 border-t border-slate-100 w-full items-center justify-between text-xs text-blue-650 font-bold group">
                <span>Start Mock Tests</span>
                <span className="group-hover:translate-x-1.5 transition-transform duration-300 text-base leading-none">→</span>
              </div>
            </Link>
          ))}
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
                  className="inline-flex justify-center items-center bg-gradient-to-r from-blue-600 to-indigo-650 hover:from-blue-700 hover:to-indigo-750 text-white font-bold text-sm px-8 py-4 rounded-xl shadow-lg shadow-blue-500/25 transition-all hover:scale-102 active:scale-98 min-h-[48px] text-center cursor-pointer"
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
                        Authority: {blog.details.authority}
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
                    className="flex-1 text-center bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-3.5 px-4 rounded-xl shadow-md hover:shadow-blue-500/10 transition-all min-h-[44px] flex items-center justify-center cursor-pointer"
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
    </div>
  );
}
