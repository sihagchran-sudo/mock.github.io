import { EXAMS } from './mockData';

export interface BlogArticle {
  slug: string;
  title: string;
  description: string;
  publishDate: string;
  readTime: string;
  examSlug: string;
  examName: string;
  category: string;
  icon: string;
  type?: 'syllabus' | 'salary' | 'cutoff' | 'info';
  sections?: { title: string; paragraphs: string[] }[];
  details: {
    postName: string;
    authority: string;
    totalMarks: number;
    durationMinutes: number;
    negativeMarking: string;
    eligibility: string;
    ageLimit: string;
    subjects: { name: string; marks: number; questions: number }[];
    fullSyllabus: { section: string; topics: string[] }[];
    prepTips: string[];
  };
}

const staticBlogs: BlogArticle[] = [];
const dynamicBlogs: BlogArticle[] = [];

export const BLOGS: BlogArticle[] = [];

export function getCategoryAndIcon(categoryId: string, slug: string): { category: string; icon: string } {
  if (categoryId === 'cat-ssc') {
    if (slug === 'ssc-mts') return { category: "SSC Exams", icon: "📋" };
    if (slug === 'ssc-stenographer') return { category: "SSC Exams", icon: "✍️" };
    if (slug.includes('constable') || slug.includes('cpo')) return { category: "SSC Exams", icon: "👮" };
    return { category: "SSC Exams", icon: "📝" };
  } else if (categoryId === 'cat-hssc') {
    return { category: "HSSC Exams", icon: "📋" };
  } else if (categoryId === 'cat-police') {
    return { category: "State Police", icon: "👮" };
  } else if (categoryId === 'cat-teaching') {
    return { category: "Teacher Exams", icon: "🎓" };
  } else if (categoryId === 'cat-railways') {
    return { category: "Railways", icon: "🚆" };
  } else if (categoryId === 'cat-defence') {
    return { category: "Defence", icon: "⚔️" };
  } else {
    return { category: "State Exams", icon: "🗺️" };
  }
}

export function getBlogBySlug(slug: string): BlogArticle | undefined {
  return BLOGS.find(b => b.slug === slug);
}

export function getBlogsByExam(examSlug: string): BlogArticle[] {
  return BLOGS.filter(b => b.examSlug === examSlug);
}
