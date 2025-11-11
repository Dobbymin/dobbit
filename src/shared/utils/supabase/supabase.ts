import { cookies } from "next/headers";

import { createBrowserClient, createServerClient } from "@supabase/ssr";

import { Database } from "../../types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// 서버 컴포넌트용 클라이언트
export const createClient = (cookieStore: ReturnType<typeof cookies>) => {
  return createServerClient<Database>(supabaseUrl!, supabaseKey!, {
    cookies: {
      async getAll() {
        return (await cookieStore).getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(async ({ name, value, options }) => (await cookieStore).set(name, value, options));
        } catch {
          // The `setAll` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing
          // user sessions.
        }
      },
    },
  });
};
