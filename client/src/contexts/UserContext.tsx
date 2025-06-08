import { db } from "@/firebase";
import { UserData } from "@/utils/types/userDataType";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { doc, DocumentData, getDoc, updateDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";

type UserContextType = {
    user: User | null;
    userData: UserData | DocumentData | null;
    setUserData: React.Dispatch<React.SetStateAction<UserData | DocumentData | null>>;
    updateUser: (data: Partial<UserData>) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [userData, setUserData] = useState<UserData | DocumentData | null>(null);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setUser(user);
            if (user) {
                try {
                    const docSnap = await getDoc(doc(db, "Users", user.uid));
                    if (docSnap.exists()) setUserData(docSnap.data());
                    if (userData?.phone === undefined)
                        setUserData((prev) => ({ ...prev, phone: "" }));
                } catch (error) {
                    console.error("Erro ao buscar dados do usuário:", error);
                    setUserData(null);
                }
            } else {
                setUserData(null);
            }
        });

        return () => unsubscribe();
    }, []);

    const updateUser = async (data: Partial<UserData>) => {
        if (!user) return;

        const userRef = doc(db, "Users", user.uid);
        await updateDoc(userRef, data);
        setUserData((prev) => ({ ...prev, ...(data as Record<string, unknown>) }));
    };

    return (
        <UserContext.Provider value={{ user, userData, setUserData, updateUser }}>
            {children}
        </UserContext.Provider>
    );
};
export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};
