import fs from 'node:fs'
import path from 'node:path'
import nodemailer from 'nodemailer'
import { getDb, ensureTablesExist } from '../utils/db'

interface LocalSubscriber {
  email: string
  subscribedAt: string
  ip?: string
  userAgent?: string
  sourcePage?: string
  notifiedAdmin: boolean
}

const DATA_DIR = path.resolve(process.cwd(), 'data')
const SUBSCRIBERS_FILE = path.join(DATA_DIR, 'subscribers.json')

function saveToLocalBackup(item: LocalSubscriber) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true })
    }
    let list: LocalSubscriber[] = []
    if (fs.existsSync(SUBSCRIBERS_FILE)) {
      list = JSON.parse(fs.readFileSync(SUBSCRIBERS_FILE, 'utf8'))
    }
    if (!list.some((s) => s.email === item.email)) {
      list.push(item)
      fs.writeFileSync(SUBSCRIBERS_FILE, JSON.stringify(list, null, 2), 'utf8')
    }
  } catch (err) {
    console.error('Local backup write error:', err)
  }
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const body = await readBody<{ email?: string; sourcePage?: string }>(event)

  const rawEmail = (body?.email || '').trim().toLowerCase()
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!rawEmail || !emailRegex.test(rawEmail)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Please provide a valid email address.',
    })
  }

  const clientIp = getRequestIP(event, { xForwardedFor: true }) || ''
  const userAgent = getHeader(event, 'user-agent') || ''
  const sourcePage = body?.sourcePage || '/'

  // 1. Neon Database Storage
  await ensureTablesExist()
  const sql = getDb()

  const existingRows = await sql`
    SELECT id, email, subscribed_at FROM subscribers WHERE email = ${rawEmail} LIMIT 1;
  `

  if (existingRows.length > 0) {
    return {
      success: true,
      alreadySubscribed: true,
      message: "You're already on the list! (This is not a pre-order) You'll get an email when you can play.",
    }
  }

  // 2. Dispatch Email Notification to readyforgta@ericksonholding.com
  const targetAdminEmail = (config.notifyEmail as string) || 'readyforgta@ericksonholding.com'
  let notifiedAdmin = false

  const smtpHost = (config.smtpHost as string) || process.env.SMTP_HOST
  const smtpUser = (config.smtpUser as string) || process.env.SMTP_USER
  const smtpPass = (config.smtpPass as string) || process.env.SMTP_PASS
  const smtpPort = Number((config.smtpPort as string) || process.env.SMTP_PORT || 587)
  const smtpFrom =
    (config.smtpFrom as string) ||
    process.env.SMTP_FROM ||
    'GTA 6 Countdown <readyforgta@ericksonholding.com>'

  if (smtpHost && smtpUser && smtpPass) {
    try {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      })

      await transporter.sendMail({
        from: smtpFrom,
        to: targetAdminEmail,
        subject: `🎮 New GTA 6 Subscriber: ${rawEmail}`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 560px; margin: 0 auto; padding: 24px; background: #120c1f; color: #ffffff; border-radius: 12px; border: 1px solid #ff4182;">
            <h2 style="color: #ff529a; margin-top: 0;">🎮 New GTA 6 Subscriber!</h2>
            <p style="font-size: 16px; color: #f3f4f6;">A new visitor has signed up to get notified for the GTA 6 release:</p>
            <div style="background: rgba(255, 255, 255, 0.08); padding: 16px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 4px 0;"><strong>Email:</strong> <span style="color: #38bdf8;">${rawEmail}</span></p>
              <p style="margin: 4px 0;"><strong>Date:</strong> ${new Date().toUTCString()}</p>
              <p style="margin: 4px 0;"><strong>Source Page:</strong> ${sourcePage}</p>
              <p style="margin: 4px 0;"><strong>Database:</strong> Neon Postgres (production)</p>
            </div>
            <p style="font-size: 13px; color: #9ca3af; margin-bottom: 0;">This email was sent automatically from your GTA 6 Countdown website.</p>
          </div>
        `,
      })
      notifiedAdmin = true
      console.log(`[Neon Waitlist] Email alert sent to ${targetAdminEmail}`)
    } catch (err: any) {
      console.error(`[Neon Waitlist] SMTP dispatch error to ${targetAdminEmail}:`, err.message || err)
    }
  }

  // 3. Insert into Neon Postgres
  await sql`
    INSERT INTO subscribers (email, source_page, ip_address, user_agent, notified_admin)
    VALUES (${rawEmail}, ${sourcePage}, ${clientIp}, ${userAgent}, ${notifiedAdmin})
    ON CONFLICT (email) DO NOTHING;
  `

  // 4. Save to local fallback backup file
  saveToLocalBackup({
    email: rawEmail,
    subscribedAt: new Date().toISOString(),
    ip: clientIp,
    userAgent,
    sourcePage,
    notifiedAdmin,
  })

  // 5. Query total subscriber count directly from Neon
  const countRows = await sql`SELECT count(*)::int as count FROM subscribers;`
  const totalSubscribers = countRows[0]?.count || 1

  return {
    success: true,
    message: "You're on the list! (This is not a pre-order) You'll get an email when you can play.",
    totalSubscribers,
    database: 'neon-postgres',
    notifiedAdmin,
  }
})
