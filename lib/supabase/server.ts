import { createClient } from "@supabase/supabase-js"

/**
 * Server-side Supabase client.
 * Used in Server Components, Server Actions, and Route Handlers.
 * Creates a fresh instance each time (no singleton needed on server).
 */
export function createServerSupabase() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

  return createClient(supabaseUrl, supabaseAnonKey)
}
