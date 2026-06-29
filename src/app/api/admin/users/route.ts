import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

const ADMIN_SECRET = "MockMasterAdmin77#";

function checkAdminAuth(req: Request) {
  const { searchParams } = new URL(req.url);
  const secret = searchParams.get("secret") || req.headers.get("x-admin-secret");
  return secret === ADMIN_SECRET;
}

export async function GET(req: Request) {
  if (!checkAdminAuth(req)) {
    return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
  }

  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true, // stores username
        isPassActive: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ users });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to fetch users." }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  if (!checkAdminAuth(req)) {
    return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
  }

  try {
    const { userId } = await req.json();

    if (!userId) {
      return NextResponse.json({ error: "User ID is required." }, { status: 400 });
    }

    await prisma.user.delete({
      where: { id: userId },
    });

    return NextResponse.json({ success: true, message: "User deleted successfully." });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to delete user." }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  if (!checkAdminAuth(req)) {
    return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
  }

  try {
    const { userId, isPassActive, passExpiryDays } = await req.json();

    if (!userId) {
      return NextResponse.json({ error: "User ID is required." }, { status: 400 });
    }

    let passExpiry = null;
    if (isPassActive) {
      const days = passExpiryDays ? parseInt(passExpiryDays, 10) : 365;
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + days);
      passExpiry = expiryDate;
    }

    const updated = await prisma.user.update({
      where: { id: userId },
      data: {
        isPassActive: !!isPassActive,
        passExpiry: passExpiry
      },
      select: {
        id: true,
        name: true,
        email: true,
        isPassActive: true,
        createdAt: true
      }
    });

    return NextResponse.json({ success: true, user: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to update user pass." }, { status: 500 });
  }
}
