import { useSessionStore } from "../store";

export const useGetSession = () => {
  const session = useSessionStore((state) => state.session);
  return session;
};

export const useIsSessionLoaded = () => {
  const isSessionLoaded = useSessionStore((state) => state.isLoaded);
  return isSessionLoaded;
};

export const useSetSession = () => {
  const setSession = useSessionStore((state) => state.actions.setSession);
  return setSession;
};
