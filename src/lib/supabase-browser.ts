import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// One shared browser client for the whole app.
// Creating a client per component (or per hot-reload in dev) is what triggers
// "Multiple GoTrueClient instances detected". Caching it on globalThis keeps it to one.
// The app signs users in with NextAuth, so Supabase is only used for realtime here
// and its own session handling is switched off.
const globalForSupabase = globalThis as unknown as { __supabaseBrowser?: SupabaseClient };

export const supabase: SupabaseClient =
  globalForSupabase.__supabaseBrowser ??
  (globalForSupabase.__supabaseBrowser = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false } }
  ));
