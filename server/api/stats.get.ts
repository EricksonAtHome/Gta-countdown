import { getDb, ensureTablesExist } from '../utils/db'

export default defineEventHandler(async () => {
  await ensureTablesExist()
  const sql = getDb()

  const subscriberCount = await sql`SELECT count(*)::int as count FROM subscribers;`
  const totalViews = await sql`SELECT count(*)::int as count FROM page_views;`
  const viewsByPage = await sql`
    SELECT page, count(*)::int as views
    FROM page_views
    GROUP BY page
    ORDER BY views DESC;
  `
  const latestSubscribers = await sql`
    SELECT id, email, subscribed_at, source_page
    FROM subscribers
    ORDER BY subscribed_at DESC
    LIMIT 10;
  `

  return {
    database: 'Neon Postgres (production)',
    totalSubscribers: subscriberCount[0]?.count || 0,
    totalPageViews: totalViews[0]?.count || 0,
    viewsByPage,
    recentSubscribers: latestSubscribers,
  }
})
