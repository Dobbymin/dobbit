import { User } from "@supabase/supabase-js";

export type UserMetadata = {
  nickname?: string;
  full_name?: string;
  avatar_url?: string;
};

export type WalletUser = Pick<User, "id" | "email"> & {
  user_metadata: UserMetadata;
};
