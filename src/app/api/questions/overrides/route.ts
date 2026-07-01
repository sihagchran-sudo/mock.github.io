import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';


export async function GET() {
  try {
    const settings = await prisma.systemSetting.findMany({
      where: {
        OR: [
          {
            key: {
              startsWith: 'exp_override_'
            }
          },
          {
            key: {
              startsWith: 'q_override_'
            }
          }
        ]
      }
    });

    const overrides: Record<string, any> = {};
    settings.forEach(s => {
      if (s.key.startsWith('exp_override_')) {
        const qId = s.key.replace('exp_override_', '');
        overrides[qId] = s.value;
      } else if (s.key.startsWith('q_override_')) {
        const qId = s.key.replace('q_override_', '');
        try {
          overrides[qId] = JSON.parse(s.value);
        } catch {
          overrides[qId] = s.value;
        }
      }
    });

    return NextResponse.json({ success: true, overrides });
  } catch (error: any) {
    console.error('Error fetching explanation overrides:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
