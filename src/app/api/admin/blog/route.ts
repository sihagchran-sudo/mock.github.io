import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { BLOGS } from "@/blogData";

const ADMIN_SECRET = "MockMasterAdmin77#";

function checkAdminAuth(req: Request) {
  const { searchParams } = new URL(req.url);
  const secret = searchParams.get("secret") || req.headers.get("x-admin-secret");
  return secret === ADMIN_SECRET;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");

  try {
    if (slug) {
      const dbArticle = await prisma.blogArticle.findUnique({
        where: { slug },
      });
      if (dbArticle) {
        return NextResponse.json({
          article: {
            ...dbArticle,
            sections: JSON.parse(dbArticle.sections),
            details: JSON.parse(dbArticle.details),
          }
        });
      }
      
      // Fallback to static data
      const staticArticle = BLOGS.find(b => b.slug === slug);
      if (staticArticle) {
        return NextResponse.json({ article: staticArticle });
      }

      return NextResponse.json({ error: "Article not found." }, { status: 404 });
    }

    // List all blogs (mix of DB and static)
    let dbArticles: any[] = [];
    try {
      dbArticles = await prisma.blogArticle.findMany();
    } catch (e) {
      // Database might be empty or unmigrated locally
    }

    const dbSlugs = new Set(dbArticles.map(a => a.slug));

    const combinedArticles = [
      ...dbArticles.map(a => ({
        slug: a.slug,
        title: a.title,
        description: a.description,
        publishDate: a.publishDate,
        readTime: a.readTime,
        examSlug: a.examSlug,
        examName: a.examName,
        category: a.category,
        icon: a.icon,
        type: a.type,
        sections: JSON.parse(a.sections),
        details: JSON.parse(a.details),
      })),
      ...BLOGS.filter(b => !dbSlugs.has(b.slug))
    ];

    return NextResponse.json({ articles: combinedArticles });
  } catch (error: any) {
    return NextResponse.json({ articles: BLOGS });
  }
}

export async function POST(req: Request) {
  if (!checkAdminAuth(req)) {
    return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { slug, title, description, sections, examSlug, examName, category, icon, type, details } = body;

    if (!slug || !title) {
      return NextResponse.json({ error: "Slug and Title are required." }, { status: 400 });
    }

    const savedArticle = await prisma.blogArticle.upsert({
      where: { slug },
      update: {
        title,
        description: description || "",
        sections: JSON.stringify(sections || []),
        examSlug: examSlug || "",
        examName: examName || "",
        category: category || "",
        icon: icon || "📝",
        type: type || "info",
        details: JSON.stringify(details || {}),
      },
      create: {
        slug,
        title,
        description: description || "",
        sections: JSON.stringify(sections || []),
        examSlug: examSlug || "",
        examName: examName || "",
        category: category || "",
        icon: icon || "📝",
        type: type || "info",
        details: JSON.stringify(details || {}),
      },
    });

    return NextResponse.json({ 
      success: true, 
      article: {
        ...savedArticle,
        sections: JSON.parse(savedArticle.sections),
        details: JSON.parse(savedArticle.details),
      } 
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to save article." }, { status: 500 });
  }
}
