"use server"

import { createServerSupabase } from "@/lib/supabase/server"

export async function saveToken(token: string) {
  const supabase = createServerSupabase()
  const { error } = await supabase
    .from("purchase_tokens")
    .upsert({ token, used: false }, { onConflict: "token" })
  return !error
}

export async function validateToken(token: string) {
  const supabase = createServerSupabase()
  const { data } = await supabase
    .from("purchase_tokens")
    .select("used")
    .eq("token", token)
    .single()
  return data !== null && data.used === false
}

export async function markTokenAsUsed(token: string) {
  const supabase = createServerSupabase()
  const { error } = await supabase
    .from("purchase_tokens")
    .update({ used: true, used_at: new Date().toISOString() })
    .eq("token", token)
  return !error
}
