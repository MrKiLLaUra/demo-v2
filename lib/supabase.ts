import { createClient, type SupabaseClient } from "@supabase/supabase-js"

let _client: SupabaseClient | null = null

export function getSupabase(): SupabaseClient | null {
  if (!_client) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    if (!url || !key) return null
    _client = createClient(url, key, {
      global: { fetch: (url, init) => fetch(url, { ...init, cache: "no-store" }) },
    })
  }
  return _client
}

// Proxy so existing `supabase.from(...)` call sites keep working unchanged
export const supabase = new Proxy({} as SupabaseClient, {
  get(_, prop) {
    const client = getSupabase()
    if (!client) return () => ({ data: null, error: null })
    return client[prop as keyof SupabaseClient]
  },
})
