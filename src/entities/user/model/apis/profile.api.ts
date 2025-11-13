import { createClient } from "@/shared/utils/supabase/client";

export const profileAPI = async (userId: string) => {
  const supabase = createClient();

  const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).single();

  if (error) {
    throw new Error(`Profile API failed: ${error.message}`);
  }

  return data;
};
