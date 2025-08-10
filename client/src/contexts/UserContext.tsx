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
    fetchUser: (publicId: string) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [userData, setUserData] = useState<UserData | DocumentData | null>(null);
    const [userDecoded, setUserDecoded] = useState<IdTokenResult | null>(null);
    const [userTags, setUserTags] = useState<DocumentData[]>([]);
    const [isFetching, setIsFetching] = useState(true);

    const fetchUserData = async (userAuth: User) => {
        try {
            const userDoc = await getDoc(doc(db, "Users", userAuth?.uid));
            return userDoc.data();
        } catch (err) {
            console.log("Erro em capturar user data: ", err);
        }
    };

    const fetchUserTags = async (userAuth: User) => {
        try {
            const tagsRef = collection(db, "Tags");

            const q = query(tagsRef, where("User", "==", userAuth.uid));
            const tagsDoc = await getDocs(q);

            const tagsData = tagsDoc.docs.map((doc) => doc.data());
            return tagsData;
        } catch (err) {
            console.log("Erro em capturar as tags: ", err);
        }
    };

    const fetchUserDecoded = async (userAuth: User) => {
        try {
            const userDecoded = await userAuth.getIdTokenResult(true);
            return userDecoded;
        } catch (err) {
            console.log("Erro em capturar o user decoded: ", err);
        }
    };

    useEffect(() => {
        setIsFetching(true);

        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, async (userAuth) => {
            setUser(userAuth);

            if (userAuth) {
                setUserData((await fetchUserData(userAuth))!);
                setUserTags((await fetchUserTags(userAuth))!);
                setUserDecoded((await fetchUserDecoded(userAuth))!);
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

    const fetchUser = async (publicId: string) => {
        const q = await query(collection(db, "Users"), where("_publicId", "==", publicId));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) return null;

        const userDoc = querySnapshot.docs[0];
        return userDoc.data() as UserData;
    };

    return (
        <UserContext.Provider
            value={{
                user,
                userData,
                userDecoded,
                setUserData,
                updateUser,
                userTags,
                fetchUser,
                isFetching,
            }}
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
