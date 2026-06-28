'use client';

import { useState } from 'react';
import Link from 'next/link';
import { EXAMS } from '@/mockData';
import { BlogArticle } from '@/blogData';

interface BlogTemplateClientProps {
  blog: BlogArticle;
}

const EXAM_ICONS: Record<string, string> = {
  'ssc-cgl': '✍️',
  'ssc-chsl': '📝',
  'ssc-mts': '📋',
  'ssc-gd-constable': '👮',
  'ssc-cpo': '👮',
  'ssc-stenographer': '✍️',
  'ssc-je': '⚙️',
  'hssc-police-constable': '👮',
  'hssc-cet': '📋',
  'up-police-constable': '🚓',
  'up-police-si': '🚓',
  'delhi-police-constable': '👮',
  'bihar-police-constable': '👮',
  'rajasthan-police-constable': '👮',
  'ctet': '🎓',
  'htet': '🏫',
  'rrb-ntpc': '🚆',
  'rrb-group-d': '🛤️',
  'rrb-alp': '🚂',
  'rpf-si': '👮',
};

function ParagraphText({ text }: { text: string }) {
  // Sort exams by length descending to match longer names first
  const sortedExams = [...EXAMS].sort((a, b) => b.name.length - a.name.length);
  
  let parts: (string | React.ReactNode)[] = [text];
  
  for (const exam of sortedExams) {
    const nextParts: (string | React.ReactNode)[] = [];
    for (const part of parts) {
      if (typeof part !== 'string') {
        nextParts.push(part);
        continue;
      }
      
      const regex = new RegExp(`\\b(${exam.name})\\b`, 'gi');
      const splitText = part.split(regex);
      if (splitText.length <= 1) {
        nextParts.push(part);
        continue;
      }
      
      for (let i = 0; i < splitText.length; i++) {
        if (i % 2 === 1) {
          nextParts.push(
            <Link key={`${exam.slug}-${i}`} href={`/exam/${exam.slug}`} className="text-blue-600 hover:underline font-extrabold">
              {splitText[i]}
            </Link>
          );
        } else {
          if (splitText[i] !== '') {
            nextParts.push(splitText[i]);
          }
        }
      }
    }
    parts = nextParts;
  }
  
  return (
    <p className="text-slate-650 text-xs sm:text-sm leading-relaxed font-semibold">
      {parts}
    </p>
  );
}

