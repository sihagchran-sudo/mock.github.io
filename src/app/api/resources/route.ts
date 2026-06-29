import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { FREE_RESOURCES } from "@/resourceData";

const ADMIN_SECRET = "MockMasterAdmin77#";

function checkAdminAuth(req: Request) {
  const { searchParams } = new URL(req.url);
  const secret = searchParams.get("secret") || req.headers.get("x-admin-secret");
  return secret === ADMIN_SECRET;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const includePending = searchParams.get("includePending") === "true";
  const isAdmin = checkAdminAuth(req);

  try {
    let dbResources: any[] = [];
    try {
      if (isAdmin && includePending) {
        dbResources = await prisma.freeResource.findMany({
          orderBy: { createdAt: "desc" }
        });
      } else {
        dbResources = await prisma.freeResource.findMany({
          where: { isApproved: true },
          orderBy: { createdAt: "desc" }
        });
      }
    } catch (e) {
      // Database offline or empty
    }

    const dbIds = new Set(dbResources.map(r => r.id));
    
    // Combine db and static resources
    const combinedResources = [
      ...dbResources,
      ...FREE_RESOURCES.filter(r => !dbIds.has(r.id) && (isAdmin || r.isApproved))
    ];

    return NextResponse.json({ resources: combinedResources });
  } catch (error: any) {
    return NextResponse.json({ resources: FREE_RESOURCES });
  }
}

export async function POST(req: Request) {
  const isAdmin = checkAdminAuth(req);

  try {
    const body = await req.json();
    const { title, description, url, category, fileSize, source, isApproved } = body;

    if (!title || !url || !category) {
      return NextResponse.json({ error: "Title, URL, and Category are required." }, { status: 400 });
    }

    // Anonymous submissions are always pending approval
    const approvedStatus = isAdmin ? (isApproved !== undefined ? isApproved : true) : false;

    // Save to database
    let savedResource = null;
    try {
      savedResource = await prisma.freeResource.create({
        data: {
          title,
          description: description || "",
          url,
          category,
          fileSize: fileSize || "N/A",
          source: source || (isAdmin ? "Admin Manual" : "Suggested"),
          isApproved: approvedStatus
        }
      });
    } catch (e: any) {
      return NextResponse.json({ 
        error: "Database offline. Resource could not be saved to DB.",
        fallbackMockResource: {
          id: `temp-${Date.now()}`,
          title,
          description,
          url,
          category,
          fileSize,
          source,
          isApproved: approvedStatus
        }
      }, { status: 503 });
    }

    return NextResponse.json({ success: true, resource: savedResource });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to create resource." }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  if (!checkAdminAuth(req)) {
    return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { id, isApproved, title, description, category, fileSize, source, url } = body;

    if (!id) {
      return NextResponse.json({ error: "Resource ID is required." }, { status: 400 });
    }

    const updated = await prisma.freeResource.update({
      where: { id },
      data: {
        ...(isApproved !== undefined && { isApproved }),
        ...(title && { title }),
        ...(description !== undefined && { description }),
        ...(category && { category }),
        ...(fileSize && { fileSize }),
        ...(source && { source }),
        ...(url && { url })
      }
    });

    return NextResponse.json({ success: true, resource: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to update resource." }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  if (!checkAdminAuth(req)) {
    return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Resource ID is required." }, { status: 400 });
    }

    await prisma.freeResource.delete({
      where: { id }
    });

    return NextResponse.json({ success: true, message: "Resource deleted successfully." });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to delete resource." }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json({ error: "Resource ID is required." }, { status: 400 });
    }

    let updated = null;
    try {
      updated = await prisma.freeResource.update({
        where: { id },
        data: {
          downloads: {
            increment: 1
          }
        }
      });
    } catch (e) {
      // Database offline/unmigrated
    }

    return NextResponse.json({ success: true, resource: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to increment downloads." }, { status: 500 });
  }
}
