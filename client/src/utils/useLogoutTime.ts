import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect } from "react";

const auth = getAuth();
const SESSION_DURATION = 30 * 60 * 1000; // 30 minutos

export const useAutoLogout = () => {
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const loginTime = Date.now();

                const logoutTimer = setInterval(() => {
                    const now = Date.now();
                    if (now - loginTime > SESSION_DURATION) {
                        signOut(auth);
                        clearInterval(logoutTimer);
                        alert("Sua sessão expirou. Faça login novamente.");
                    }
                }, 60 * 1000); // checa a cada minuto
            }
        });

        return () => unsubscribe();
    }, []);
}
