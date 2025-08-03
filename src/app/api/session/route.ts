// /app/api/session/route.ts
import { NextResponse } from 'next/server';
import { verifySession } from '@/lib/dal';

export async function GET() {
  const session = await verifySession();
  return NextResponse.json(session);
}