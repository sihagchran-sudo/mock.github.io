'use client';

import { useState } from 'react';
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
  const filteredBlogs = BLOGS.filter(blog => {
    if (selectedSyllabusCategory === 'ALL') return true;
    return blog.category === selectedSyllabusCategory;
  });

  return (
    <div className="min-h-screen">
      {/* 1. Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 text-white overflow-hidden py-20 px-4 sm:px-6 lg:px-8">
        {/* Background Decorative Circles */}
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30 mb-6 animate-pulse">
            🚀 Powered by AI Exam Analytics
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
            Crack Your Dream Exam with{' '}
            <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-emerald-400 bg-clip-text text-transparent">
              Real-time Mock Tests
            </span>
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            Get the actual exam experience with TCS iON-like exam simulator, detailed analytics dashboard, and practice questions curated by experts.
          </p>

          {/* Exam Search Bar */}
          <div className="max-w-lg mx-auto relative">
            <div className="flex shadow-lg rounded-xl overflow-hidden bg-white text-slate-800 border border-slate-200">
              <span className="flex items-center justify-center pl-4 bg-white">
                🔍
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search exams (e.g. SBI PO, SSC CGL, RRB)..."
                className="w-full px-4 py-4 focus:outline-none text-slate-800 font-medium placeholder:text-slate-400"
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

          {/* Quick exam tags */}
          <div className="mt-8 flex flex-wrap justify-center gap-2.5">
            <span className="text-xs text-slate-400 self-center">Popular:</span>
            {popularExams.map(exam => (
              <Link
                key={exam.id}
                href={`/exam/${exam.slug}`}
                className="text-xs bg-white/10 hover:bg-white/20 px-3.5 py-1.5 rounded-full font-medium transition-colors border border-white/10"
              >
                {exam.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Exams Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="text-center md:text-left mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Target Your Exam Goal
          </h2>
          <p className="text-slate-650 mt-2 text-sm sm:text-base">
            Directly select your target exam and start practicing real-time mock tests
          </p>
        </div>

        <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {EXAMS.map((exam) => (
            <Link
              key={exam.id}
              href={`/exam/${exam.slug}`}
              className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 flex flex-row md:flex-col justify-between items-center md:items-start gap-4 md:gap-0"
            >
              <div className="flex items-center gap-4 md:block md:w-full">
                <span className="text-2xl sm:text-3xl p-3 bg-slate-50 rounded-xl inline-flex items-center justify-center shrink-0 md:mb-4">
                  {EXAM_ICONS[exam.slug] || '📝'}
                </span>
                <div className="min-w-0 text-left">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <h3 className="font-extrabold text-slate-800 text-sm sm:text-base leading-tight">
                      {exam.name}
                    </h3>
                    {exam.popular && (
                      <span className="bg-blue-50 text-blue-700 text-[9px] font-bold px-1.5 py-0.5 rounded border border-blue-100 shrink-0">
                        Popular
                      </span>
                    )}
                  </div>
                  <p className="text-slate-500 text-xs mt-1.5 line-clamp-1 md:line-clamp-2 leading-relaxed">
                    {exam.description}
                  </p>
                </div>
              </div>
              
              <div className="hidden md:flex mt-5 pt-3 border-t border-slate-100 w-full items-center justify-between text-xs text-blue-650 font-bold group">
                <span>Explore Mock Tests</span>
                <span className="group-hover:translate-x-0.5 transition-transform">→</span>
              </div>
              
              {/* Mobile right arrow icon */}
              <div className="md:hidden text-slate-400 shrink-0 font-bold text-base">
                →
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. Exam Syllabus & Official Notifications Blog Section */}
      <section className="bg-slate-100/50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
            <div className="text-center md:text-left">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Official Exam Syllabus & Syllabus Patterns
              </h2>
              <p className="text-slate-500 mt-2 text-sm sm:text-base">
                Read official patterns, section weightage, age limit, and direct syllabus insights from sarkari alerts.
              </p>
            </div>
          </div>

          {/* Syllabus Category Filter Tabs */}
          <div className="flex gap-2 pb-4 mb-8 overflow-x-auto scrollbar-none border-b border-slate-200">
            {SYLLABUS_CATEGORIES.map((cat) => {
              const isActive = selectedSyllabusCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => setSelectedSyllabusCategory(cat.key)}
                  className={`py-2 px-4 text-xs font-bold rounded-full border transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-500/10'
                      : 'bg-white border-slate-250 text-slate-500 hover:text-slate-700 hover:border-slate-350'
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
                className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  {/* Category and Read time */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] bg-blue-50 text-blue-600 font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider border border-blue-100">
                      {blog.category}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">
                      {blog.readTime}
                    </span>
                  </div>

                  {/* Icon & Title */}
                  <div className="flex gap-4 items-start mb-3">
                    <span className="text-3xl p-3 bg-slate-50 rounded-2xl shrink-0">
                      {blog.icon}
                    </span>
                    <div>
                      <Link href={`/blog/${blog.slug}`} className="hover:text-blue-600 transition-colors">
                        <h3 className="font-extrabold text-slate-800 text-base sm:text-lg leading-snug">
                          {blog.title}
                        </h3>
                      </Link>
                      <p className="text-[10px] text-slate-400 mt-1 font-semibold">
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
                <div className="flex gap-3 pt-4 border-t border-slate-100">
                  <Link
                    href={`/blog/${blog.slug}`}
                    className="flex-1 text-center bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs py-3 px-4 rounded-xl transition-all"
                  >
                    View Details
                  </Link>
                  <Link
                    href={`/exam/${blog.examSlug}`}
                    className="flex-1 text-center bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-3 px-4 rounded-xl shadow-md hover:shadow-blue-500/10 transition-all"
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
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/20">
            <div className="pt-6 md:pt-0">
              <p className="text-3xl sm:text-4xl font-extrabold">50M+</p>
              <p className="text-xs sm:text-sm text-blue-100 mt-2 font-medium">Tests Attempted</p>
            </div>
            <div className="pt-6 md:pt-0">
              <p className="text-3xl sm:text-4xl font-extrabold">10M+</p>
              <p className="text-xs sm:text-sm text-blue-100 mt-2 font-medium">Registered Users</p>
            </div>
            <div className="pt-6 md:pt-0">
              <p className="text-3xl sm:text-4xl font-extrabold">500+</p>
              <p className="text-xs sm:text-sm text-blue-100 mt-2 font-medium">Govt Exams Covered</p>
            </div>
            <div className="pt-6 md:pt-0">
              <p className="text-3xl sm:text-4xl font-extrabold">98.7%</p>
              <p className="text-xs sm:text-sm text-blue-100 mt-2 font-medium">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
