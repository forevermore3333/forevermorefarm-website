import { NextRequest, NextResponse } from 'next/server'
import { resend } from '@/lib/resend'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, category, message, type } = body

    const subject = type === 'email_signup'
      ? `New email signup: ${email}`
      : `New contact form: ${category} from ${name}`

    const text = type === 'email_signup'
      ? `New email list signup: ${email}`
      : `Name: ${name}\nEmail: ${email}\nCategory: ${category}\n\nMessage:\n${message}`

    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: process.env.CONTACT_EMAIL || 'placeholder@example.com',
      subject,
      text,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 })
  }
}
