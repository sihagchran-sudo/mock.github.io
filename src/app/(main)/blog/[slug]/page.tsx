import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getBlogBySlug, BlogArticle } from '@/blogData';
import { prisma } from '@/lib/db';
import BlogTemplateClient from './BlogTemplateClient';

interface BlogPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  let blog: BlogArticle | null = null;

  try {
    const dbArticle = await prisma.blogArticle.findUnique({ where: { slug } });
    if (dbArticle) {
      blog = {
        ...dbArticle,
        sections: dbArticle.sections ? JSON.parse(dbArticle.sections) : [],
        faqs: (dbArticle as any).faqs ? JSON.parse((dbArticle as any).faqs) : [],
        relatedExams: (dbArticle as any).relatedExams ? JSON.parse((dbArticle as any).relatedExams) : [],
      } as any;
    }
  } catch (e) {}

  if (!blog) {
    blog = getBlogBySlug(slug) || null;
  }

  if (!blog) {
    return {
      title: 'Blog Not Found',
    };
  }

  return {
    title: blog.metaTitle || blog.title,
    description: blog.metaDescription || blog.description,
  };
}

export default async function BlogDetailPage({ params }: BlogPageProps) {
  const { slug } = await params;
  let blog: BlogArticle | null = null;

  try {
    const dbArticle = await prisma.blogArticle.findUnique({ where: { slug } });
    if (dbArticle) {
      blog = {
        ...dbArticle,
        sections: dbArticle.sections ? JSON.parse(dbArticle.sections) : [],
        faqs: (dbArticle as any).faqs ? JSON.parse((dbArticle as any).faqs) : [],
        relatedExams: (dbArticle as any).relatedExams ? JSON.parse((dbArticle as any).relatedExams) : [],
      } as any;
    }
  } catch (e) {}

  if (!blog) {
    blog = getBlogBySlug(slug) || null;
  }

  if (!blog) {
    notFound();
  }

  // Generate Article JSON-LD
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": blog.title,
    "description": blog.metaDescription || blog.description,
    "author": {
      "@type": "Person",
      "name": blog.authorName || "Editorial Team"
    },
    "datePublished": blog.datePublishedISO || new Date().toISOString(),
    "publisher": {
      "@type": "Organization",
      "name": "Mock Test Simulator",
      "logo": {
        "@type": "ImageObject",
        "url": "https://mocktest.com/logo.png"
      }
    }
  };

  // Generate FAQ JSON-LD if present
  const faqJsonLd = blog.faqs && blog.faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": blog.faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      <BlogTemplateClient blog={blog} />
    </>
  );
}
