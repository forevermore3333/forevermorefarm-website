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

const responseLabels: Record<string, string> = {
  involvement: 'How they want to be involved',
  comfortGuiding: 'Comfort guiding a small group',
  leadershipGrowth: 'Open to growing into leadership',
  skills: 'Skills, experience, and interests',
  otherSkills: 'Other skills or interests',
  experience: 'Experience level',
  confidentTopics: 'Topics they feel confident sharing',
  learningTopics: 'Topics they want to learn',
  practicalSupport: 'Practical support they can offer',
  resourcesAccess: 'Access to resources or space',
  sharedResources: 'Resources they may be willing to share',
  helpFrequency: 'How often they can help',
  availability: 'Best availability',
  preferredRole: 'Preferred role',
  childOpportunities: 'Opportunities they want for children',
  parentLeadershipSupport: 'Support needed to help lead',
  anythingElse: 'Anything else',
}

function formatValue(value: unknown): string {
  if (Array.isArray(value)) return value.join(', ')
  if (typeof value === 'string') return value.trim()
  if (value == null) return ''
  return String(value)
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

function buildNotificationText(payload: LearningCollectivePayload) {
  const details = Object.entries(responseLabels)
    .map(([key, label]) => {
      const value = formatValue(payload[key])
      return value ? `${label}: ${value}` : ''
    })
    .filter(Boolean)

  return [
    'New website form submission',
    '',
    `Parent/Guardian: ${formatValue(payload.parentName)}`,
    `Phone: ${formatValue(payload.phone)}`,
    `Email: ${formatValue(payload.email)}`,
    `Children: ${formatChildren(payload.children)}`,
    `Preferred contact: ${formatValue(payload.preferredContact)}`,
    '',
    ...details,
  ].join('\n')
}

function buildDetailRows(payload: LearningCollectivePayload) {
  return Object.entries(responseLabels)
    .map(([key, label]) => {
      const value = formatValue(payload[key])
      if (!value) return ''
      return `
        <tr>
          <td style="padding:14px 16px;border-top:1px solid #eadfcd;vertical-align:top;width:34%;font-size:12px;line-height:1.4;text-transform:uppercase;letter-spacing:.08em;color:#8B6914;font-weight:700;">${escapeHtml(label)}</td>
          <td style="padding:14px 16px;border-top:1px solid #eadfcd;vertical-align:top;font-size:15px;line-height:1.55;color:#1C1C1C;white-space:pre-line;">${escapeHtml(value)}</td>
        </tr>`
    })
    .filter(Boolean)
    .join('')
}

function buildNotificationHtml(payload: LearningCollectivePayload) {
  const children = formatChildren(payload.children)
  const parentName = formatValue(payload.parentName)
  const phone = formatValue(payload.phone)
  const email = formatValue(payload.email)
  const preferredContact = formatValue(payload.preferredContact)

  return `<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#F7F3EC;font-family:Arial,Helvetica,sans-serif;color:#1C1C1C;">
    <div style="max-width:720px;margin:0 auto;padding:28px 16px;">
      <div style="background:#1B3A2D;color:#F7F3EC;border-radius:18px 18px 0 0;padding:24px 28px;">
        <p style="margin:0 0 6px;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#C9A96E;font-weight:700;">Forevermore Farm Website</p>
        <h1 style="margin:0;font-family:Georgia,serif;font-size:28px;line-height:1.2;">New Programs Form Submission</h1>
      </div>
      <div style="background:#ffffff;border:1px solid #eadfcd;border-top:0;border-radius:0 0 18px 18px;overflow:hidden;">
        <div style="padding:24px 28px;">
          <h2 style="margin:0 0 14px;font-family:Georgia,serif;font-size:22px;color:#1B3A2D;">${escapeHtml(parentName)}</h2>
          <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:8px 0;font-size:13px;color:#8B6914;font-weight:700;width:140px;">Phone</td><td style="padding:8px 0;font-size:15px;color:#1C1C1C;">${escapeHtml(phone)}</td></tr>
            <tr><td style="padding:8px 0;font-size:13px;color:#8B6914;font-weight:700;width:140px;">Email</td><td style="padding:8px 0;font-size:15px;color:#1C1C1C;"><a href="mailto:${escapeHtml(email)}" style="color:#1B3A2D;">${escapeHtml(email)}</a></td></tr>
            <tr><td style="padding:8px 0;font-size:13px;color:#8B6914;font-weight:700;width:140px;">Children</td><td style="padding:8px 0;font-size:15px;color:#1C1C1C;">${escapeHtml(children)}</td></tr>
            <tr><td style="padding:8px 0;font-size:13px;color:#8B6914;font-weight:700;width:140px;">Preferred contact</td><td style="padding:8px 0;font-size:15px;color:#1C1C1C;">${escapeHtml(preferredContact)}</td></tr>
          </table>
        </div>
        <div style="padding:0 28px 28px;">
          <h3 style="margin:0 0 12px;font-family:Georgia,serif;font-size:20px;color:#1B3A2D;">Survey details</h3>
          <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;background:#FBF8F1;border:1px solid #eadfcd;border-radius:12px;overflow:hidden;">${buildDetailRows(payload)}</table>
        </div>
        <div style="background:#F7F3EC;padding:16px 28px;font-size:13px;line-height:1.5;color:#4A6741;">This response is also saved in the Forevermore Farm admin page at /admin/learning-collective.</div>
      </div>
    </div>
  </body>
</html>`
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
      html: buildNotificationHtml(responsePayload),
      replyTo: email,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to submit Learning Collective survey' }, { status: 500 })
  }
}
