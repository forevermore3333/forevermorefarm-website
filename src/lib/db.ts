import { sql } from '@vercel/postgres'

export async function initDb() {
  await sql`
    CREATE TABLE IF NOT EXISTS subscribers (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      phone TEXT,
      source TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `
}

export async function insertSubscriber(
  name: string,
  email: string,
  phone?: string,
  source?: string
) {
  await sql`
    INSERT INTO subscribers (name, email, phone, source)
    VALUES (${name}, ${email}, ${phone ?? null}, ${source ?? null})
    ON CONFLICT (email) DO NOTHING
  `
}
