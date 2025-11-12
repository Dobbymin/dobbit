import { createClient } from "@/shared";

export const logoutAPI = async () => {
  const supabase = createClient();

  const { error } = await supabase.auth.signOut();

  if (error) throw error;
};
