import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@vercel/postgres'
import { getResend } from '@/lib/resend'

type LearningCollectivePayload = {
  parentName?: string
  phone?: string
  email?: string
  children?: string
  preferredContact?: string[]
  attendingFirstMeeting?: string
  [key: string]: unknown
}

const REQUIRED_FIELDS = [
  'parentName',
  'phone',
  'email',
  'children',
  'preferredContact',
  'attendingFirstMeeting',
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
      preferred_contact TEXT,
      attending_first_meeting TEXT,
      response JSONB NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `
}

function buildNotificationText(payload: LearningCollectivePayload) {
  const formatValue = (value: unknown): string => {
    if (Array.isArray(value)) return value.join(', ')
    if (typeof value === 'string') return value
    if (value == null) return ''
    return String(value)
  }

  return [
    'New Learning Collective interest survey response',
    '',
    `Parent/Guardian: ${formatValue(payload.parentName)}`,
    `Phone: ${formatValue(payload.phone)}`,
    `Email: ${formatValue(payload.email)}`,
    `Child(ren): ${formatValue(payload.children)}`,
    `Preferred contact: ${formatValue(payload.preferredContact)}`,
    `Plans to attend first meeting: ${formatValue(payload.attendingFirstMeeting)}`,
    '',
    'Full response:',
    JSON.stringify(payload, null, 2),
  ].join('\n')
}

export async function POST(req: NextRequest) {
  try {
    const payload = (await req.json()) as LearningCollectivePayload

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
    const children = payload.children!.trim()
    const preferredContact = payload.preferredContact!.join(', ')
    const attendingFirstMeeting = payload.attendingFirstMeeting?.trim() ?? null
    const responseJson = JSON.stringify(payload)

    await initLearningCollectiveDb()

    await sql`
      INSERT INTO learning_collective_responses (
        parent_name,
        phone,
        email,
        children_names_ages,
        preferred_contact,
        attending_first_meeting,
        response
      ) VALUES (
        ${parentName},
        ${phone},
        ${email},
        ${children},
        ${preferredContact},
        ${attendingFirstMeeting},
        ${responseJson}::jsonb
      )
    `

    const resend = getResend()
    await resend.emails.send({
      from: 'Forevermore Farm <hello@forevermorefarmtn.com>',
      to: process.env.LEARNING_COLLECTIVE_EMAIL ?? 'concetta.i.west@gmail.com',
      subject: `Learning Collective survey: ${parentName}`,
      text: buildNotificationText(payload),
      replyTo: email,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to submit Learning Collective survey' }, { status: 500 })
  }
}
