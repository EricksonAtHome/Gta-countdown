import { neon } from '@neondatabase/serverless'

let sqlInstance: ReturnType<typeof neon> | null = null

export function getDb() {
  if (!sqlInstance) {
    const config = useRuntimeConfig()
    const dbUrl =
      (config.databaseUrl as string) ||
      process.env.DATABASE_URL ||
      'postgresql://neondb_owner:npg_ahD3nmyFAc7Y@ep-small-darkness-b5weanu9-pooler.c-7.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require'
    sqlInstance = neon(dbUrl)
  }
  return sqlInstance
}

let tablesReady = false

export async function ensureTablesExist() {
  if (tablesReady) return
  const sql = getDb()

  await sql`
    CREATE TABLE IF NOT EXISTS subscribers (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      subscribed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      source_page VARCHAR(100) DEFAULT '/',
      ip_address VARCHAR(100),
      user_agent TEXT,
      notified_admin BOOLEAN DEFAULT FALSE
    );
  `

  await sql`
    CREATE TABLE IF NOT EXISTS page_views (
      id SERIAL PRIMARY KEY,
      page VARCHAR(100) NOT NULL,
      visited_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      ip_address VARCHAR(100),
      user_agent TEXT,
      referrer TEXT
    );
  `

  tablesReady = true
}
