import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const settings = await prisma.systemSetting.findMany({
      where: {
        key: {
          startsWith: 'exp_override_'
        }
      }
    });

    const overrides: Record<string, string> = {};
    settings.forEach(s => {
      const qId = s.key.replace('exp_override_', '');
      overrides[qId] = s.value;
    });

    return NextResponse.json({ success: true, overrides });
  } catch (error: any) {
    console.error('Error fetching explanation overrides:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
