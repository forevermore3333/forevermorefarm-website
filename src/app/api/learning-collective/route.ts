import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@vercel/postgres'
import { getResend } from '@/lib/resend'

type ChildPayload = {
  name?: unknown
  age?: unknown
}

type LearningCollectivePayload = {
  parentName?: string
  phone?: string
  email?: string
  children?: ChildPayload[]
  preferredContact?: string[]
  [key: string]: unknown
}

const REQUIRED_FIELDS = [
  'parentName',
  'phone',
  'email',
  'preferredContact',
  'involvement',
  'comfortGuiding',
  'leadershipGrowth',
  'skills',
  'experience',
  'helpFrequency',
  'preferredRole',
] as const

function isNonEmptyString(value: unknown) {
  return typeof value === 'string' && value.trim().length > 0
}

function isNonEmptyArray(value: unknown) {
  return Array.isArray(value) && value.length > 0
}

async function initLearningCollectiveDb() {
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
}

function formatChildren(children: ChildPayload[] | undefined) {
  if (!Array.isArray(children)) return ''
  return children
    .map((child) => {
      const name = typeof child.name === 'string' ? child.name.trim() : ''
      const age = typeof child.age === 'string' ? child.age.trim() : ''
      if (!name && !age) return ''
      return `${name}${age ? ` (${age})` : ''}`
    })
    .filter(Boolean)
    .join('; ')
}

function buildNotificationText(payload: LearningCollectivePayload) {
  const formatValue = (value: unknown): string => {
    if (Array.isArray(value)) return value.join(', ')
    if (typeof value === 'string') return value
    if (value == null) return ''
    return String(value)
  }

  return [
    'New website form submission',
    '',
    `Parent/Guardian: ${formatValue(payload.parentName)}`,
    `Phone: ${formatValue(payload.phone)}`,
    `Email: ${formatValue(payload.email)}`,
    `Child(ren): ${formatChildren(payload.children)}`,
    `Preferred contact: ${formatValue(payload.preferredContact)}`,
    '',
    'Full response:',
    JSON.stringify(payload, null, 2),
  ].join('\n')
}

export async function POST(req: NextRequest) {
  try {
    const payload = (await req.json()) as LearningCollectivePayload

    const normalizedChildren = Array.isArray(payload.children)
      ? payload.children.map((child) => ({
          name: typeof child.name === 'string' ? child.name.trim() : '',
          age: typeof child.age === 'string' ? child.age.trim() : '',
        })).filter((child) => child.name || child.age)
      : []

    if (normalizedChildren.length === 0 || normalizedChildren.some((child) => !child.name || !child.age)) {
      return NextResponse.json({ error: 'Missing required field: children' }, { status: 400 })
    }

    for (const field of REQUIRED_FIELDS) {
      const value = payload[field]
      const valid = Array.isArray(value) ? isNonEmptyArray(value) : isNonEmptyString(value)
      if (!valid) {
        return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 })
      }
    }

    const parentName = payload.parentName!.trim()
    const phone = payload.phone!.trim()
    const email = payload.email!.trim()
    const children = formatChildren(normalizedChildren)
    const childrenJson = JSON.stringify(normalizedChildren)
    const preferredContact = payload.preferredContact!.join(', ')
    const responsePayload = { ...payload, children: normalizedChildren }
    const responseJson = JSON.stringify(responsePayload)

    await initLearningCollectiveDb()

    await sql`
      INSERT INTO learning_collective_responses (
        parent_name,
        phone,
        email,
        children_names_ages,
        children,
        preferred_contact,
        attending_first_meeting,
        response
      ) VALUES (
        ${parentName},
        ${phone},
        ${email},
        ${children},
        ${childrenJson}::jsonb,
        ${preferredContact},
        ${null},
        ${responseJson}::jsonb
      )
    `

    const resend = getResend()
    await resend.emails.send({
      from: 'Forevermore Farm Website <hello@forevermorefarmtn.com>',
      to: process.env.LEARNING_COLLECTIVE_EMAIL ?? 'concetta.i.west@gmail.com',
      subject: `New website form submission: ${parentName}`,
      text: buildNotificationText(responsePayload),
      replyTo: email,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to submit Learning Collective survey' }, { status: 500 })
  }
}
