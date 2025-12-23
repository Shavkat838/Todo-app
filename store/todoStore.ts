import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ModeType = "KUN" | "TUN";


type Store = {
  open: boolean;
  editingId: number;
  title: string;
  filter: string;
  description: string;
  date: string;
  isImportant: boolean;
  isCompleted: boolean;
  openSidebar: boolean;
  ismode: ModeType;
  setOpenSidebar: () => void;
  setModePage: (item: ModeType) => void;
  setFilter: (item: string) => void;
  setEditingId: (item: number) => void;
  setImportant: (item: boolean) => void;
  setCompleted: (item: boolean) => void;
  setTitle: (item: string) => void;
  setDescription: (item: string) => void;
  setDate: (item: string) => void;
  setOpen: () => void;
  setClose: () => void;
};

const useTodoStore = create<Store>()(
    (set) => ({
      open: false,
      todos:[],
      filter: "ALL",
      ismode: "KUN",
      hasHydrated: false,
      editingId: -1,
      title: "",
      date: "",
      description: "",
      isImportant: false,
      isCompleted: false,
      openSidebar: false,

      
      setModePage: (item) => set({ ismode: item }),
      setOpenSidebar: () =>
      set((state) => ({ openSidebar: !state.openSidebar })),
      setFilter: (item) => set({ filter: item }),
      setEditingId: (item) => set({ editingId: item }),
      setCompleted: (item) => set({ isCompleted: item }),
      setImportant: (item) => set({ isImportant: item }),
      setTitle: (item) => set({ title: item }),
      setDate: (item) => set({ date: item }),
      setDescription: (item) => set({ description: item }),
      setOpen: () => set({ open: true }),
      setClose: () =>
        set({
          editingId: -1,
          title: "",
          description: "",
          isCompleted: false,
          isImportant: false,
          date: "",
          open: false,
        }),
    }),
);

export default useTodoStore;
