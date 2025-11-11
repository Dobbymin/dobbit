import { createClient } from "@/shared/utils/supabase/client";

export interface LoginParams {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
}

export const loginAPI = async ({ email, password }: LoginParams) => {
  const supabase = createClient();

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) throw error;

  return data;
};
