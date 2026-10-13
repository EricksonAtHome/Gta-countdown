import { getDb, ensureTablesExist } from '../utils/db'

export default defineEventHandler(async (event) => {
  const body = await readBody<{ page?: string; referrer?: string }>(event).catch(() => ({}))

  const page = (body?.page || '/').slice(0, 100)
  const referrer = (body?.referrer || getHeader(event, 'referer') || '').slice(0, 255)
  const clientIp = getRequestIP(event, { xForwardedFor: true }) || ''
  const userAgent = (getHeader(event, 'user-agent') || '').slice(0, 500)

  try {
    await ensureTablesExist()
    const sql = getDb()

    await sql`
      INSERT INTO page_views (page, ip_address, user_agent, referrer)
      VALUES (${page}, ${clientIp}, ${userAgent}, ${referrer});
    `

    const views = await sql`SELECT count(*)::int as count FROM page_views WHERE page = ${page};`

    return {
      success: true,
      page,
      pageViews: views[0]?.count || 1,
    }
  } catch (err: any) {
    console.error('Failed to log page view to Neon:', err)
    return {
      success: false,
      error: err.message,
    }
  }
})
