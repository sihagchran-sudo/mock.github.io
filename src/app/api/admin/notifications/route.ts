import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

const ADMIN_SECRET = "MockMasterAdmin77#";

function checkAdminAuth(req: Request) {
  const { searchParams } = new URL(req.url);
  const secret = searchParams.get("secret") || req.headers.get("x-admin-secret");
  return secret === ADMIN_SECRET;
}

export async function POST(req: Request) {
  if (!checkAdminAuth(req)) {
    return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { title, desc, link, badge, icon } = body;

    if (!title || !desc) {
      return NextResponse.json({ error: "Title and Description are required." }, { status: 400 });
    }

    const notif = await prisma.customNotification.create({
      data: {
        title,
        desc,
        link: link || "/",
        badge: badge || "Update",
        icon: icon || "🔔"
      }
    });

    return NextResponse.json({ success: true, notification: notif });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to create custom notification." }, { status: 500 });
  }
}
