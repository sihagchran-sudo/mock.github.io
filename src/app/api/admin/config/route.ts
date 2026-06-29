import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

const ADMIN_SECRET = "MockMasterAdmin77#";

function checkAdminAuth(req: Request) {
  const { searchParams } = new URL(req.url);
  const secret = searchParams.get("secret") || req.headers.get("x-admin-secret");
  return secret === ADMIN_SECRET;
}

export async function GET() {
  try {
    const settings = await prisma.systemSetting.findMany();
    const config: Record<string, string> = {};
    settings.forEach(s => {
      config[s.key] = s.value;
    });
    return NextResponse.json({ config });
  } catch (e) {
    // Return empty fallback config if DB is offline
    return NextResponse.json({
      config: {
        "banner_text": "🔥 New: SSC Stenographer & HSSC Police guides + tests are now live! Start preparing.",
        "banner_link": "/blog/ssc-stenographer-syllabus-pattern",
        "banner_visible": "true"
      }
    });
  }
}

export async function POST(req: Request) {
  if (!checkAdminAuth(req)) {
    return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { key, value } = body;

    if (!key) {
      return NextResponse.json({ error: "Config Key is required." }, { status: 400 });
    }

    const setting = await prisma.systemSetting.upsert({
      where: { key },
      update: { value: String(value) },
      create: { key, value: String(value) }
    });

    return NextResponse.json({ success: true, setting });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to save setting." }, { status: 500 });
  }
}
