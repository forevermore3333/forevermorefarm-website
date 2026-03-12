import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

export async function POST(req: NextRequest) {
  const body = await req.json();

  if (body.password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const sql = neon(process.env.POSTGRES_URL!);
  const rows = await sql`
    SELECT id, name, email, phone, source, created_at
    FROM subscribers
    ORDER BY created_at DESC
  `;

  return NextResponse.json(rows);
}
