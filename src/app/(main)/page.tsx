'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CATEGORIES, EXAMS, MOCK_TESTS } from '@/mockData';
import TestCard from '@/components/TestCard';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');

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
          <p className="text-slate-500 mt-2 text-sm sm:text-base">
            Directly select your target exam and start practicing real-time mock tests
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {EXAMS.map((exam) => (
            <div
              key={exam.id}
              className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                <span className="text-2xl sm:text-3xl p-3 bg-slate-50 rounded-xl inline-block mb-3.5">
                  {EXAM_ICONS[exam.slug] || '📝'}
                </span>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <h3 className="font-extrabold text-slate-800 text-sm sm:text-base leading-tight">
                    {exam.name}
                  </h3>
                  {exam.popular && (
                    <span className="bg-blue-50 text-blue-700 text-[9px] font-bold px-1.5 py-0.5 rounded border border-blue-100">
                      Popular
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                  {exam.description}
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-slate-100">
                <Link
                  href={`/exam/${exam.slug}`}
                  className="text-xs text-blue-650 hover:text-blue-750 font-bold flex items-center gap-1 group"
                >
                  Explore Mock Tests
                  <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Popular Tests Carousel/Grid */}
      <section className="bg-slate-100/50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div className="text-center md:text-left">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Trending Mock Tests
              </h2>
              <p className="text-slate-500 mt-2 text-sm sm:text-base">
                Attempt these high-yield mock tests taken by thousands of aspirants daily.
              </p>
            </div>
            <Link
              href="/exam/sbi-po"
              className="mt-4 md:mt-0 text-sm text-blue-600 hover:text-blue-700 font-bold inline-flex items-center gap-1 justify-center"
            >
              View All Mock Tests
              <span>→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {popularTests.map((test) => (
              <TestCard key={test.id} test={test} />
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
