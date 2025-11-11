import { create } from "zustand";
import { combine, devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export type AccessTokenState = {
  accessToken: string | null;
};

const initialState: AccessTokenState = {
  accessToken: null,
};

export const useAuthStore = create(
  devtools(
    persist(
      immer(
        combine(initialState, (set) => ({
          setAccessToken: (token: string) =>
            set((state) => {
              state.accessToken = token;
            }),
          clearAccessToken: () =>
            set((state) => {
              state.accessToken = null;
            }),
        })),
      ),
      {
        name: "accessToken", // localStorage에 저장될 키 이름
      },
    ),
    {
      name: "auth-store", // Redux DevTools에서 표시될 스토어 이름
    },
  ),
);
