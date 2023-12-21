import { create } from "zustand";

interface ILayoutStore {
  layout: "list" | "grid";
  setLayout: (layout: "list" | "grid") => void;
}

export const useLayout = create<ILayoutStore>((set) => ({
  layout: "list",
  setLayout: (layout) => set({ layout }),
}));
