import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getBlogBySlug, getBlogsByExam } from '@/blogData';

interface BlogPageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogDetailPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  const { details } = blog;
  const examBlogs = getBlogsByExam(blog.examSlug);
  const otherBlogs = examBlogs.filter(b => b.slug !== blog.slug);

  return (
    <div className="min-h-screen bg-slate-50/50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Back navigation */}
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors">
            ← All Exam Syllabuses & Blogs
          </Link>
        </div>

        {/* Blog Header Card */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-48 h-48 rounded-full bg-blue-500/5 blur-2xl pointer-events-none"></div>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs bg-blue-50 text-blue-600 font-bold px-3 py-1 rounded-full border border-blue-100 uppercase tracking-wider">
              {blog.category}
            </span>
            <span className="text-[10px] text-slate-400 font-medium">• {blog.readTime}</span>
            <span className="text-[10px] text-slate-400 font-medium">• Updated: {blog.publishDate}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
            {blog.title}
          </h1>
          <p className="text-slate-500 mt-2 text-sm sm:text-base max-w-3xl leading-relaxed">
            {blog.description}
          </p>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main content column (Left) */}
          <div className="lg:col-span-2 space-y-8">
            
            {blog.type === 'syllabus' || !blog.type ? (
              <>
                {/* Sarkari Job Summary Sheet */}
                <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
                  <h2 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-3 mb-4 flex items-center gap-2">
                    📋 Official Notification Summary
                  </h2>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Authority</span>
                      <span className="font-extrabold text-slate-700 text-sm">{details.authority}</span>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Post Name</span>
                      <span className="font-extrabold text-slate-700 text-sm">{details.postName}</span>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Eligibility Criteria</span>
                      <span className="font-semibold text-slate-600 text-xs">{details.eligibility}</span>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Age Limit</span>
                      <span className="font-extrabold text-slate-700 text-sm">{details.ageLimit}</span>
                    </div>
                  </div>
                </div>

                {/* Subject weightage pattern */}
                <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
                  <h2 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-3 mb-4 flex items-center gap-2">
                    📊 Subject-wise Marks Weightage
                  </h2>
                  <p className="text-xs text-slate-500 mb-4">
                    The mock test series for this exam is simulated exactly using this official subject schema.
                  </p>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs sm:text-sm">
                      <thead>
                        <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 font-bold">
                          <th className="py-3 px-4 rounded-l-xl">Subject / Section</th>
                          <th className="py-3 px-4 text-center">Questions</th>
                          <th className="py-3 px-4 text-center rounded-r-xl">Total Marks</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                        {details.subjects.map((sub, index) => (
                          <tr key={index} className="hover:bg-slate-50/50">
                            <td className="py-3 px-4 font-semibold text-slate-800">{sub.name}</td>
                            <td className="py-3 px-4 text-center text-slate-650">{sub.questions} Qs</td>
                            <td className="py-3 px-4 text-center font-bold text-slate-900">{sub.marks} Marks</td>
                          </tr>
                        ))}
                        <tr className="bg-blue-50/30 font-bold border-t border-slate-200">
                          <td className="py-3.5 px-4 text-blue-700">Total Pattern Scheme</td>
                          <td className="py-3.5 px-4 text-center text-blue-750">
                            {details.subjects.reduce((sum, s) => sum + s.questions, 0)} Qs
                          </td>
                          <td className="py-3.5 px-4 text-center text-blue-800 font-extrabold">
                            {details.totalMarks} Marks
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Detailed syllabus section */}
                <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
                  <h2 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-3 mb-5 flex items-center gap-2">
                    📖 Complete Syllabus Topics
                  </h2>
                  
                  <div className="space-y-6">
                    {details.fullSyllabus.map((section, idx) => (
                      <div key={idx} className="border border-slate-150 rounded-2xl p-4 sm:p-5 hover:border-slate-300 transition-colors">
                        <h3 className="font-extrabold text-slate-800 text-sm sm:text-base mb-3 flex items-center gap-2">
                          <span className="text-blue-500 text-xs">◆</span> {section.section}
                        </h3>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-600 font-medium">
                          {section.topics.map((topic, tIdx) => (
                            <li key={tIdx} className="flex items-start gap-1.5">
                              <span className="text-slate-400 mt-0.5">•</span>
                              <span>{topic}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Preparation tips */}
                <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
                  <h2 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-3 mb-4 flex items-center gap-2">
                    💡 Expert Preparation Strategy
                  </h2>
                  <ul className="space-y-3">
                    {details.prepTips.map((tip, index) => (
                      <li key={index} className="flex gap-3 text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                        <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 text-xs font-bold shrink-0">
                          {index + 1}
                        </span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            ) : (
              <>
                {/* Render custom sections (Salary or Cutoff) */}
                {blog.sections && blog.sections.map((sec, idx) => (
                  <div key={idx} className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
                    <h2 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-3 mb-4">
                      {sec.title}
                    </h2>
                    <div className="space-y-4">
                      {sec.paragraphs.map((p, pIdx) => (
                        <p key={pIdx} className="text-slate-600 text-xs sm:text-sm leading-relaxed font-semibold">
                          {p}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </>
            )}

          </div>

          {/* Sidebar column (Right) */}
          <div className="space-y-6">
            
            {/* Quick highlights card (Syllabus only) */}
            {(blog.type === 'syllabus' || !blog.type) && (
              <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl p-6 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 -mt-12 -mr-12 w-32 h-32 rounded-full bg-blue-500/10 blur-xl pointer-events-none"></div>
                
                <h3 className="text-base font-bold mb-4 flex items-center gap-2 border-b border-white/10 pb-3">
                  🎯 Exam Highlights
                </h3>
                
                <div className="space-y-3.5 text-xs">
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-slate-400">Total Marks</span>
                    <span className="font-extrabold text-blue-300">{details.totalMarks} Marks</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-slate-400">Total Questions</span>
                    <span className="font-extrabold text-blue-300">
                      {details.subjects.reduce((sum, s) => sum + s.questions, 0)} Questions
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-slate-400">Duration</span>
                    <span className="font-extrabold text-blue-300">{details.durationMinutes} Minutes</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-slate-400">Negative Marking</span>
                    <span className="font-semibold text-rose-350">{details.negativeMarking}</span>
                  </div>
                </div>

                {/* Call to Action direct link to mock test */}
                <div className="mt-8">
                  <Link
                    href={`/exam/${blog.examSlug}`}
                    className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-4 px-4 rounded-xl shadow-lg hover:shadow-blue-500/20 hover:-translate-y-0.5 transition-all active:scale-98 text-center"
                  >
                    <span>🚀 Start Free {blog.examName} Mock</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            )}

            {/* Related Articles Widget */}
            {otherBlogs.length > 0 && (
              <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm">
                <h3 className="text-sm font-extrabold text-slate-800 mb-4 pb-2 border-b border-slate-100 flex items-center gap-1.5">
                  🔗 Related Articles
                </h3>
                <div className="space-y-3">
                  {otherBlogs.map((b) => (
                    <Link
                      key={b.slug}
                      href={`/blog/${b.slug}`}
                      className="group flex gap-3 p-3 rounded-2xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50/10 transition-all"
                    >
                      <span className="text-xl flex items-center justify-center shrink-0 w-8 h-8 rounded-xl bg-slate-50 group-hover:bg-blue-50 transition-colors">
                        {b.icon}
                      </span>
                      <div>
                        <h4 className="text-[11px] font-bold text-slate-700 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                          {b.title}
                        </h4>
                        <span className="text-[9px] text-blue-500 font-bold mt-1 block">Read Article →</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Practice Mock Test CTA for other blog types */}
            {(blog.type === 'salary' || blog.type === 'cutoff') && (
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-3xl p-6 shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 -mt-12 -mr-12 w-32 h-32 rounded-full bg-white/5 blur-xl pointer-events-none"></div>
                <h3 className="text-sm font-bold mb-2 flex items-center gap-2">
                  ✍️ Ready to Practice?
                </h3>
                <p className="text-[11px] text-blue-100/90 mb-5 leading-relaxed font-semibold">
                  Start practicing with our free online mock tests designed exactly on the latest official pattern.
                </p>
                <Link
                  href={`/exam/${blog.examSlug}`}
                  className="w-full flex items-center justify-center gap-2 bg-white hover:bg-blue-50 text-blue-700 font-extrabold text-xs py-3.5 px-4 rounded-xl shadow-md transition-all active:scale-98 text-center"
                >
                  <span>🚀 Launch Mock Tests</span>
                  <span>→</span>
                </Link>
              </div>
            )}

            {/* Trust disclaimer */}
            <div className="bg-slate-100/50 border border-slate-200 rounded-3xl p-5 text-xs text-slate-500 leading-relaxed font-medium">
              <span className="font-bold text-slate-700 block mb-1">⚠️ Disclaimer:</span>
              This information has been curated from recruitment bulletins. While we make every effort to maintain accurate data, candidates are requested to verify details from official notifications.
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
