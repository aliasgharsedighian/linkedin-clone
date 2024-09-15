import { create } from "zustand";

type Store = {
  showMessage: boolean;
  setShowMessage: (action: boolean) => void;
};

export const useAppStore = create<Store>()((set) => ({
  showMessage: false,
  setShowMessage: (action) => set((state) => ({ showMessage: action })),
}));
