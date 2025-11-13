import { useQuery } from "@tanstack/react-query";

import { profileAPI } from "../apis";
import { PROFILE_QUERY_KEYS } from "../constants";

export const useGetProfiles = (userId?: string) => {
  return useQuery({
    queryKey: PROFILE_QUERY_KEYS.profile.byId(userId!),
    queryFn: () => profileAPI(userId!),
    enabled: !!userId,
  });
};
