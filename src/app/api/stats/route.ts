import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { MOCK_TESTS } from "@/mockData";

export async function GET() {
  try {
    let dbCount = 0;
    try {
      dbCount = await prisma.test.count();
    } catch (e) {
      // Database offline/unmigrated
    }

    // Combine database tests count and static mock tests count
    const totalCount = Math.max(MOCK_TESTS.length, dbCount + MOCK_TESTS.length);

    return NextResponse.json({ mockTestsCount: totalCount });
  } catch (error: any) {
    return NextResponse.json({ mockTestsCount: MOCK_TESTS.length });
  }
}
