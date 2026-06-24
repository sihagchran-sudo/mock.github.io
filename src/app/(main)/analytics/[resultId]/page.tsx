'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getTestById, getQuestionsForTest, TestAttempt, INITIAL_ATTEMPTS } from '@/mockData';

export default function AnalyticsPage() {
  const params = useParams();
  const router = useRouter();
  const resultId = params.resultId as string;

  const [attempt, setAttempt] = useState<TestAttempt | null>(null);
  const [openExplanation, setOpenExplanation] = useState<Record<string, boolean>>({});

  useEffect(() => {
    // 1. Try to fetch from local storage
    const storedAttempts = JSON.parse(localStorage.getItem('mock_attempts') || '[]');
    let currentAttempt = storedAttempts.find((a: TestAttempt) => a.id === resultId);

    // 2. Fall back to initial mock history
    if (!currentAttempt) {
      currentAttempt = INITIAL_ATTEMPTS.find(a => a.id === resultId);
    }

    if (currentAttempt) {
      setAttempt(currentAttempt);
    }
  }, [resultId]);

  if (!attempt) {
    return (
      <div className="max-w-md mx-auto my-20 text-center p-8 bg-white border border-slate-200 rounded-2xl shadow-sm">
        <span className="text-4xl">🔍</span>
        <h2 className="text-xl font-bold text-slate-800 mt-4">Result Not Found</h2>
        <p className="text-slate-500 text-sm mt-2">
          We could not load the analytics details for this attempt id.
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

  const test = getTestById(attempt.testId)!;
  const questions = getQuestionsForTest(attempt.testId);

  // Time formatting helper (seconds to Mins)
  const formatTimeMinutes = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    return `${mins} mins`;
  };

  const toggleExplanation = (qId: string) => {
    setOpenExplanation(prev => ({ ...prev, [qId]: !prev[qId] }));
  };

  // Section Time calculations for SVG Chart
  const sectionTimes = attempt.analytics?.sectionTimeTaken || {};
  const sectionEntries = Object.entries(sectionTimes);
  const maxTime = sectionEntries.length > 0 ? Math.max(...sectionEntries.map(([, t]) => t)) : 1;

  // Circular progress math (Accuracy)
  const strokeDash = 2 * Math.PI * 40; // radius = 40
  const dashOffset = strokeDash - (attempt.accuracy / 100) * strokeDash;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* 1. Header Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium mb-1">
            <Link href="/dashboard" className="hover:text-blue-600">Dashboard</Link>
            <span>/</span>
            <span className="text-slate-400">Analysis #{attempt.id.slice(0, 8)}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800">
            Performance Analysis Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Attempted on: {new Date(attempt.startedAt).toLocaleDateString(undefined, {
              dateStyle: 'long',
            })}
          </p>
        </div>

        <Link
          href={`/exam/sbi-po`}
          className="border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs px-5 py-2.5 rounded-lg font-bold transition-all shadow-sm flex items-center justify-center gap-1.5 self-start"
        >
          ← Practice More Mocks
        </Link>
      </div>

      {/* 2. Core Metrics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        {/* Score Card */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Score Obtained</p>
          <div className="mt-4 flex items-baseline gap-1">
            <span className="text-3xl font-extrabold text-blue-600">{attempt.score}</span>
            <span className="text-xs text-slate-400 font-semibold">/ {test.totalMarks} Marks</span>
          </div>
          <p className="text-[10px] text-slate-400 mt-2 font-medium">Scaled score logic applied</p>
        </div>

        {/* Accuracy Card */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Accuracy</p>
          <div className="mt-4 flex items-baseline gap-1">
            <span className="text-3xl font-extrabold text-emerald-600">{attempt.accuracy}%</span>
          </div>
          <p className="text-[10px] text-slate-400 mt-2 font-medium">Target accuracy: &gt;85%</p>
        </div>

        {/* Percentile Card */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Percentile</p>
          <div className="mt-4 flex items-baseline gap-1">
            <span className="text-3xl font-extrabold text-indigo-600">{attempt.percentile}</span>
            <span className="text-xs text-slate-400 font-semibold">%ile</span>
          </div>
          <p className="text-[10px] text-slate-400 mt-2 font-medium">Outperformed {attempt.percentile}% of applicants</p>
        </div>

        {/* Time Card */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Time Taken</p>
          <div className="mt-4 flex items-baseline gap-1">
            <span className="text-3xl font-extrabold text-slate-700">
              {attempt.submittedAt 
                ? formatTimeMinutes(Math.round((new Date(attempt.submittedAt).getTime() - new Date(attempt.startedAt).getTime()) / 1000))
                : 'N/A'
              }
            </span>
          </div>
          <p className="text-[10px] text-slate-400 mt-2 font-medium">Allowed: {test.duration} mins</p>
        </div>
      </div>

      {/* 3. Visual Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Left: Overall Accuracy Circular progress chart */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center justify-center">
          <h3 className="font-bold text-slate-800 text-sm mb-6 self-start">Accuracy Visualizer</h3>
          
          <div className="relative w-40 h-40 flex items-center justify-center">
            {/* SVG Ring */}
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="80"
                cy="80"
                r="40"
                className="stroke-slate-100"
                strokeWidth="10"
                fill="transparent"
              />
              <circle
                cx="80"
                cy="80"
                r="40"
                className="stroke-emerald-500 transition-all duration-500"
                strokeWidth="10"
                fill="transparent"
                strokeDasharray={strokeDash}
                strokeDashoffset={dashOffset}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-3xl font-extrabold text-slate-800">{attempt.accuracy}%</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Accuracy</span>
            </div>
          </div>

          <div className="mt-6 flex space-x-6 text-xs text-slate-600 font-semibold">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full"></span>
              Correct Responses
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 bg-slate-200 rounded-full"></span>
              Incorrect / Unanswered
            </div>
          </div>
        </div>

        {/* Right: Section-wise Time Taken Bar Chart */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
          <h3 className="font-bold text-slate-800 text-sm mb-6">Section Time Breakdown</h3>
          
          {sectionEntries.length > 0 ? (
            <div className="flex-grow flex flex-col justify-center space-y-5">
              {sectionEntries.map(([secName, secSeconds]) => {
                const percentage = (secSeconds / maxTime) * 100;
                return (
                  <div key={secName} className="space-y-1.5">
                    <div className="flex justify-between text-xs font-bold text-slate-700">
                      <span>{secName}</span>
                      <span className="text-slate-500">{formatTimeMinutes(secSeconds)}</span>
                    </div>
                    {/* SVG Bar mimicking responsive flex */}
                    <div className="w-full bg-slate-100 h-6 rounded-lg overflow-hidden">
                      <div
                        style={{ width: `${percentage}%` }}
                        className="bg-gradient-to-r from-blue-500 to-indigo-600 h-full rounded-lg transition-all duration-500"
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex-grow flex items-center justify-center text-xs text-slate-400 italic">
              No sectional time analytics registered.
            </div>
          )}
        </div>
      </div>

      {/* 4. Strengths & Weaknesses */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-emerald-50/50 border border-emerald-200 p-6 rounded-2xl">
          <h3 className="font-bold text-emerald-800 text-sm flex items-center gap-1.5 mb-4">
            💪 Strong Practice Chapters
          </h3>
          <ul className="space-y-2.5">
            {attempt.analytics?.strongChapters.map((chap, i) => (
              <li key={i} className="text-xs text-emerald-700 font-semibold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                {chap}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-red-50/50 border border-red-200 p-6 rounded-2xl">
          <h3 className="font-bold text-red-800 text-sm flex items-center gap-1.5 mb-4">
            ⚠️ Attention Required Chapters
          </h3>
          <ul className="space-y-2.5">
            {attempt.analytics?.weakChapters.map((chap, i) => (
              <li key={i} className="text-xs text-red-700 font-semibold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                {chap}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 5. Question & Explanation Accordion */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="border-b border-slate-200 bg-slate-50/50 px-6 py-4">
          <h3 className="font-bold text-slate-800 text-sm">
            Question Paper Review & Step-by-Step Solutions
          </h3>
        </div>

        <div className="divide-y divide-slate-100 p-4">
          {questions.map((q, idx) => {
            const userRes = attempt.responses.find(r => r.questionId === q.id);
            const userSelection = userRes ? userRes.selectedIndex : -1;
            const isCorrect = userSelection === q.correctIndex;
            const isUnattempted = userSelection === -1;
            const isOpen = !!openExplanation[q.id];

            return (
              <div key={q.id} className="py-5 px-2">
                {/* Question Info Line */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-400">#Q{idx + 1}</span>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest bg-slate-100 px-2 py-0.5 rounded">
                      {q.sectionName}
                    </span>
                  </div>

                  {/* Status Badge */}
                  <div>
                    {isUnattempted ? (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-500 border border-slate-200">
                        Unattempted
                      </span>
                    ) : isCorrect ? (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                        ✓ Correct (+1 Mark)
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-50 text-red-700 border border-red-200">
                        ✗ Incorrect (-0.25 Mark)
                      </span>
                    )}
                  </div>
                </div>

                {/* Question text */}
                <p className="text-slate-800 text-sm font-semibold mb-4 leading-relaxed">
                  {q.text}
                </p>

                {/* User choices options list visualizer */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                  {q.options.map((opt, oIdx) => {
                    const isCorrectOption = oIdx === q.correctIndex;
                    const isUserSelected = oIdx === userSelection;
                    let optionBorder = 'border-slate-200';
                    let optionBg = 'bg-white';

                    if (isCorrectOption) {
                      optionBorder = 'border-emerald-500';
                      optionBg = 'bg-emerald-50/20';
                    } else if (isUserSelected && !isCorrect) {
                      optionBorder = 'border-red-400';
                      optionBg = 'bg-red-50/20';
                    }

                    return (
                      <div
                        key={oIdx}
                        className={`p-3 rounded-lg border text-xs flex items-center gap-2 font-medium ${optionBorder} ${optionBg}`}
                      >
                        <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
                          isCorrectOption 
                            ? 'bg-emerald-500 text-white' 
                            : isUserSelected 
                            ? 'bg-red-500 text-white' 
                            : 'bg-slate-100 text-slate-400'
                        }`}>
                          {String.fromCharCode(65 + oIdx)}
                        </span>
                        <span className="text-slate-700">{opt}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Explanation Toggle */}
                <div>
                  <button
                    onClick={() => toggleExplanation(q.id)}
                    className="text-xs text-blue-600 hover:text-blue-700 font-bold flex items-center gap-1.5 focus:outline-none"
                  >
                    {isOpen ? 'Hide Detailed Solution' : 'View Step-by-Step Solution'}
                    <span className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}>▼</span>
                  </button>

                  {/* Solution block */}
                  {isOpen && (
                    <div className="mt-3.5 p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600 leading-relaxed shadow-inner">
                      <p className="font-bold text-slate-800 mb-1.5">Detailed Answer Explanation:</p>
                      <p className="mb-2.5">{q.explanation}</p>
                      <p className="text-[10px] text-slate-400 font-medium">
                        Section topic tags: {q.sectionName} &gt; {idx % 2 === 0 ? 'Algebra Arithmetic' : 'Reasoning Aptitude'}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
