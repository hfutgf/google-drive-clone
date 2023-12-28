import { create } from "zustand";

interface IState {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const usePlan = create<IState>((set) => ({
  isOpen: false,
  onOpen: () => set((state: IState) => ({ isOpen: true })),
  onClose: () => set((state: IState) => ({ isOpen: false })),
}));
