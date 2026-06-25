import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const session = await auth();
    const email = session?.user?.email;
    if (!email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true }
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const body = await req.json();
    const {
      id,
      testId,
      score,
      accuracy,
      percentile,
      status,
      startedAt,
      submittedAt,
      responses,
      analytics
    } = body;

    if (!id || !testId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Prepare responses as string
    const responsesStr = JSON.stringify(responses || []);

    // Perform upsert of TestAttempt
    const savedAttempt = await prisma.testAttempt.upsert({
      where: { id },
      update: {
        score: Number(score) || 0,
        accuracy: Number(accuracy) || 0,
        percentile: Number(percentile) || 0,
        status: status || "COMPLETED",
        startedAt: new Date(startedAt),
        submittedAt: submittedAt ? new Date(submittedAt) : null,
        responses: responsesStr,
        analytics: analytics ? {
          upsert: {
            create: {
              sectionTimeTaken: JSON.stringify(analytics.sectionTimeTaken || {}),
              weakChapters: JSON.stringify(analytics.weakChapters || []),
              strongChapters: JSON.stringify(analytics.strongChapters || [])
            },
            update: {
              sectionTimeTaken: JSON.stringify(analytics.sectionTimeTaken || {}),
              weakChapters: JSON.stringify(analytics.weakChapters || []),
              strongChapters: JSON.stringify(analytics.strongChapters || [])
            }
          }
        } : undefined
      },
      create: {
        id,
        userId: user.id,
        testId,
        score: Number(score) || 0,
        accuracy: Number(accuracy) || 0,
        percentile: Number(percentile) || 0,
        status: status || "COMPLETED",
        startedAt: new Date(startedAt),
        submittedAt: submittedAt ? new Date(submittedAt) : null,
        responses: responsesStr,
        analytics: analytics ? {
          create: {
            sectionTimeTaken: JSON.stringify(analytics.sectionTimeTaken || {}),
            weakChapters: JSON.stringify(analytics.weakChapters || []),
            strongChapters: JSON.stringify(analytics.strongChapters || [])
          }
        } : undefined
      },
      include: {
        analytics: true
      }
    });

    return NextResponse.json({ success: true, attempt: savedAttempt });
  } catch (error) {
    console.error("Save attempt error:", error);
    return NextResponse.json({ error: "Failed to save attempt" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const session = await auth();
    const email = session?.user?.email;
    if (!email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true }
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (id) {
      const attempt = await prisma.testAttempt.findUnique({
        where: { id },
        include: { analytics: true }
      });

      if (!attempt) {
        return NextResponse.json({ error: "Attempt not found" }, { status: 404 });
      }

      // Authorize access (only the owner can view their attempt)
      if (attempt.userId !== user.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
      }

      // Parse JSON fields back to objects/arrays
      let parsedResponses = [];
      try {
        parsedResponses = JSON.parse(attempt.responses);
      } catch (e) {
        console.error("Failed to parse responses JSON:", e);
      }

      let parsedAnalytics = undefined;
      if (attempt.analytics) {
        try {
          parsedAnalytics = {
            id: attempt.analytics.id,
            attemptId: attempt.analytics.attemptId,
            sectionTimeTaken: JSON.parse(attempt.analytics.sectionTimeTaken),
            weakChapters: JSON.parse(attempt.analytics.weakChapters),
            strongChapters: JSON.parse(attempt.analytics.strongChapters)
          };
        } catch (e) {
          console.error("Failed to parse analytics JSON:", e);
        }
      }

      const formattedAttempt = {
        id: attempt.id,
        userId: email, // maintain frontend compatibility
        testId: attempt.testId,
        score: attempt.score,
        accuracy: attempt.accuracy,
        percentile: attempt.percentile,
        status: attempt.status,
        startedAt: attempt.startedAt.toISOString(),
        submittedAt: attempt.submittedAt ? attempt.submittedAt.toISOString() : undefined,
        responses: parsedResponses,
        analytics: parsedAnalytics
      };

      return NextResponse.json({ success: true, attempt: formattedAttempt });
    }

    // Get all attempts for this user
    const attempts = await prisma.testAttempt.findMany({
      where: { userId: user.id },
      orderBy: { startedAt: "desc" },
      include: { analytics: true }
    });

    const formattedAttempts = attempts.map(att => {
      let parsedResponses = [];
      try {
        parsedResponses = JSON.parse(att.responses);
      } catch (e) {
        console.error("Failed to parse responses JSON:", e);
      }

      let parsedAnalytics = undefined;
      if (att.analytics) {
        try {
          parsedAnalytics = {
            id: att.analytics.id,
            attemptId: att.analytics.attemptId,
            sectionTimeTaken: JSON.parse(att.analytics.sectionTimeTaken),
            weakChapters: JSON.parse(att.analytics.weakChapters),
            strongChapters: JSON.parse(att.analytics.strongChapters)
          };
        } catch (e) {
          console.error("Failed to parse analytics JSON:", e);
        }
      }

      return {
        id: att.id,
        userId: email, // maintain frontend compatibility
        testId: att.testId,
        score: att.score,
        accuracy: att.accuracy,
        percentile: att.percentile,
        status: att.status,
        startedAt: att.startedAt.toISOString(),
        submittedAt: att.submittedAt ? att.submittedAt.toISOString() : undefined,
        responses: parsedResponses,
        analytics: parsedAnalytics
      };
    });

    return NextResponse.json({ success: true, attempts: formattedAttempts });
  } catch (error) {
    console.error("Get attempts error:", error);
    return NextResponse.json({ error: "Failed to load attempts" }, { status: 500 });
  }
}
