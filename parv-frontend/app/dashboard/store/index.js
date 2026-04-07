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
  setShowLoader: (value) => set({ showLoader: value }),
  setShowInfo: (value) => set({ showInfo: value }),
  setInfo: (value) => set({ info: value }),
  setProfile: (value) => set({ profile: value }),
  setUser: (value) => set({ user: value }),
}));
