import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getBlogBySlug, BlogArticle } from '@/blogData';
import { prisma } from '@/lib/db';

interface BlogPageProps {
  params: Promise<{ slug: string }>;
}

function BlockRenderer({ content }: { content: string }) {
  // Check if it is a table
  if (content.startsWith('[TABLE]')) {
    const lines = content.replace('[TABLE]\n', '').split('\n').filter(l => l.trim() !== '');
    if (lines.length === 0) return null;
    
    const headers = lines[0].split('|').map(h => h.trim());
    const rows = lines.slice(1).map(line => line.split('|').map(c => c.trim()));
    
    return (
      <div className="overflow-x-auto my-5 border border-slate-200 rounded-2xl shadow-sm bg-white">
        <table className="w-full text-left border-collapse text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-slate-700">
              {headers.map((h, i) => (
                <th key={i} className="py-3 px-4 font-bold text-slate-800">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-105 text-slate-600 font-semibold">
            {rows.map((row, rIdx) => (
              <tr key={rIdx} className="hover:bg-slate-50/30">
                {row.map((cell, cIdx) => (
                  <td key={cIdx} className="py-3.5 px-4">{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  // Check if it contains list items
  const lines = content.split('\n');
  if (lines.length > 1 && (lines[0].trim().startsWith('•') || lines[0].trim().startsWith('-') || /^\d+\./.test(lines[0].trim()))) {
    const isNumbered = /^\d+\./.test(lines[0].trim());
    
    if (isNumbered) {
      return (
        <ol className="list-decimal pl-5 space-y-2 text-slate-600 text-xs sm:text-sm leading-relaxed font-semibold my-3">
          {lines.map((line, idx) => {
            const cleanText = line.replace(/^\d+\.\s*/, '').trim();
            return <li key={idx}>{cleanText}</li>;
          })}
        </ol>
      );
    } else {
      return (
        <ul className="list-disc pl-5 space-y-2 text-slate-600 text-xs sm:text-sm leading-relaxed font-semibold my-3">
          {lines.map((line, idx) => {
            const cleanText = line.replace(/^[•\-\*]\s*/, '').trim();
            return <li key={idx}>{cleanText}</li>;
          })}
        </ul>
      );
    }
  }

  // Default standard paragraph text
  if (content.includes('\n')) {
    return (
      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-semibold">
        {content.split('\n').map((line, i) => (
          <span key={i}>
            {line}
            {i < content.split('\n').length - 1 && <br />}
          </span>
        ))}
      </p>
    );
  }

  return (
    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-semibold">
      {content}
    </p>
  );
}

export default async function BlogDetailPage({ params }: BlogPageProps) {
  const { slug } = await params;
  
  let blog: BlogArticle | null | undefined = null;

  try {
    const dbArticle = await prisma.blogArticle.findUnique({
      where: { slug },
    });
    if (dbArticle) {
      blog = {
        ...dbArticle,
        sections: JSON.parse(dbArticle.sections),
        details: JSON.parse(dbArticle.details),
      } as any;
    }
  } catch (e) {
    // Fail silent and fallback to static
  }

  if (!blog) {
    blog = getBlogBySlug(slug);
  }

  if (!blog) {
    notFound();
  }

  const { details } = blog;
  const isInfo = blog.type === 'info';

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
          {blog.description && (
            <p className="text-slate-500 mt-2 text-sm sm:text-base max-w-3xl leading-relaxed">
              {blog.description}
            </p>
          )}
        </div>

        {isInfo ? (
          /* Centered, clean reading container for info posts (without sidebar) */
          <div className="max-w-4xl mx-auto space-y-8">
            {blog.sections && blog.sections.map((sec, idx) => (
              <div key={idx} className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
                <h2 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-3 mb-4">
                  {sec.title}
                </h2>
                <div className="space-y-4">
                  {sec.paragraphs.map((p, pIdx) => (
                    <BlockRenderer key={pIdx} content={p} />
                  ))}
                </div>
              </div>
            ))}

            {/* Disclaimer at the bottom */}
            <div className="bg-slate-100/50 border border-slate-200 rounded-3xl p-5 text-xs text-slate-500 leading-relaxed font-medium">
              <span className="font-bold text-slate-700 block mb-1">⚠️ Disclaimer:</span>
              This information has been curated from recruitment bulletins. While we make every effort to maintain accurate data, candidates are requested to verify details from official notifications.
            </div>
          </div>
        ) : (
          /* Layout Grid with Sidebar for syllabus pattern posts */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Main content column (Left) */}
            <div className="lg:col-span-2 space-y-8">
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
                    <span className="font-semibold text-slate-650 text-xs">{details.eligibility}</span>
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
                          <td className="py-3 px-4 text-center text-slate-600">{sub.questions} Qs</td>
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

              {/* Render custom sections (Salary, Job Profile, Cutoff, etc.) */}
              {blog.sections && blog.sections.map((sec, idx) => (
                <div key={idx} className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
                  <h2 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-3 mb-4">
                    {sec.title}
                  </h2>
                  <div className="space-y-4">
                    {sec.paragraphs.map((p, pIdx) => (
                      <BlockRenderer key={pIdx} content={p} />
                    ))}
                  </div>
                </div>
              ))}

            </div>

            {/* Sidebar column (Right) */}
            <div className="space-y-6">
              
              {/* Quick highlights card */}
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

              {/* Trust disclaimer */}
              <div className="bg-slate-100/50 border border-slate-200 rounded-3xl p-5 text-xs text-slate-500 leading-relaxed font-medium">
                <span className="font-bold text-slate-700 block mb-1">⚠️ Disclaimer:</span>
                This information has been curated from recruitment bulletins. While we make every effort to maintain accurate data, candidates are requested to verify details from official notifications.
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}
