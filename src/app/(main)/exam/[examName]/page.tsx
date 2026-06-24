import Link from 'next/link';
import { getExamBySlug, getTestsForExam } from '@/mockData';
import TestCard from '@/components/TestCard';
import { BLOGS } from '@/blogData';

interface PageProps {
  params: Promise<{ examName: string }>;
  searchParams?: Promise<{ tab?: string }>;
}

export default async function ExamNamePage({ params, searchParams }: PageProps) {
  const { examName } = await params;
  const sParams = await searchParams;
  const currentTab = sParams?.tab || 'FULL';

  const exam = getExamBySlug(examName);

  if (!exam) {
    return (
      <div className="max-w-md mx-auto my-20 text-center p-8 bg-white border border-slate-200 rounded-2xl shadow-sm">
        <span className="text-4xl">⚠️</span>
        <h2 className="text-xl font-bold text-slate-800 mt-4">Exam Not Found</h2>
        <p className="text-slate-500 text-sm mt-2">
          We couldn\'t find the exam you\'re looking for. Please check the URL or search from the home page.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block bg-blue-600 hover:bg-blue-700 text-white text-sm px-6 py-2.5 rounded-lg font-semibold shadow-sm transition-colors"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  const examBlog = BLOGS.find(b => b.examSlug === exam.slug);

  // Get all tests for this exam
  const allTests = getTestsForExam(exam.id);

  // Filter tests based on current active tab
  const filteredTests = allTests.filter(test => test.testType === currentTab);

  const tabs = [
    { key: 'FULL', label: 'Full Mock Tests' },
    { key: 'SUBJECT', label: 'Subject-wise Mocks' },
    { key: 'CHAPTER', label: 'Chapter-wise Mocks' },
    { key: 'SECTIONAL', label: 'Sectional Mocks' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* 1. Exam Header */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 rounded-2xl p-6 sm:p-8 text-white shadow-md mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-60 h-60 rounded-full bg-blue-500/10 blur-2xl pointer-events-none"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <Link href="/" className="text-xs text-blue-200 hover:text-white transition-colors flex items-center gap-1">
              ← Home
            </Link>
            <span className="text-slate-400 text-xs">/</span>
            <span className="text-xs text-slate-300 font-semibold bg-white/10 px-2 py-0.5 rounded-full">
              {exam.slug.toUpperCase()} PREP
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold">{exam.name} Mock Test Series</h1>
          <p className="text-slate-300 mt-2 text-sm sm:text-base max-w-2xl leading-relaxed">
            {exam.description}. Accelerate your practice with the latest pattern simulated questions, comprehensive solutions, and smart ranking analytics.
          </p>

          <div className="mt-6 flex flex-wrap gap-4 text-xs font-semibold text-blue-100">
            <span className="flex items-center gap-1 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg">
              🎯 {allTests.length} Practice Tests
            </span>
            <span className="flex items-center gap-1 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg">
              📊 Real-time Percentile Rating
            </span>
            <span className="flex items-center gap-1 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg">
              ⏱️ Detailed Sectional Timing Analysis
            </span>
          </div>
        </div>
      </div>

      {/* Syllabus Link Banner */}
      {examBlog && (
        <div className="mb-8 p-5 bg-blue-50/60 border border-blue-100 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
          <div className="flex gap-3.5 items-start sm:items-center">
            <span className="text-3xl p-2.5 bg-blue-500/10 rounded-xl">📖</span>
            <div className="text-left">
              <h4 className="font-extrabold text-slate-800 text-sm sm:text-base">
                Official Syllabus & Exam Pattern
              </h4>
              <p className="text-slate-500 text-xs mt-0.5 font-medium leading-relaxed">
                Check detailed subjects weightage, topics list, negative marking and eligibility criteria for {exam.name}.
              </p>
            </div>
          </div>
          <Link
            href={`/blog/${examBlog.slug}`}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-3 px-5 rounded-xl shadow-md hover:shadow-blue-500/15 transition-all text-center shrink-0"
          >
            View Full Syllabus
          </Link>
        </div>
      )}

      {/* 2. Tabbed Interface */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Tabs Selection Bar */}
        <div className="border-b border-slate-200 bg-slate-50/50 px-4 sm:px-6 flex overflow-x-auto scrollbar-none">
          {tabs.map((tab) => {
            const isActive = currentTab === tab.key;
            return (
              <Link
                key={tab.key}
                href={`/exam/${exam.slug}?tab=${tab.key}`}
                className={`py-4 px-4 text-sm font-semibold border-b-2 whitespace-nowrap transition-colors ${
                  isActive
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'
                }`}
              >
                {tab.label}
              </Link>
            );
          })}
        </div>

        {/* Tests Cards List Grid */}
        <div className="p-6 sm:p-8">
          {filteredTests.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTests.map((test) => (
                <TestCard key={test.id} test={test} />
              ))}
            </div>
          ) : (
            <div className="py-16 text-center">
              <span className="text-3xl">📭</span>
              <h3 className="font-bold text-slate-800 mt-4 text-base">No Tests Available</h3>
              <p className="text-slate-400 text-xs mt-1.5 max-w-xs mx-auto">
                We are actively curating more questions and mock exams. Please check other categories or check back later!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
