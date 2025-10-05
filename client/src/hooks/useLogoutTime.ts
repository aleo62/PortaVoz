import { auth } from "@/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect } from "react";

const SESSION_DURATION = 3 * 1000 * 60 * 60; ; // 3 horas

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
                    }
                }, SESSION_DURATION);
            }
        });

        return () => unsubscribe();
    }, []);
};
