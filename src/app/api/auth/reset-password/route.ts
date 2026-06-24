import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { username, newPassword } = await req.json();

    if (!username || !newPassword) {
      return NextResponse.json({ error: "Username and new password are required." }, { status: 400 });
    }

    if (newPassword.length < 4) {
      return NextResponse.json({ error: "Password must be at least 4 characters long." }, { status: 400 });
    }

    // Find the user by username (stored in email column)
    const user = await prisma.user.findUnique({
      where: { email: username.trim() }
    });

    if (!user) {
      return NextResponse.json({ error: "User ID not found." }, { status: 404 });
    }

    const passwordHash = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { id: user.id },
      data: { passwordHash }
    });

    return NextResponse.json({ success: true, message: "Password updated successfully." });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to reset password." }, { status: 500 });
  }
}
