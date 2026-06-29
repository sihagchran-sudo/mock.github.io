'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState, use, useRef } from 'react';
import { getTestById, getQuestionsForTest, gradeTestAttempt, UserResponse } from '@/mockData';
import { useSession } from 'next-auth/react';

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

export default function TestInterfacePage() {
  const params = useParams();
  const router = useRouter();
  const testId = params.testId as string;
  const { data: session } = useSession();

  const test = getTestById(testId);
  const questions = getQuestionsForTest(testId);

  // States
  const [currentIdx, setCurrentIdx] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0); // seconds
  const [timeUsed, setTimeUsed] = useState(0);
  const [responses, setResponses] = useState<UserResponse[]>([]);
  const [visited, setVisited] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const isSubmittingRef = useRef(false);

  // Sync isSubmittingRef with isSubmitting state
  useEffect(() => {
    isSubmittingRef.current = isSubmitting;
  }, [isSubmitting]);

  // Warning on refresh or tab close
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isSubmittingRef.current) return;
      e.preventDefault();
      e.returnValue = 'Are you sure you want to leave? Your progress will not be saved.';
      return e.returnValue;
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  // Warning on back button navigation
  useEffect(() => {
    // Push an extra state in history to capture the back action
    window.history.pushState(null, '', window.location.href);

    const handlePopState = () => {
      if (isSubmittingRef.current) return;

      const confirmExit = window.confirm("क्या आप टेस्ट छोड़ना चाहते हैं? / Are you sure you want to exit the test? (Your progress will not be saved)");
      if (confirmExit) {
        isSubmittingRef.current = true; // Bypass any further unload triggers
        router.push('/');
      } else {
        // Put the state back in history to keep user on the page
        window.history.pushState(null, '', window.location.href);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [router]);

  const handleExit = () => {
    const confirmExit = window.confirm("क्या आप टेस्ट छोड़ना चाहते हैं? / Are you sure you want to exit the test? (Your progress will not be saved)");
    if (confirmExit) {
      isSubmittingRef.current = true;
      router.push('/');
    }
  };

  // Sync fullscreen state
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        }
      }
    } catch (err) {
      console.error('Error attempting to toggle fullscreen:', err);
    }
  };

  // Initialize timer and responses
  useEffect(() => {
    if (test && questions.length > 0) {
      setTimeLeft(test.duration * 60);
      const initialResponses = questions.map(q => ({
        questionId: q.id,
        selectedIndex: -1,
        isMarkedForReview: false
      }));
      setResponses(initialResponses);
      
      // Mark first question as visited
      setVisited({ [questions[0].id]: true });
    }
  }, [testId]);

  // Tick timer
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit(true); // Auto-submit
          return 0;
        }
        return prev - 1;
      });
      setTimeUsed(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  if (!test || questions.length === 0) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm max-w-sm text-center">
          <span className="text-3xl">⚠️</span>
          <h2 className="text-lg font-bold text-slate-800 mt-4">Invalid Test ID</h2>
          <button onClick={() => router.push('/')} className="mt-4 bg-blue-600 text-white text-sm px-4 py-2 rounded-lg">
            Return Home
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentIdx];
  const currentResponse = responses.find(r => r.questionId === currentQuestion.id) || {
    questionId: currentQuestion.id,
    selectedIndex: -1,
    isMarkedForReview: false
  };

  // Get active section name based on current question
  const activeSection = currentQuestion.sectionName;
  const sections = Array.from(new Set(questions.map(q => q.sectionName)));

  // Navigation handlers
  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      const nextId = questions[currentIdx + 1].id;
      setVisited(prev => ({ ...prev, [nextId]: true }));
      setCurrentIdx(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx(prev => prev - 1);
    }
  };

  const handleSelectOption = (optIdx: number) => {
    setResponses(prev =>
      prev.map(res =>
        res.questionId === currentQuestion.id ? { ...res, selectedIndex: optIdx } : res
      )
    );
  };

  const handleClearResponse = () => {
    setResponses(prev =>
      prev.map(res =>
        res.questionId === currentQuestion.id ? { ...res, selectedIndex: -1 } : res
      )
    );
  };

  const handleMarkReview = () => {
    setResponses(prev =>
      prev.map(res =>
        res.questionId === currentQuestion.id ? { ...res, isMarkedForReview: true } : res
      )
    );
    handleNext();
  };

  const handleQuestionSelect = (idx: number) => {
    const qId = questions[idx].id;
    setVisited(prev => ({ ...prev, [qId]: true }));
    setCurrentIdx(idx);
    setIsSidebarOpen(false); // Close sidebar on mobile when a question is selected
  };

  const handleSectionSelect = (section: string) => {
    const targetIdx = questions.findIndex(q => q.sectionName === section);
    if (targetIdx !== -1) {
      const qId = questions[targetIdx].id;
      setVisited(prev => ({ ...prev, [qId]: true }));
      setCurrentIdx(targetIdx);
    }
  };

  const handleSubmit = async (autoSubmit = false) => {
    if (!autoSubmit && !window.confirm('Are you sure you want to submit your mock test?')) {
      return;
    }
    setIsSubmitting(true);
    const attempt = gradeTestAttempt(test.id, responses, timeUsed);
    if (session?.user?.email) {
      attempt.userId = session.user.email;
    }
    
    // Save attempt to local storage so analytics page can load it
    const pastAttempts = JSON.parse(localStorage.getItem('mock_attempts') || '[]');
    pastAttempts.unshift(attempt);
    localStorage.setItem('mock_attempts', JSON.stringify(pastAttempts));
    
    // Sync to database if logged in
    if (session?.user?.email) {
      try {
        await fetch('/api/user/attempts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(attempt),
        });
      } catch (err) {
        console.error("Failed to sync attempt to database:", err);
      }
    }
    
    // Redirect to analytics
    router.push(`/analytics/${attempt.id}`);
  };

  // Helper formatting for timer
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Helper color-codes for palette buttons
  const getPaletteStatus = (qId: string) => {
    const res = responses.find(r => r.questionId === qId);
    if (!res) return 'unvisited';
    if (res.isMarkedForReview) return 'marked';
    if (res.selectedIndex !== -1) return 'answered';
    if (visited[qId]) return 'unanswered';
    return 'unvisited';
  };

  const getPaletteClass = (qId: string, active: boolean) => {
    const base = 'w-9 h-9 rounded-md text-xs font-semibold flex items-center justify-center transition-all duration-150 ';
    const border = active ? 'ring-2 ring-blue-600 scale-105' : 'hover:opacity-85';
    
    const status = getPaletteStatus(qId);
    let colors = '';
    switch (status) {
      case 'answered':
        colors = 'bg-emerald-500 text-white border border-emerald-600';
        break;
      case 'unanswered':
        colors = 'bg-red-500 text-white border border-red-600';
        break;
      case 'marked':
        colors = 'bg-purple-600 text-white border border-purple-700';
        break;
      default:
        colors = 'bg-slate-100 text-slate-600 border border-slate-300';
    }
    return `${base} ${colors} ${border}`;
  };

  return (
    <div className="min-h-screen bg-slate-50 select-none flex flex-col h-screen overflow-hidden">
      {/* 1. Header Bar (Distraction Free) */}
      <header className="bg-slate-800 text-white px-3 sm:px-6 h-14 flex items-center justify-between border-b border-slate-900 sticky top-0 z-40 shrink-0">
        <div className="flex items-center gap-3">
          <span className="font-bold text-sm sm:text-base tracking-wide bg-gradient-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent truncate max-w-[100px] xs:max-w-[150px] sm:max-w-none">
            {test.title}
          </span>
          <button
            onClick={handleExit}
            className="text-[10px] sm:text-xs bg-red-600/30 hover:bg-red-600 border border-red-500/50 hover:border-red-500 text-red-200 hover:text-white px-2 py-0.5 rounded transition-all active:scale-95 cursor-pointer font-bold"
          >
            Exit Test
          </button>
        </div>

        {/* Timer Box */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Fullscreen Button */}
          <button
            onClick={toggleFullscreen}
            className="hidden sm:flex text-xs bg-slate-700/80 hover:bg-slate-600 text-slate-200 border border-slate-600 px-3 py-1.5 rounded-lg font-bold transition-all items-center gap-1.5 active:scale-95 shadow-sm"
          >
            {isFullscreen ? (
              <>
                <span>Exit Fullscreen</span>
                <span>🗖</span>
              </>
            ) : (
              <>
                <span>Fullscreen</span>
                <span>🖥️</span>
              </>
            )}
          </button>

          <div className="flex items-center gap-1 bg-slate-700/80 px-2 py-1.5 sm:px-3 sm:py-1.5 rounded-lg border border-slate-600">
            <span className="text-[10px] sm:text-xs text-slate-300">Time:</span>
            <span className="font-mono text-sm sm:text-base font-extrabold text-amber-400 tracking-wider">
              {formatTime(timeLeft)}
            </span>
          </div>
          <button
            onClick={() => handleSubmit(false)}
            disabled={isSubmitting}
            className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white px-3 py-1.5 sm:px-5 sm:py-2 rounded-lg text-xs sm:text-sm font-bold shadow-sm transition-all hover:shadow active:scale-95"
          >
            Submit
          </button>
        </div>
      </header>

      {/* 2. Sub-Header: Section Selectors */}
      <div className="bg-slate-100 border-b border-slate-200 px-3 sm:px-6 py-2 flex items-center justify-start gap-2 overflow-x-auto scrollbar-none shrink-0">
        <span className="text-[10px] sm:text-xs text-slate-500 font-bold uppercase tracking-wider mr-2 sm:mr-4 whitespace-nowrap">Sections:</span>
        {sections.map(sec => {
          const isActive = activeSection === sec;
          return (
            <button
              key={sec}
              onClick={() => handleSectionSelect(sec)}
              className={`px-3 py-1 sm:px-4 sm:py-1.5 rounded-lg text-[10px] sm:text-xs font-bold border transition-colors whitespace-nowrap ${
                isActive
                  ? 'bg-blue-600 text-white border-blue-700'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {sec}
            </button>
          );
        })}
      </div>

      {/* 3. Main Split Panel Layout */}
      <div className="flex-grow flex flex-col md:flex-row overflow-hidden relative">
        {/* Left Pane: Question Area */}
        <div className="flex-grow flex flex-col p-4 sm:p-6 overflow-y-auto w-full md:max-w-[75%] h-[calc(100vh-10.5rem)]">
          <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-6 flex-grow shadow-sm flex flex-col justify-between">
            <div>
              {/* Question Header & Section */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4 sm:mb-6">
                <span className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-widest bg-slate-50 border border-slate-200 px-2 py-0.5 sm:px-3 sm:py-1 rounded-md">
                  {currentQuestion.sectionName}
                </span>
                <span className="text-xs sm:text-sm font-bold text-blue-600 bg-blue-50 px-2 py-0.5 sm:px-3 sm:py-1 rounded-md border border-blue-100">
                  Question {currentIdx + 1} of {questions.length}
                </span>
              </div>

              {/* Question Text */}
              <div className="text-slate-800 text-sm sm:text-base font-semibold leading-relaxed mb-6 sm:mb-8 whitespace-pre-wrap">
                {renderFormattedText(currentQuestion.text)}
              </div>

              {/* Options List */}
              <div className="space-y-2.5 sm:space-y-3.5">
                {currentQuestion.options.map((opt, oIdx) => {
                  const isSelected = currentResponse.selectedIndex === oIdx;
                  return (
                    <button
                      key={oIdx}
                      onClick={() => handleSelectOption(oIdx)}
                      className={`w-full text-left p-3.5 sm:p-4 rounded-xl border-2 transition-all flex items-center gap-3 font-medium text-xs sm:text-sm leading-relaxed ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50/50 text-blue-900 shadow-sm'
                          : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/20 text-slate-700'
                      }`}
                    >
                      <span className={`w-5 h-5 shrink-0 rounded-full border-2 flex items-center justify-center text-[10px] sm:text-xs font-bold transition-all ${
                        isSelected ? 'border-blue-600 bg-blue-600 text-white' : 'border-slate-300 text-slate-400'
                      }`}>
                        {String.fromCharCode(65 + oIdx)}
                      </span>
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Backdrop for Mobile Sidebar Drawer */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-slate-900/50 z-40 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Right Pane: Question Palette & Profile */}
        <aside
          className={`fixed inset-y-0 right-0 z-50 w-72 bg-white border-l border-slate-200 flex flex-col shrink-0 transition-transform duration-350 ease-in-out md:static md:translate-x-0 md:w-80 md:h-[calc(100vh-10.5rem)] ${
            isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Mobile Close Button in Sidebar Header */}
          <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between md:hidden">
            <span className="font-bold text-xs text-slate-500 uppercase">Question Palette</span>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="text-red-500 hover:text-red-600 text-xs font-extrabold focus:outline-none p-1"
            >
              ✕ Close
            </button>
          </div>

          {/* Candidate Card */}
          <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-extrabold text-sm border-2 border-white shadow-md">
              JD
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800">John Doe (Candidate)</p>
              <p className="text-[10px] text-slate-400 font-medium">Roll: #2026MOCK105</p>
            </div>
          </div>

          {/* Palette Status Keys */}
          <div className="p-4 grid grid-cols-2 gap-2 border-b border-slate-100 text-[9px] font-bold text-slate-500 uppercase tracking-wide bg-slate-50/50">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 bg-emerald-500 border border-emerald-600 rounded"></span>
              Answered
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 bg-red-500 border border-red-600 rounded"></span>
              Not Answered
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 bg-purple-600 border border-purple-700 rounded"></span>
              Marked
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 bg-slate-100 border border-slate-300 rounded"></span>
              Not Visited
            </div>
          </div>

          {/* Palette Grid */}
          <div className="p-4 flex-grow overflow-y-auto">
            <p className="text-xs font-bold text-slate-500 uppercase mb-3">Choose a Question:</p>
            <div className="grid grid-cols-5 gap-2">
              {questions.map((q, idx) => (
                <button
                  key={q.id}
                  onClick={() => handleQuestionSelect(idx)}
                  className={getPaletteClass(q.id, currentIdx === idx)}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
          </div>
        </aside>
      </div>

      {/* 4. Bottom Controls Nav Bar */}
      <footer className="bg-white border-t border-slate-200 h-18 px-3 sm:px-6 flex items-center justify-between sticky bottom-0 z-40 shrink-0 gap-2">
        <div className="flex space-x-1.5 sm:space-x-3">
          {/* Mobile Sidebar Toggle Button */}
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="md:hidden border border-blue-200 text-blue-600 bg-blue-50/50 hover:bg-blue-50 text-[10px] sm:text-xs px-2.5 py-2 rounded-lg font-bold transition-all active:scale-95 flex items-center gap-1 whitespace-nowrap"
          >
            <span>📋</span>
            <span>Palette</span>
          </button>
          
          <button
            onClick={handleMarkReview}
            className="border-2 border-purple-500 text-purple-700 hover:bg-purple-50 text-[10px] sm:text-xs px-2.5 py-2 sm:px-4 sm:py-2.5 rounded-lg font-bold transition-all active:scale-95 whitespace-nowrap"
          >
            <span className="hidden sm:inline">Mark for </span>Review<span className="hidden sm:inline"> & Next</span>
          </button>
          <button
            onClick={handleClearResponse}
            className="border border-slate-200 text-slate-600 hover:bg-slate-50 text-[10px] sm:text-xs px-2.5 py-2 sm:px-4 sm:py-2.5 rounded-lg font-bold transition-all active:scale-95 whitespace-nowrap"
          >
            Clear<span className="hidden sm:inline"> Response</span>
          </button>
        </div>

        <div className="flex space-x-1.5 sm:space-x-3">
          <button
            onClick={handlePrev}
            disabled={currentIdx === 0}
            className="bg-white border border-slate-300 hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-white text-slate-700 text-[10px] sm:text-xs px-2.5 py-2 sm:px-5 sm:py-2.5 rounded-lg font-bold transition-all active:scale-95 flex items-center gap-0.5 whitespace-nowrap"
          >
            ← Prev<span className="hidden sm:inline">ious</span>
          </button>
          <button
            onClick={handleNext}
            disabled={currentIdx === questions.length - 1}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:hover:bg-blue-600 text-white text-[10px] sm:text-xs px-2.5 py-2 sm:px-5 sm:py-2.5 rounded-lg font-bold transition-all hover:shadow active:scale-95 flex items-center gap-0.5 whitespace-nowrap"
          >
            Next →
          </button>
        </div>
      </footer>
    </div>
  );
}
