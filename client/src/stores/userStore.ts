import { UserData } from "@/types/userDataType";
import { User } from "firebase/auth";
import { create } from "zustand";

type Store = {
    user: UserData | null;
    auth: User | null;
    setUser: (user: UserData | null) => void;
    setAuth: (auth: User | null) => void;
    updateUser: (user: Partial<UserData>) => void;
    isLoadingUser: boolean;
    setIsLoadingUser: (isLoadingUser: boolean) => void;
};

export const useStoreUser = create<Store>((set) => ({
    user: null,
    auth: null,
    setUser: (user) => set(() => ({ user })),
    setAuth: (auth) => set(() => ({ auth })),
    updateUser: (data: Partial<UserData>) =>
        set((state) => ({
            user: state.user ? { ...state.user, ...data } : (data as UserData),
        })),
    isLoadingUser: true,
    setIsLoadingUser: (isLoadingUser) => set(() => ({ isLoadingUser })),
}));
