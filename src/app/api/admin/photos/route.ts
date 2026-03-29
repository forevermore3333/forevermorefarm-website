import { NextRequest, NextResponse } from 'next/server';
import { readFileSync } from 'fs';
import { join } from 'path';

export async function POST(req: NextRequest) {
  const body = await req.json();

  if (body.password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const manifestPath = join(process.cwd(), 'public', 'images', 'manifest.json');
  const manifest = JSON.parse(readFileSync(manifestPath, 'utf-8'));

  return NextResponse.json(manifest);
}
