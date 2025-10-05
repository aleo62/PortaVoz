import { Server } from "@/api/Server";
import { useStoreUser } from "@/stores/userStore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const { setUser } = useStoreUser();

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, async (userAuth) => {
            if (userAuth) {
                try {
                    const decoded = await userAuth.getIdTokenResult(true);
                    const userData = await Server.getUserById(userAuth.uid, decoded.token);
                    setUser({
                        ...userData,
                        token: decoded.token,
                        claims: decoded.claims,
                        isVerified: userAuth.emailVerified,
                    });
                } catch (err) {
                    console.error("Erro ao buscar usuário:", err);
                }
            }
        });

        return () => unsubscribe();
    }, [setUser]);

    return <>{children}</>;
};
