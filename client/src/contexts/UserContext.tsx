import { db } from "@/firebase";
import { UserData } from "@/utils/types/userDataType";
import { getAuth, IdTokenResult, onAuthStateChanged, User } from "firebase/auth";
import {
    collection,
    doc,
    DocumentData,
    getDoc,
    getDocs,
    query,
    updateDoc,
    where,
} from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";

type UserContextType = {
    user: User | null;
    userData: UserData | DocumentData | null;
    userDecoded: IdTokenResult | null;
    userTags: DocumentData;
    setUserData: React.Dispatch<React.SetStateAction<UserData | DocumentData | null>>;
    updateUser: (data: Partial<UserData>) => void;
    isFetching?: boolean;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [userData, setUserData] = useState<UserData | DocumentData | null>(null);
    const [userDecoded, setUserDecoded] = useState<IdTokenResult | null>(null);
    const [userTags, setUserTags] = useState<DocumentData[]>([]);
    const [isFetching, setIsFetching] = useState(true);

    useEffect(() => {
        const auth = getAuth();
        setIsFetching(true);
        const unsubscribe = onAuthStateChanged(auth, async (userAuth) => {
            setUser(userAuth);
            if (userAuth) {
                const tokenResult = await userAuth.getIdTokenResult(true);
                setUserDecoded(tokenResult);
                try {
                    const docSnap = await getDoc(doc(db, "Users", userAuth.uid));
                    if (docSnap.exists()) setUserData(docSnap.data());
                    if (userData?.phone === undefined)
                        setUserData((prev) => ({ ...prev, phone: "" }));

                    const tagsRef = collection(db, "Tags");
                    const q = query(tagsRef, where("User", "==", userAuth.uid));
                    const querySnapshot = await getDocs(q);
                    const tagsData = querySnapshot.docs.map((doc) => doc.data());
                    setUserTags(tagsData);
                } catch (error) {
                    console.error("Erro ao buscar dados do usuário ou tags:", error);
                    setUserData(null);
                    setUserTags([]);
                    setUserDecoded(null);
                }
            } else {
                setUserData(null);
                setUserTags([]);
            }
            setIsFetching(false);
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
        <UserContext.Provider
            value={{ user, userData, userDecoded, setUserData, updateUser, userTags, isFetching }}
        >
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
