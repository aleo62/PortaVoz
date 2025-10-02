import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";

type UserDecoded = {
    uid: string;
    token: string;
    claims: Record<string, any>;
    isVerified: boolean;
};

type UserContextType = {
    userDecoded: UserDecoded | null;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [userDecoded, setUserDecoded] = useState<UserDecoded | null>(null);

    const fetchUserDecoded = async (userAuth: User) => {
        const tokenResult = await userAuth.getIdTokenResult(true);
        return {
            uid: userAuth.uid,
            token: tokenResult.token,
            claims: tokenResult.claims,
            isVerified: userAuth.emailVerified
        };
    };

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, async (userAuth) => {
            if (userAuth) {
                setUserDecoded(await fetchUserDecoded(userAuth));
            } else {
                setUserDecoded(null);
            }
        });

        return () => unsubscribe();
    }, []);

    return <UserContext.Provider value={{ userDecoded }}>{children}</UserContext.Provider>;
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};
