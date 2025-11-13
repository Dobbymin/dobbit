import { createClient } from "@/shared";

export const userAPI = async () => {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error) throw error;

  return data;
};
