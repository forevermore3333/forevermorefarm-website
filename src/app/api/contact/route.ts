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

    } else if (type === 'guide_download') {
      // 0. Persist to Postgres
      await initDb()
      await insertSubscriber(name, email, phone, 'conditioning-guide')

      // 1. Add to Resend audience
      await resend.contacts.create({
        email,
        unsubscribed: false,
        audienceId: process.env.RESEND_AUDIENCE_ID!,
      })

      // 2. Send confirmation email with download link
      await resend.emails.send({
        from: 'Forevermore Farm <hello@forevermorefarmtn.com>',
        to: email,
        subject: 'Your Straw Bale Conditioning Guide',
        html: `
          <div style="font-family: Georgia, serif; max-width: 560px; margin: 0 auto; padding: 40px 20px; color: #2c2c2c;">
            <h1 style="font-size: 28px; font-weight: normal; margin-bottom: 16px;">Here&rsquo;s your conditioning guide.</h1>
            <p style="font-size: 16px; line-height: 1.7; color: #555;">Hi ${name},</p>
            <p style="font-size: 16px; line-height: 1.7; color: #555;">Thanks for grabbing this. Below is the link to the complete 12-day straw bale conditioning schedule:</p>
            <p style="margin: 24px 0;">
              <a href="https://forevermorefarmtn.com/downloads/straw-bale-conditioning-guide.pdf"
                 style="background-color: #5c4a32; color: #faf7f2; padding: 12px 24px; text-decoration: none; font-size: 15px; border-radius: 2px; display: inline-block;">
                Download the Guide
              </a>
            </p>
            <p style="font-size: 16px; line-height: 1.7; color: #555;">Start conditioning your bales about 12 days before your target planting date. If you&rsquo;re aiming for April 1st, mid-March is your window.</p>
            <p style="font-size: 16px; line-height: 1.7; color: #555;">If you have questions along the way, just reply to this email. We&rsquo;re happy to help.</p>
            <p style="font-size: 16px; line-height: 1.7; color: #555;">— Concetta &amp; Olin<br/>Forevermore Farm</p>
            <hr style="border: none; border-top: 1px solid #e0d9cc; margin: 32px 0;" />
            <p style="font-size: 12px; color: #aaa;">Forevermore Farm · 302 Hickory Trce, Lyles TN 37098 · <a href="https://forevermorefarmtn.com" style="color: #aaa;">forevermorefarmtn.com</a></p>
          </div>
        `,
      })

      // 3. Notify the farm
      await resend.emails.send({
        from: 'Forevermore Farm <hello@forevermorefarmtn.com>',
        to: process.env.CONTACT_EMAIL!,
        subject: `Guide download: ${email}`,
        text: `New conditioning guide download:\nName: ${name}\nEmail: ${email}\nPhone: ${phone ?? 'not provided'}\nSource: conditioning-guide`,
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
