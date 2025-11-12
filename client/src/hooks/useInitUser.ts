import { Server } from "@/api/Server";
import { useStoreUser } from "@/stores/userStore";
import { getAuth, onIdTokenChanged } from "firebase/auth";
import { useEffect } from "react";

export const useInitUser = () => {
    const { setUser, setIsLoadingUser, setAuth } = useStoreUser();

    const auth = getAuth();
    useEffect(() => {
        const unsubscribe = onIdTokenChanged(auth, async (userAuth) => {
            if (!userAuth) {
                setAuth(null);
                setUser(null);
                setIsLoadingUser(false);
                return;
            }

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
        });

        return () => unsubscribe();
    }, [auth]);
};
