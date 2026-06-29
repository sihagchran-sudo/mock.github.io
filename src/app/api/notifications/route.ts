import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { BLOGS } from "@/blogData";
import { FREE_RESOURCES } from "@/resourceData";

export async function GET() {
  try {
    let dbBlogs: any[] = [];
    let dbResources: any[] = [];
    let dbCustomNotifs: any[] = [];

    // Attempt database fetches
    try {
      dbBlogs = await prisma.blogArticle.findMany({
        orderBy: { createdAt: "desc" },
        take: 5
      });
    } catch (e) {
      // Database offline/unmigrated
    }

    try {
      dbResources = await prisma.freeResource.findMany({
        where: { isApproved: true },
        orderBy: { createdAt: "desc" },
        take: 5
      });
    } catch (e) {
      // Database offline/unmigrated
    }

    try {
      dbCustomNotifs = await prisma.customNotification.findMany({
        orderBy: { createdAt: "desc" },
        take: 5
      });
    } catch (e) {
      // Database offline/unmigrated
    }

    // Process DB Blogs
    const processedDbBlogs = dbBlogs.map(b => ({
      id: `blog-${b.slug}`,
      title: b.title,
      desc: b.description,
      link: `/blog/${b.slug}`,
      date: b.publishDate,
      badge: "Exam Guide",
      icon: b.icon || "📝",
      createdAt: b.createdAt ? new Date(b.createdAt).getTime() : Date.now()
    }));

    // Process DB Resources
    const processedDbResources = dbResources.map(r => ({
      id: `res-${r.id}`,
      title: r.title,
      desc: r.description || `New PDF resource added to category: ${r.category}`,
      link: "/free-resources",
      date: new Date(r.createdAt || Date.now()).toLocaleDateString(undefined, { dateStyle: "medium" }),
      badge: "Free PDF",
      icon: "📥",
      createdAt: r.createdAt ? new Date(r.createdAt).getTime() : Date.now()
    }));

    // Process DB Custom Notifications
    const processedDbCustomNotifs = dbCustomNotifs.map(n => ({
      id: `custom-${n.id}`,
      title: n.title,
      desc: n.desc,
      link: n.link || "/",
      date: new Date(n.createdAt).toLocaleDateString(undefined, { dateStyle: "medium" }),
      badge: n.badge || "Update",
      icon: n.icon || "🔔",
      createdAt: new Date(n.createdAt).getTime()
    }));

    // Process Static Blogs (only if not already in DB list)
    const dbBlogSlugs = new Set(dbBlogs.map(b => b.slug));
    const processedStaticBlogs = BLOGS
      .filter(b => !dbBlogSlugs.has(b.slug))
      .map(b => ({
        id: `blog-${b.slug}`,
        title: b.title,
        desc: b.description,
        link: `/blog/${b.slug}`,
        date: b.publishDate,
        badge: "Exam Guide",
        icon: b.icon || "📝",
        createdAt: b.datePublishedISO ? new Date(b.datePublishedISO).getTime() : new Date("2026-06-28T10:19:00Z").getTime()
      }));

    // Process Static Resources (only if not already in DB list)
    const dbResourceIds = new Set(dbResources.map(r => r.id));
    const processedStaticResources = FREE_RESOURCES
      .filter(r => !dbResourceIds.has(r.id))
      .map(r => ({
        id: `res-${r.id}`,
        title: r.title,
        desc: r.description || "Free exam reference notes & PDF booklet.",
        link: "/free-resources",
        date: r.createdAt ? new Date(r.createdAt).toLocaleDateString() : "June 28, 2026",
        badge: "Free PDF",
        icon: "📥",
        createdAt: new Date("2026-06-28T10:19:00Z").getTime()
      }));

    // Combine everything
    const combined = [
      ...processedDbCustomNotifs,
      ...processedDbBlogs,
      ...processedDbResources,
      ...processedStaticBlogs,
      ...processedStaticResources
    ];

    // Sort by createdAt descending
    combined.sort((a, b) => b.createdAt - a.createdAt);

    // Take top 5
    const latestNotifs = combined.slice(0, 5);

    return NextResponse.json({ notifications: latestNotifs });
  } catch (error: any) {
    // Ultimate fallback if formatting crashes
    return NextResponse.json({
      notifications: [
        {
          id: "fallback-default",
          title: "MockMaster Updates Live",
          desc: "Browse our newly updated exam guides and resources.",
          link: "/",
          date: "Today",
          badge: "Update",
          icon: "⚡",
          createdAt: Date.now()
        }
      ]
    });
  }
}
