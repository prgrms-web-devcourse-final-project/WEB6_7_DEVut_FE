import { create } from "zustand";

type AuthState = {
  user: User | null;
  isHydrated: boolean; // false: 아직 me() 확인 중, true: me() 확인 완료. 진짜 로그인 여부 판단 가능

  setUser: (user: User | null) => void;
  setHydrated: (v: boolean) => void;

  logoutLocal: () => void;
};

export const useAuthStore = create<AuthState>(set => ({
  user: null,
  isHydrated: false,

  setUser: user => set({ user }),
  setHydrated: v => set({ isHydrated: v }),

  logoutLocal: () => set({ user: null }),
}));
