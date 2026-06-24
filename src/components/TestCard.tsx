'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Test, TestType } from '../mockData';

interface TestCardProps {
  test: Test;
}

export default function TestCard({ test }: TestCardProps) {
  const router = useRouter();

  const handleStartTest = (e: React.MouseEvent) => {
    e.preventDefault();
    const confirmStart = window.confirm("क्या आप टेस्ट शुरू करना चाहते हैं? / Are you sure you want to start the test?");
    if (confirmStart) {
      router.push(`/test-interface/${test.id}`);
    }
  };
  const getBadgeColor = (type: TestType) => {
    switch (type) {
      case 'FULL':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'SUBJECT':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'SECTIONAL':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'CHAPTER':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const getBadgeLabel = (type: TestType) => {
    switch (type) {
      case 'FULL':
        return 'Full Mock Test';
      case 'SUBJECT':
        return 'Subject-wise Test';
      case 'SECTIONAL':
        return 'Sectional Test';
      case 'CHAPTER':
        return 'Chapter-wise Test';
      default:
        return 'Practice Test';
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 duration-200 flex flex-col justify-between h-48">
      <div>
        {/* Test Type Badge */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5">
            <span className={`text-[11px] font-semibold px-2 py-0.5 rounded border ${getBadgeColor(test.testType)}`}>
              {getBadgeLabel(test.testType)}
            </span>
            {test.difficulty === 'Hard' && (
              <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded border bg-red-50 text-red-600 border-red-200 uppercase tracking-wider">
                Hard
              </span>
            )}
          </div>
          <span className="text-slate-400 text-xs flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            {test.questionCount} Questions
          </span>
        </div>

        {/* Title */}
        <h4 className="font-bold text-slate-800 text-sm line-clamp-2 leading-snug">
          {test.title}
        </h4>
      </div>

      <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
        {/* Metadata */}
        <div className="flex space-x-4 text-xs text-slate-500 font-medium">
          <span className="flex items-center gap-1">
            ⏱️ {test.duration} mins
          </span>
          <span className="flex items-center gap-1">
            🎯 {test.totalMarks} Marks
          </span>
        </div>

        {/* Start Button */}
        <button
          onClick={handleStartTest}
          className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-4 py-2 rounded-lg font-semibold shadow-sm transition-all hover:shadow-md active:scale-95 flex items-center gap-1 cursor-pointer"
        >
          Start Test
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
