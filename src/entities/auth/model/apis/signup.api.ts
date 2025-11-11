import { createClient } from "@/shared/utils/supabase/client";

interface SignupParams {
  email: string;
  password: string;
}

export const signupAPI = async ({ email, password }: SignupParams) => {
  const supabase = createClient();

  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) throw error;

  return data;
};
