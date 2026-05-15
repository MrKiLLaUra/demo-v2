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

// Chainable mock returned when Supabase isn't configured.
// Every method call returns the same chain; awaiting it resolves to { data: null, error: null }.
function makeMock(): any {
  const empty = Promise.resolve({ data: null, error: null })
  const chain: any = new Proxy(function () {}, {
    get(_, prop: string) {
      if (prop === "then")     return empty.then.bind(empty)
      if (prop === "catch")    return empty.catch.bind(empty)
      if (prop === "finally")  return empty.finally.bind(empty)
      if (prop === "data")     return null
      if (prop === "error")    return null
      // storage.from().getPublicUrl() returns { data: { publicUrl: "" } }
      if (prop === "getPublicUrl") return () => ({ data: { publicUrl: "" } })
      if (prop === "from")     return () => chain
      return () => chain
    },
    apply() { return chain },
  })
  return chain
}

export const supabase = new Proxy({} as SupabaseClient, {
  get(_, prop: string) {
    const client = getSupabase()
    if (!client) {
      if (prop === "storage") return makeMock()
      return makeMock()[prop]
    }
    const val = (client as any)[prop]
    return typeof val === "function" ? val.bind(client) : val
  },
})
