import { create } from "zustand";

export const useUserState = create((set) => ({
  profile: {},
  user: {},
  showLoader: false,
  showInfo: false,
  info: {
    desc: "",
    highlight: "",
  },
  setShowLoader: (value) => set((state) => ({ ...state, showLoader: value })),
  setShowInfo: (value) => set((state) => ({ ...state, showInfo: value })),
  setInfo: (value) => set((state) => ({ ...state, info: value })),
  setProfile: (value) => set((state) => ({ ...state, profile: value })),
  setUser: (value) => set((state) => ({ ...state, user: value })),
}));
