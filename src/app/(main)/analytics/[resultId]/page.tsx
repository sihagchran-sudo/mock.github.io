'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getTestById, getQuestionsForTest, TestAttempt, INITIAL_ATTEMPTS } from '@/mockData';

const renderFormattedText = (text: string) => {
  if (!text) return '';
  const parts = text.split('**');
  return parts.map((part, index) => {
    if (index % 2 === 1) {
      return <strong key={index} className="font-extrabold text-slate-900">{part}</strong>;
    }
    return part;
  });
};

export default function AnalyticsPage() {
  const params = useParams();
  const router = useRouter();
  const resultId = params.resultId as string;

  const [attempt, setAttempt] = useState<TestAttempt | null>(null);
  const [openExplanation, setOpenExplanation] = useState<Record<string, boolean>>({});
  const [totalCandidates, setTotalCandidates] = useState(12450);
  const [userRank, setUserRank] = useState(1);

  const [loadingAiExplanation, setLoadingAiExplanation] = useState<Record<string, boolean>>({});
  const [aiExplanations, setAiExplanations] = useState<Record<string, string>>({});
  const [localExplanations, setLocalExplanations] = useState<Record<string, string>>({});
  const [savingExplanation, setSavingExplanation] = useState<Record<string, boolean>>({});
  const [dbOverrides, setDbOverrides] = useState<Record<string, string>>({});
  const [selectedLang, setSelectedLang] = useState<'english' | 'hindi' | 'bilingual'>('bilingual');

  useEffect(() => {
    if (attempt) {
      const savedLang = (attempt as any).language;
      if (savedLang === 'english' || savedLang === 'hindi') {
        setSelectedLang(savedLang);
      }
    }
  }, [attempt]);

  const splitText = (text: string) => {
    if (!text) return '';
    if (selectedLang === 'bilingual') return text;
    const lines = text.split('\n');
    const processedLines = lines.map(line => {
      const parts = line.split(' / ');
      if (parts.length > 1) {
        return selectedLang === 'english' ? parts[0].trim() : parts[1].trim();
      }
      return line;
    });
    return processedLines.join('\n');
  };

  const handleGenerateAiExplanation = async (q: any) => {
    setLoadingAiExplanation(prev => ({ ...prev, [q.id]: true }));
    try {
      const res = await fetch('/api/ai/explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questionText: q.text,
          options: q.options,
          correctIndex: q.correctIndex,
          sectionName: q.sectionName
        })
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.explanation) {
          setAiExplanations(prev => ({ ...prev, [q.id]: data.explanation }));
        } else {
          alert('API Error: ' + (data.error || 'Failed to generate explanation.'));
        }
      } else {
        alert('Server returned an error generating solution.');
      }
    } catch (err: any) {
      alert('Error: ' + err.message);
    } finally {
      setLoadingAiExplanation(prev => ({ ...prev, [q.id]: false }));
    }
  };

  const handleSaveDefaultExplanation = async (qId: string, explanation: string) => {
    setSavingExplanation(prev => ({ ...prev, [qId]: true }));
    try {
      const res = await fetch('/api/admin/update-explanation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ questionId: qId, newExplanation: explanation })
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setLocalExplanations(prev => ({ ...prev, [qId]: explanation }));
          // Clear generated view
          setAiExplanations(prev => {
            const next = { ...prev };
            delete next[qId];
            return next;
          });
          alert('सफलता: व्याख्या को डेटाबेस में डिफ़ॉल्ट के रूप में सहेज लिया गया है!');
        } else {
          alert('त्रुटि: ' + data.error);
        }
      } else {
        alert('डेटाबेस अपडेट करने में विफल रहा।');
      }
    } catch (err: any) {
      alert('त्रुटि: ' + err.message);
    } finally {
      setSavingExplanation(prev => ({ ...prev, [qId]: false }));
    }
  };

  // Load database explanation overrides on mount
  useEffect(() => {
    async function fetchOverrides() {
      try {
        const res = await fetch('/api/questions/overrides');
        if (res.ok) {
          const data = await res.json();
          if (data.success && data.overrides) {
            setDbOverrides(data.overrides);
          }
        }
      } catch (err) {
        console.error('Failed to load explanation overrides:', err);
      }
    }
    fetchOverrides();
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function loadAttempt() {
      // 1. Try to fetch from local storage
      const storedAttempts = JSON.parse(localStorage.getItem('mock_attempts') || '[]');
      let currentAttempt = storedAttempts.find((a: TestAttempt) => a.id === resultId);

      // 2. Fall back to initial mock history
      if (!currentAttempt) {
        currentAttempt = INITIAL_ATTEMPTS.find(a => a.id === resultId);
      }

      // 3. Check database if not found locally
      if (!currentAttempt) {
        try {
          const res = await fetch(`/api/user/attempts?id=${resultId}`);
          if (res.ok) {
            const data = await res.json();
            if (data.success && data.attempt) {
              currentAttempt = data.attempt;
            }
          }
        } catch (err) {
          console.error("Failed to fetch attempt from database:", err);
        }
      }

      if (currentAttempt && isMounted) {
        setAttempt(currentAttempt);

        // Seed calculation to keep total candidates and rank consistent per attempt ID
        let seed = 0;
        for (let i = 0; i < currentAttempt.id.length; i++) {
          seed += currentAttempt.id.charCodeAt(i);
        }
        const virtualTotal = 8400 + (seed % 340);
        setTotalCandidates(virtualTotal);

        // Calculate rank based on percentile
        const p = currentAttempt.percentile;
        const fractionAbove = 1 - p / 100;
        const rank = Math.max(1, Math.round(fractionAbove * virtualTotal));
        setUserRank(rank);
      }
    }

    loadAttempt();

    return () => {
      isMounted = false;
    };
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

  let correctCount = 0;
  let incorrectCount = 0;
  let unattemptedCount = 0;

  if (attempt.responses && attempt.responses.length > 0) {
    attempt.responses.forEach(res => {
      const q = questions.find(question => question.id === res.questionId);
      if (q) {
        if (res.selectedIndex === -1) {
          unattemptedCount++;
        } else if (res.selectedIndex === q.correctIndex) {
          correctCount++;
        } else {
          incorrectCount++;
        }
      }
    });
  } else {
    // Estimate based on score and accuracy for historical attempts
    const totalQ = questions.length || test.questionCount || 100;
    const scoreFraction = test.totalMarks > 0 ? attempt.score / test.totalMarks : 0;
    correctCount = Math.round(totalQ * scoreFraction);
    const accuracyFraction = attempt.accuracy / 100;
    const attempted = accuracyFraction > 0 ? Math.round(correctCount / accuracyFraction) : correctCount;
    incorrectCount = Math.max(0, attempted - correctCount);
    unattemptedCount = Math.max(0, totalQ - correctCount - incorrectCount);
  }

  const formatSeconds = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins}m ${secs}s`;
  };

  const getLeaderboard = () => {
    // Seeded random generator to keep leaderboard content identical for the same attempt ID
    let seed = 0;
    for (let i = 0; i < attempt.id.length; i++) {
      seed += attempt.id.charCodeAt(i);
    }
    
    const random = (s: number) => {
      const x = Math.sin(s) * 10000;
      return x - Math.floor(x);
    };

    // Realistic candidate names for leaderboard (focused on HSSC / general competitive exams)
    const candidateNames = [
      "Manjeet Singh", "Sanjay Kumar", "Vikram Yadav", "Priyanka Sharma",
      "Amit Chaudhary", "Karan Dahiya", "Jyoti Phogat", "Sandhya Hooda",
      "Manish Punia", "Deepak Ahlawat", "Pooja Malik", "Preeti Sheoran"
    ];

    const list = [];
    const isHssc = test.examId === 'exam-hssc-police';

    // Rank 1
    const n1 = candidateNames[seed % candidateNames.length];
    const topMult = isHssc ? 0.84 : 0.93;
    const s1 = Math.round((test.totalMarks * (topMult + random(seed) * 0.04)) * 10) / 10;
    const t1 = Math.round(test.duration * 60 * (0.55 + random(seed + 1) * 0.15));
    list.push({ rank: 1, name: n1, score: s1, accuracy: 96, time: t1, isUser: false });

    // Rank 2
    const n2 = candidateNames[(seed + 1) % candidateNames.length];
    const secondMult = isHssc ? 0.80 : 0.88;
    const s2 = Math.round((test.totalMarks * (secondMult + random(seed + 2) * 0.03)) * 10) / 10;
    const t2 = Math.round(test.duration * 60 * (0.65 + random(seed + 3) * 0.1));
    list.push({ rank: 2, name: n2, score: s2, accuracy: 92, time: t2, isUser: false });

    // Rank 3
    const n3 = candidateNames[(seed + 2) % candidateNames.length];
    const thirdMult = isHssc ? 0.77 : 0.84;
    const s3 = Math.round((test.totalMarks * (thirdMult + random(seed + 4) * 0.02)) * 10) / 10;
    const t3 = Math.round(test.duration * 60 * (0.7 + random(seed + 5) * 0.1));
    list.push({ rank: 3, name: n3, score: s3, accuracy: 88, time: t3, isUser: false });

    // Rank 4
    const n4 = candidateNames[(seed + 3) % candidateNames.length];
    const fourthMult = isHssc ? 0.74 : 0.80;
    const s4 = Math.round((test.totalMarks * (fourthMult + random(seed + 6) * 0.02)) * 10) / 10;
    const t4 = Math.round(test.duration * 60 * (0.75 + random(seed + 7) * 0.1));
    list.push({ rank: 4, name: n4, score: s4, accuracy: 84, time: t4, isUser: false });

    const userTime = attempt.submittedAt 
      ? Math.round((new Date(attempt.submittedAt).getTime() - new Date(attempt.startedAt).getTime()) / 1000)
      : 0;

    const userEntry = {
      rank: userRank,
      name: "You (Aspirant)",
      score: attempt.score,
      accuracy: attempt.accuracy,
      time: userTime,
      isUser: true
    };

    if (userRank <= 4) {
      list.push(userEntry);
      list.sort((a, b) => a.rank - b.rank);
      // Ensure ranks are sequentially displayed
      list.forEach((entry, idx) => {
        if (!entry.isUser) {
          entry.rank = idx + 1;
        }
      });
      return list.slice(0, 5);
    } else {
      return [...list, userEntry];
    }
  };

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
          href={`/exam/ssc-cgl`}
          className="border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs px-5 py-2.5 rounded-lg font-bold transition-all shadow-sm flex items-center justify-center gap-1.5 self-start"
        >
          ← Practice More Mocks
        </Link>
      </div>

      {/* 2. Core Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 mb-8">
        {/* Score Card */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Score Obtained</p>
          <div className="mt-4 flex items-baseline gap-1">
            <span className="text-3xl font-extrabold text-blue-600">{attempt.score}</span>
            <span className="text-xs text-slate-400 font-semibold">/ {test.totalMarks} Marks</span>
          </div>
          <p className="text-[10px] text-slate-400 mt-2 font-medium">Scaled score logic applied</p>
        </div>

        {/* Rank Card */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">All India Rank</p>
          <div className="mt-4 flex items-baseline gap-1">
            <span className="text-3xl font-extrabold text-amber-600">#{userRank.toLocaleString()}</span>
            <span className="text-xs text-slate-400 font-semibold">/ {totalCandidates.toLocaleString()}</span>
          </div>
          <p className="text-[10px] text-slate-400 mt-2 font-medium">Rank based on percentile rating</p>
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

        {/* Accuracy Card */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Accuracy</p>
          <div className="mt-4 flex items-baseline gap-1">
            <span className="text-3xl font-extrabold text-emerald-600">{attempt.accuracy}%</span>
          </div>
          <div className="mt-2 text-[10px] font-semibold text-slate-500 space-y-0.5 border-t border-slate-100 pt-2">
            <div className="flex justify-between">
              <span className="text-emerald-600">Correct:</span>
              <span className="font-bold text-slate-700">{correctCount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-red-500">Incorrect:</span>
              <span className="font-bold text-slate-700">{incorrectCount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Unattempted:</span>
              <span className="font-bold text-slate-700">{unattemptedCount}</span>
            </div>
          </div>
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

          <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-slate-600 font-bold">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full"></span>
              Correct: {correctCount}
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 bg-rose-500 rounded-full"></span>
              Incorrect: {incorrectCount}
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 bg-slate-300 rounded-full"></span>
              Unattempted: {unattemptedCount}
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

      {/* 4.5. Leaderboard Section */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden p-6 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <div>
            <h3 className="font-extrabold text-slate-800 text-sm sm:text-base flex items-center gap-1.5">
              🏆 Mock Test Leaderboard
            </h3>
            <p className="text-[10px] sm:text-xs text-slate-400 mt-0.5 font-medium">
              Top performers and your relative standing in this mock test.
            </p>
          </div>
          <span className="text-[10px] font-bold text-slate-500 bg-slate-50 border border-slate-200 px-3 py-1 rounded-lg self-start">
            Total Applicants: {totalCandidates.toLocaleString()}
          </span>
        </div>

        <div className="overflow-x-auto scrollbar-none">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider text-[9px] sm:text-[10px]">
                <th className="py-3 px-2 sm:px-4 w-14 sm:w-16">Rank</th>
                <th className="py-3 px-2 sm:px-4">Candidate Name</th>
                <th className="py-3 px-2 sm:px-4 text-center">Score</th>
                <th className="py-3 px-2 sm:px-4 text-center">Accuracy</th>
                <th className="py-3 px-2 sm:px-4 text-right">Time Taken</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
              {getLeaderboard().map((entry, i, arr) => {
                const showDotsBefore = entry.isUser && entry.rank > 4 && i === arr.length - 1;
                
                return (
                  <tr 
                    key={entry.isUser ? 'user' : `leader-${entry.rank}`}
                    className={`hover:bg-slate-50/50 transition-colors ${
                      entry.isUser 
                        ? 'bg-blue-50/70 text-blue-900 border-y border-blue-100 hover:bg-blue-50' 
                        : ''
                    }`}
                  >
                    <td className="py-3 px-2 sm:px-4">
                      {entry.rank === 1 ? (
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-amber-100 text-amber-800 text-[10px] font-extrabold border border-amber-200">
                          🥇
                        </span>
                      ) : entry.rank === 2 ? (
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-100 text-slate-800 text-[10px] font-extrabold border border-slate-200">
                          🥈
                        </span>
                      ) : entry.rank === 3 ? (
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-orange-100 text-orange-800 text-[10px] font-extrabold border border-orange-200">
                          🥉
                        </span>
                      ) : (
                        <span className="pl-1 sm:pl-2">#{entry.rank}</span>
                      )}
                    </td>
                    <td className="py-3 px-2 sm:px-4">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="truncate max-w-[120px] sm:max-w-none">{entry.name}</span>
                        {entry.isUser && (
                          <span className="text-[8px] bg-blue-600 text-white font-extrabold px-1 py-0.5 rounded uppercase tracking-wide">
                            You
                          </span>
                        )}
                        {showDotsBefore && (
                          <span className="text-[8px] bg-amber-500 text-white font-extrabold px-1 py-0.5 rounded uppercase tracking-wide ml-1">
                            Your Rank
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-2 sm:px-4 text-center font-extrabold">
                      {entry.score} <span className="text-[9px] text-slate-400 font-normal">/ {test.totalMarks}</span>
                    </td>
                    <td className="py-3 px-2 sm:px-4 text-center">
                      <span className={`px-1.5 py-0.5 rounded-full text-[9px] font-bold ${
                        entry.accuracy >= 85 
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}>
                        {entry.accuracy}%
                      </span>
                    </td>
                    <td className="py-3 px-2 sm:px-4 text-right text-slate-500 font-mono text-[10px] sm:text-[11px]">
                      {formatSeconds(entry.time)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. Question & Explanation Accordion */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="border-b border-slate-200 bg-slate-50/50 px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <h3 className="font-bold text-slate-800 text-sm">
            Question Paper Review & Step-by-Step Solutions
          </h3>
          <div className="flex bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-[10px] font-bold self-start sm:self-auto">
            <button
              onClick={() => setSelectedLang('bilingual')}
              className={`px-2.5 py-1 rounded transition-all cursor-pointer ${
                selectedLang === 'bilingual' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Bilingual
            </button>
            <button
              onClick={() => setSelectedLang('english')}
              className={`px-2.5 py-1 rounded transition-all cursor-pointer ${
                selectedLang === 'english' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              English
            </button>
            <button
              onClick={() => setSelectedLang('hindi')}
              className={`px-2.5 py-1 rounded transition-all cursor-pointer ${
                selectedLang === 'hindi' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              हिंदी
            </button>
          </div>
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
                <p className="text-slate-800 text-sm font-semibold mb-4 leading-relaxed whitespace-pre-wrap">
                  {renderFormattedText(splitText(q.text))}
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
                        <span className="text-slate-700">{splitText(opt)}</span>
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
                    <div className="mt-3.5 space-y-4">
                      {/* Default Solution */}
                      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600 leading-relaxed shadow-inner">
                        <div className="flex justify-between items-center mb-1.5">
                          <p className="font-bold text-slate-800">Detailed Answer Explanation:</p>
                          <button
                            onClick={() => handleGenerateAiExplanation(q)}
                            disabled={loadingAiExplanation[q.id]}
                            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-[10px] px-2.5 py-1 rounded font-bold shadow-sm disabled:opacity-50 transition-all flex items-center gap-1 active:scale-95 cursor-pointer"
                          >
                            {loadingAiExplanation[q.id] ? (
                              <>
                                <span className="animate-spin">⏳</span> Generating...
                              </>
                            ) : (
                              <>
                                <span>✨ Explain with AI</span>
                              </>
                            )}
                          </button>
                        </div>
                        <p className="mb-2.5 whitespace-pre-wrap">
                          {renderFormattedText(splitText(localExplanations[q.id] || dbOverrides[q.id] || q.explanation))}
                        </p>
                        <p className="text-[10px] text-slate-400 font-medium">
                          Section topic tags: {q.sectionName} &gt; {idx % 2 === 0 ? 'Algebra Arithmetic' : 'Reasoning Aptitude'}
                        </p>
                      </div>

                      {/* AI Generated View */}
                      {aiExplanations[q.id] && (
                        <div className="p-4 bg-blue-50/50 border border-blue-200 rounded-xl text-xs text-slate-700 leading-relaxed shadow-sm space-y-3">
                          <div className="flex items-center gap-1 text-blue-800 font-bold">
                            <span>💡</span> AI-Generated Detailed Solution:
                          </div>
                          <div className="whitespace-pre-wrap bg-white/70 p-3 rounded-lg border border-blue-100 shadow-inner">
                            {renderFormattedText(aiExplanations[q.id])}
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleSaveDefaultExplanation(q.id, aiExplanations[q.id])}
                              disabled={savingExplanation[q.id]}
                              className="bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] px-3 py-1.5 rounded font-bold transition-all disabled:opacity-50 flex items-center gap-1 active:scale-95 cursor-pointer"
                            >
                              {savingExplanation[q.id] ? 'Saving...' : '💾 Use as Default (डेटाबेस में सहेजें)'}
                            </button>
                            <button
                              onClick={() => {
                                setAiExplanations(prev => {
                                  const next = { ...prev };
                                  delete next[q.id];
                                  return next;
                                });
                              }}
                              className="border border-slate-300 hover:bg-slate-100 text-slate-600 text-[10px] px-3 py-1.5 rounded font-bold transition-all active:scale-95 cursor-pointer"
                            >
                              ✕ Dismiss
                            </button>
                          </div>
                        </div>
                      )}
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
