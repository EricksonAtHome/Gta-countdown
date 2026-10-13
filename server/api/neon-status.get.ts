import { getDb, ensureTablesExist } from '../utils/db'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const results: Record<string, any> = {}

  // 1. Test Neon Postgres
  try {
    await ensureTablesExist()
    const sql = getDb()
    const dbTest = await sql`SELECT NOW() as db_time, current_database(), current_user, version();`
    results.postgres = {
      status: 'connected',
      database: dbTest[0]?.current_database,
      user: dbTest[0]?.current_user,
      time: dbTest[0]?.db_time,
    }
  } catch (err: any) {
    results.postgres = {
      status: 'error',
      error: err.message,
    }
  }

  // 2. Test Neon Functions
  const functionUrl =
    (config.neonFunctionHelloBaseUrl as string) ||
    process.env.NEON_FUNCTION_HELLO_BASE_URL ||
    'https://br-shiny-block-b59rkvhs-hello.compute.c-7.us-east-2.aws.neon.tech'

  if (functionUrl) {
    try {
      const res = await $fetch<string>(functionUrl, { responseType: 'text' })
      results.functions = {
        status: 'online',
        url: functionUrl,
        response: res.trim(),
      }
    } catch (err: any) {
      results.functions = {
        status: 'error',
        url: functionUrl,
        error: err.message,
      }
    }
  }

  return {
    success: results.postgres?.status === 'connected',
    branch: config.neonBranch || process.env.NEON_BRANCH || 'production',
    services: results,
  }
})
