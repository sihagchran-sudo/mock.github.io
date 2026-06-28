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

// Generate dynamic placeholder articles for all 30 exams
EXAMS.forEach(exam => {
  const { category, icon } = getCategoryAndIcon(exam.categoryId, exam.slug);
  
  dynamicBlogs.push({
    slug: `${exam.slug}-syllabus-pattern`,
    title: `${exam.name} Syllabus & Exam Pattern 2026`,
    description: `Complete subject-wise syllabus, marks weightage, eligibility criteria, and preparation guidelines for the ${exam.name} recruitment examination.`,
    publishDate: "June 28, 2026",
    readTime: "5 min read",
    examSlug: exam.slug,
    examName: exam.name,
    category,
    icon,
    type: 'syllabus',
    sections: [
      {
        title: "Detailed Section-Wise Topics",
        paragraphs: [
          "The complete list of topics and chapters for each subject will be updated here. Please check back soon for the official structured syllabus release.",
          "We will cover all sections including Quantitative Aptitude, Logical Reasoning, General Awareness, and Language Comprehension in detail."
        ]
      },
      {
        title: "Salary Structure & Job Profile",
        paragraphs: [
          "Detailed pay scale, grade pay, allowances, promotions, and job responsibilities for various posts under this recruitment will be populated here."
        ]
      },
      {
        title: "Previous Year Cut-off Trends",
        paragraphs: [
          "Category-wise cut-off marks for Tier-1, Tier-2, and final selection stages from previous recruitment cycles will be listed here to help you set targets."
        ]
      }
    ],
    details: {
      postName: `${exam.name} Various Posts`,
      authority: "Official Recruitment Board",
      totalMarks: 100,
      durationMinutes: 90,
      negativeMarking: "To be updated",
      eligibility: "Educational eligibility criteria details will be updated soon.",
      ageLimit: "Age limit and relaxation details will be updated soon.",
      subjects: [
        { name: "Subject Section A", marks: 25, questions: 25 },
        { name: "Subject Section B", marks: 25, questions: 25 },
        { name: "Subject Section C", marks: 25, questions: 25 },
        { name: "Subject Section D", marks: 25, questions: 25 }
      ],
      fullSyllabus: [
        {
          section: "Subject Section A Topics",
          topics: [
            "Topic Chapter 1 (To be updated)",
            "Topic Chapter 2 (To be updated)",
            "Topic Chapter 3 (To be updated)"
          ]
        },
        {
          section: "Subject Section B Topics",
          topics: [
            "Topic Chapter 1 (To be updated)",
            "Topic Chapter 2 (To be updated)"
          ]
        }
      ],
      prepTips: [
        "Expert preparation tip 1 will be added soon.",
        "Expert preparation tip 2 will be added soon.",
        "Practice mock test series regularly to analyze speed and accuracy."
      ]
    }
  });
});

export const BLOGS: BlogArticle[] = [...staticBlogs, ...dynamicBlogs];

export function getBlogBySlug(slug: string): BlogArticle | undefined {
  return BLOGS.find(b => b.slug === slug);
}

export function getBlogsByExam(examSlug: string): BlogArticle[] {
  return BLOGS.filter(b => b.examSlug === examSlug);
}
