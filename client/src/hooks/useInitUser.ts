import { Server } from "@/api/Server";
import { useStoreUser } from "@/stores/userStore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";

export const useInitUser = () => {
    const { setUser, setIsLoadingUser, setAuth } = useStoreUser();

    const auth = getAuth();
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (userAuth) => {
            setIsLoadingUser(true);
            if (userAuth) {
                setAuth(userAuth);
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
                } finally {
                    setIsLoadingUser(false);
                }
            } else {
                setAuth(null);
                setUser(null);
                setIsLoadingUser(false);
            }
        });

        return () => unsubscribe();
    }, [auth]);
};
