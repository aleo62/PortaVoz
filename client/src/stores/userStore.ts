import { UserData } from "@/utils/types/userDataType";
import { create } from "zustand";

type Store = {
    user: UserData | null;
    setUser: (user: UserData | null) => void;
    updateUser: (user: Partial<UserData>) => void;
    isLoadingUser: boolean;
    setIsLoadingUser: (isLoadingUser: boolean) => void;
};

export const useStoreUser = create<Store>((set) => ({
    user: null,
    setUser: (user) => set(() => ({ user })),
    updateUser: (data: Partial<UserData>) =>
        set((state) => ({
            user: state.user ? { ...state.user, ...data } : (data as UserData),
        })),
    isLoadingUser: true,
    setIsLoadingUser: (isLoadingUser) => set(() => ({ isLoadingUser }))
}));
