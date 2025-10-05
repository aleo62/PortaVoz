import { UserData } from "@/utils/types/userDataType";
import { create } from "zustand";

type Store = {
    user: UserData | null;
    setUser: (user: UserData) => void;
    updateUser: (user: Partial<UserData>) => void;
};

export const useStoreUser = create<Store>((set) => ({
    user: null,
    setUser: (user: UserData) => set(() => ({ user })),
    updateUser: (data: Partial<UserData>) =>
        set((state) => ({
            user: state.user ? { ...state.user, ...data } : (data as UserData),
        })),
}));
