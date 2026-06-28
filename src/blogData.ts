export interface BlogArticle {
  slug: string;
  title: string;
  description: string;
  examSlug: string;
  examName: string;
  category: string;
  icon: string;
  type?: 'syllabus' | 'salary' | 'cutoff' | 'info';
  
  // Metadata & SEO (Optional)
  metaTitle?: string;
  metaDescription?: string;
  authorName?: string;
  authorityBadge?: string;
  publishDate: string;
  readTime: string;
  datePublishedISO?: string; // for JSON-LD
  
  // Media (Optional)
  featuredImage?: string;
  featuredImageAlt?: string;
  
  // Content Slots (Optional)
  quickAnswer?: string;
  
  // Rich Body Sections
  sections: {
    id?: string;
    title: string; // H2 Heading
    paragraphs: string[];
    table?: {
      headers: string[];
      rows: string[][];
    };
    stepper?: {
      stepNumber: number;
      title: string;
      description: string;
    }[];
    weightageChart?: {
      label: string;
      percentage: number;
    }[];
    strategyCards?: {
      title: string;
      description: string;
    }[];
    sectionCtaText?: string;
    sectionCtaLink?: string;
  }[];
  
  // FAQ accordion (Optional)
  faqs?: {
    question: string;
    answer: string;
  }[];
  
  // Related exams (Optional)
  relatedExams?: string[]; // array of exam slugs (e.g. ['ssc-chsl', 'ssc-mts'])
}

const staticBlogs: BlogArticle[] = [];
export const BLOGS: BlogArticle[] = [];

export function getBlogBySlug(slug: string): BlogArticle | undefined {
  return BLOGS.find(b => b.slug === slug);
}

export function getBlogsByExam(examSlug: string): BlogArticle[] {
  return BLOGS.filter(b => b.examSlug === examSlug);
}