export default function BlogTemplateClient({ blog }: BlogTemplateClientProps) {
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setOpenFaqIdx(openFaqIdx === idx ? null : idx);
  };

  // Resolve related exams list
  const relatedExamsList = (blog.relatedExams || [])
    .map(slug => EXAMS.find(e => e.slug === slug))
    .filter(Boolean) as any[];

  return (
    <div className="min-h-screen bg-slate-50/50 py-10 px-4 sm:px-6 lg:px-8 pb-24 md:pb-12">
      <div className="max-w-6xl mx-auto">
        
        {/* 1. BREADCRUMB */}
        <nav className="flex items-center gap-2 text-xs font-bold text-slate-500 mb-6 text-left">
          <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-slate-400">Blog</span>
          <span>/</span>
          <Link href={`/exam/${blog.examSlug}`} className="hover:text-blue-600 transition-colors">{blog.examName}</Link>
        </nav>

        {/* 2. HERO SECTION */}
        <section className="bg-hero text-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl mb-8 relative overflow-hidden text-left">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center justify-between">
            <div className="flex-1 space-y-4">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="bg-blue-500/10 text-blue-300 text-[10px] font-bold px-3 py-1 rounded-full border border-blue-500/20 uppercase tracking-wider">
                  {blog.category}
                </span>
                {blog.authorityBadge && (
                  <span className="bg-amber-500/10 text-amber-300 text-[10px] font-bold px-3 py-1 rounded-full border border-amber-500/20 uppercase tracking-wider">
                    {blog.authorityBadge}
                  </span>
                )}
                <span className="text-[10px] text-slate-350 font-bold">⏱️ {blog.readTime}</span>
              </div>
              
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight">
                {blog.title}
              </h1>
              
              <div className="text-xs text-slate-350 font-bold flex items-center gap-1.5">
                <span>By: <strong className="text-white">{blog.authorName || 'Editorial Team'}</strong></span>
                <span>•</span>
                <span>Published: {blog.publishDate}</span>
              </div>

              <div className="pt-2">
                <Link
                  href={`/exam/${blog.examSlug}`}
                  className="inline-flex justify-center items-center bg-accent-cta hover:bg-accent-cta-hover text-white font-bold text-xs px-6 py-3.5 rounded-xl shadow-lg shadow-amber-500/25 transition-all hover:scale-102 active:scale-98 min-h-[40px] text-center cursor-pointer"
                >
                  Start free mock test
                </Link>
              </div>
            </div>

            {/* Featured Image */}
            {blog.featuredImage && (
              <div className="w-full md:w-[350px] shrink-0 rounded-2xl overflow-hidden border border-white/10 shadow-lg bg-slate-900 flex items-center justify-center">
                <img
                  src={blog.featuredImage}
                  alt={blog.featuredImageAlt || blog.title}
                  width={1200}
                  height={630}
                  loading="eager"
                  className="w-full h-auto object-cover"
                />
              </div>
            )}
          </div>
        </section>

        {/* 3. QUICK ANSWER CALLOUT */}
        {blog.quickAnswer && (
          <div className="bg-blue-50/60 border-l-4 border-blue-500 p-5 rounded-r-2xl shadow-sm mb-8 text-left">
            <span className="block text-[10px] font-black text-blue-500 uppercase tracking-widest mb-1.5">Quick Answer</span>
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-semibold">
              {blog.quickAnswer}
            </p>
          </div>
        )}

        {/* Layout Grid with Content & Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Body Content Column */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* 4. TABLE OF CONTENTS */}
            {blog.sections && blog.sections.length > 0 && (
              <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm text-left">
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Table of Contents</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5">
                  {blog.sections.map((sec, idx) => (
                    <li key={idx} className="flex items-start gap-2 min-w-0">
                      <span className="text-blue-500 text-xs mt-0.5 font-bold">#</span>
                      <a 
                        href={`#${sec.id || `sec-${idx}`}`} 
                        className="text-xs sm:text-sm font-extrabold text-slate-700 hover:text-blue-600 transition-colors line-clamp-1 truncate"
                      >
                        {sec.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* 5. BODY SECTIONS */}
            {blog.sections && blog.sections.map((sec, idx) => (
              <div key={idx} id={sec.id || `sec-${idx}`} className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm text-left scroll-mt-6">
                
                {/* Heading */}
                <h2 className="text-lg sm:text-xl font-black text-slate-900 border-b border-slate-100 pb-3 mb-5">
                  {sec.title}
                </h2>
                
                {/* Paragraphs */}
                <div className="space-y-4">
                  {sec.paragraphs && sec.paragraphs.map((p, pIdx) => (
                    <ParagraphText key={pIdx} text={p} />
                  ))}
                </div>

                {/* Styled Table Data */}
                {sec.table && (
                  <div className="overflow-x-auto my-6 border border-slate-200 rounded-2xl shadow-sm bg-white">
                    <table className="w-full text-left border-collapse text-xs sm:text-sm">
                      <thead>
                        <tr className="border-b border-slate-200 bg-slate-50 text-slate-700">
                          {sec.table.headers.map((h, i) => (
                            <th key={i} className="py-3 px-4 font-bold text-slate-800">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-slate-650 font-semibold">
                        {sec.table.rows.map((row, rIdx) => (
                          <tr key={rIdx} className="hover:bg-slate-50/30 odd:bg-slate-50/5">
                            {row.map((cell, cIdx) => (
                              <td key={cIdx} className="py-3.5 px-4">{cell}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Timeline / Stepper Component */}
                {sec.stepper && (
                  <div className="relative border-l-2 border-blue-100 pl-6 ml-4 my-7 space-y-6">
                    {sec.stepper.map((step, sIdx) => (
                      <div key={sIdx} className="relative">
                        <span className="absolute -left-[35px] top-0 flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white text-[10px] font-black border-4 border-white shadow-sm">
                          {step.stepNumber}
                        </span>
                        <div>
                          <h4 className="font-extrabold text-slate-850 text-xs sm:text-sm">{step.title}</h4>
                          <p className="text-slate-500 text-xs mt-1 font-semibold leading-relaxed">{step.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Horizontal Bar Chart (Syllabus weightage) */}
                {sec.weightageChart && (
                  <div className="space-y-4 my-7 p-5 bg-slate-50 border border-slate-200 rounded-2xl">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Subject weightage distribution</h4>
                    {sec.weightageChart.map((chartItem, cIdx) => (
                      <div key={cIdx} className="space-y-1.5">
                        <div className="flex justify-between text-xs font-bold text-slate-700">
                          <span>{chartItem.label}</span>
                          <span>{chartItem.percentage}%</span>
                        </div>
                        <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                          <div className="bg-blue-600 h-full rounded-full transition-all duration-500" style={{ width: `${chartItem.percentage}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Checklist Strategy Cards */}
                {sec.strategyCards && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-7">
                    {sec.strategyCards.map((card, cIdx) => (
                      <div key={cIdx} className="bg-emerald-50/15 border border-emerald-100/50 rounded-2xl p-5 shadow-sm hover:border-emerald-200 transition-colors flex gap-3">
                        <span className="text-emerald-500 text-lg shrink-0">✓</span>
                        <div>
                          <h4 className="font-extrabold text-slate-800 text-xs sm:text-sm">{card.title}</h4>
                          <p className="text-slate-500 text-xs mt-1.5 font-semibold leading-relaxed">{card.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Section Specific CTA */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
                  <Link
                    href={sec.sectionCtaLink || `/exam/${blog.examSlug}`}
                    className="inline-flex justify-center items-center bg-accent-cta hover:bg-accent-cta-hover text-white font-bold text-xs px-6 py-3 rounded-xl shadow-md transition-all active:scale-98 min-h-[38px] text-center"
                  >
                    <span>{sec.sectionCtaText || `Practice Mock Tests for ${blog.examName}`}</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            ))}

            {/* 6. FAQ ACCORDION SECTION */}
            {blog.faqs && blog.faqs.length > 0 && (
              <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm text-left my-8">
                <h2 className="text-lg sm:text-xl font-black text-slate-900 border-b border-slate-100 pb-3 mb-6 flex items-center gap-2">
                  ❓ Frequently Asked Questions (FAQs)
                </h2>
                <div className="space-y-3">
                  {blog.faqs.map((faq, idx) => {
                    const isOpen = openFaqIdx === idx;
                    return (
                      <div key={idx} className="border border-slate-150 rounded-2xl overflow-hidden bg-slate-50/10">
                        <button
                          onClick={() => toggleFaq(idx)}
                          className="w-full flex items-center justify-between p-4.5 text-left font-extrabold text-slate-800 hover:bg-slate-50 transition-colors text-xs sm:text-sm cursor-pointer"
                        >
                          <span>{faq.question}</span>
                          <span className="text-slate-400 font-bold transition-transform duration-200 text-xs" style={{ transform: isOpen ? 'rotate(180deg)' : 'none' }}>
                            ▼
                          </span>
                        </button>
                        {isOpen && (
                          <div className="p-4.5 border-t border-slate-150 bg-white text-xs sm:text-sm text-slate-650 leading-relaxed font-semibold">
                            {faq.answer}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* 7. RELATED EXAMS SECTION */}
            {relatedExamsList.length > 0 && (
              <section className="my-10 text-left">
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-5">Related Exams</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {relatedExamsList.map((exam) => (
                    <Link
                      key={exam.id}
                      href={`/exam/${exam.slug}`}
                      className="group bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:shadow-blue-900/5 hover:border-blue-500/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                    >
                      <div>
                        <span className="text-xl p-2.5 bg-gradient-to-br from-blue-50 to-indigo-50/50 text-blue-600 border border-blue-100 rounded-xl inline-flex items-center justify-center shrink-0 mb-3.5 group-hover:scale-105 transition-all">
                          {EXAM_ICONS[exam.slug] || '📝'}
                        </span>
                        <h4 className="font-extrabold text-slate-800 text-sm leading-snug group-hover:text-blue-600 transition-colors">
                          {exam.name}
                        </h4>
                        <p className="text-slate-500 text-[10px] mt-1.5 line-clamp-2 leading-relaxed">
                          {exam.description}
                        </p>
                      </div>
                      <div className="flex mt-4 pt-3.5 border-t border-slate-100 items-center justify-between text-[10px] text-blue-600 font-extrabold">
                        <span>Start Practice Mocks</span>
                        <span>→</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Desktop Right Sticky Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 space-y-6">
              
              {/* Sticky desktop Practice CTA */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl p-6 shadow-xl relative overflow-hidden text-left border border-white/5">
                <div className="absolute top-0 right-0 -mt-12 -mr-12 w-32 h-32 rounded-full bg-blue-500/10 blur-xl pointer-events-none"></div>
                <h3 className="text-sm font-bold mb-4 flex items-center gap-2 border-b border-white/10 pb-3">
                  🎯 Practice Center
                </h3>
                <p className="text-xs text-slate-350 leading-relaxed mb-6 font-semibold">
                  Prepare under real-time test interface parameters with customized syllabus patterns.
                </p>
                <Link
                  href={`/exam/${blog.examSlug}`}
                  className="w-full flex items-center justify-center gap-2 bg-accent-cta hover:bg-accent-cta-hover text-white font-bold text-xs py-4 px-4 rounded-xl shadow-lg hover:shadow-amber-500/10 transition-all text-center cursor-pointer min-h-[44px]"
                >
                  <span>🚀 Start {blog.examName} Mock</span>
                  <span>→</span>
                </Link>
              </div>

              {/* Trust disclaimer */}
              <div className="bg-slate-100/50 border border-slate-200 rounded-3xl p-5 text-xs text-slate-500 leading-relaxed font-medium text-left">
                <span className="font-bold text-slate-700 block mb-1">⚠️ Disclaimer:</span>
                This information has been curated from recruitment bulletins. While we make every effort to maintain accurate data, candidates are requested to verify details from official notifications.
              </div>
            </div>
          </div>
        </div>

        {/* 8. MOBILE STICKY BOTTOM BAR */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 border-t border-slate-200 p-3.5 backdrop-blur-md shadow-lg flex items-center justify-between px-6">
          <div className="text-left">
            <span className="block text-[9px] text-slate-400 font-bold uppercase tracking-wider">Practice Mocks</span>
            <span className="text-xs font-black text-slate-800 truncate max-w-[150px] block">{blog.examName}</span>
          </div>
          <Link
            href={`/exam/${blog.examSlug}`}
            className="bg-accent-cta hover:bg-accent-cta-hover text-white font-bold text-[11px] py-2.5 px-4 rounded-xl shadow-md transition-all whitespace-nowrap"
          >
            Start Mock Test
          </Link>
        </div>

      </div>
    </div>
  );
}
