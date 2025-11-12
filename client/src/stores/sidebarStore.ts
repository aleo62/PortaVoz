import { create } from "zustand";

type Store = {
    isOpen: boolean;
    open: () => void;
    close: () => void;
    toggle: () => void;
};

export const useStoreSidebar = create<Store>((set) => ({
    isOpen: true,
    open: () => set(() => ({ isOpen: true })),
    close: () => set(() => ({ isOpen: false })),
    toggle: () => set(({ isOpen }) => ({ isOpen: !isOpen })),
}));
