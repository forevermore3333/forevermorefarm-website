import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@vercel/postgres'

export async function POST(req: NextRequest) {
  const body = await req.json()

  if (body.password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  await sql`
    CREATE TABLE IF NOT EXISTS learning_collective_responses (
      id SERIAL PRIMARY KEY,
      parent_name TEXT NOT NULL,
      phone TEXT NOT NULL,
      email TEXT NOT NULL,
      children_names_ages TEXT NOT NULL,
      children JSONB,
      preferred_contact TEXT,
      attending_first_meeting TEXT,
      response JSONB NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `

  await sql`
    ALTER TABLE learning_collective_responses
    ADD COLUMN IF NOT EXISTS children JSONB
  `

  const { rows } = await sql`
    SELECT
      id,
      parent_name,
      phone,
      email,
      children_names_ages,
      children,
      preferred_contact,
      attending_first_meeting,
      response,
      created_at
    FROM learning_collective_responses
    ORDER BY created_at DESC
  `

  return NextResponse.json(rows)
}
