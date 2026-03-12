import { NextRequest, NextResponse } from 'next/server'
import { getResend } from '@/lib/resend'
import { initDb, insertSubscriber } from '@/lib/db'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, phone, category, message, type, source } = body
    const resend = getResend()

    if (type === 'email_signup') {
      // 0. Persist to Postgres
      await initDb()
      await insertSubscriber(name, email, phone, source ?? 'homepage')

      // 1. Add to Resend audience
      await resend.contacts.create({
        email,
        unsubscribed: false,
        audienceId: process.env.RESEND_AUDIENCE_ID!,
      })

      // 2. Send confirmation email to subscriber
      await resend.emails.send({
        from: 'Forevermore Farm <hello@forevermorefarmtn.com>',
        to: email,
        subject: 'You\'re on the list.',
        html: `
          <div style="font-family: Georgia, serif; max-width: 560px; margin: 0 auto; padding: 40px 20px; color: #2c2c2c;">
            <h1 style="font-size: 28px; font-weight: normal; margin-bottom: 16px;">Welcome to Forevermore Farm.</h1>
            <p style="font-size: 16px; line-height: 1.7; color: #555;">Hi ${name},</p>
            <p style="font-size: 16px; line-height: 1.7; color: #555;">You're on the list. We'll be in touch about events, farm stays, workshops, and what's growing on the land in Lyles, Tennessee.</p>
            <p style="font-size: 16px; line-height: 1.7; color: #555;">We don't send noise. When we reach out, it'll be worth opening.</p>
            <p style="font-size: 16px; line-height: 1.7; color: #555;">— Olin &amp; Concetta</p>
            <hr style="border: none; border-top: 1px solid #e0d9cc; margin: 32px 0;" />
            <p style="font-size: 12px; color: #aaa;">Forevermore Farm · 302 Hickory Trce, Lyles TN 37098 · <a href="https://forevermorefarmtn.com" style="color: #aaa;">forevermorefarmtn.com</a></p>
          </div>
        `,
      })

      // 3. Notify the farm
      await resend.emails.send({
        from: 'Forevermore Farm <hello@forevermorefarmtn.com>',
        to: process.env.CONTACT_EMAIL!,
        subject: `New signup: ${email}`,
        text: `New email list signup:\nName: ${name}\nEmail: ${email}\nPhone: ${phone ?? 'not provided'}\nSource: ${source ?? 'homepage'}`,
      })

    } else {
      // Contact form submission
      await resend.emails.send({
        from: 'Forevermore Farm <hello@forevermorefarmtn.com>',
        to: process.env.CONTACT_EMAIL!,
        subject: `New contact form: ${category} from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nCategory: ${category}\n\nMessage:\n${message}`,
        replyTo: email,
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 })
  }
}
