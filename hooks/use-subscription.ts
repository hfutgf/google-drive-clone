import { create } from "zustand";

type SubsPlan = {
  subscription: "Basic" | "Pro";
  setSubsription: (plan: "Basic" | "Pro") => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  totalStorage: number;
  setTotalStorage: (totaleStorage: number) => void;
};

export const useSubscription = create<SubsPlan>((set) => ({
  subscription: "Basic",
  setSubsription: (subscription) => set({ subscription }),
  isLoading: true,
  setIsLoading: (isLoading) => set({ isLoading }),
  totalStorage: 0,
  setTotalStorage: (totalStorage) =>
    set({
      totalStorage,
    }),
}));
