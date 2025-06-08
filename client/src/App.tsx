import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import { ToastProvider } from "@/contexts/ToastContext";
import { auth } from "@/firebase";
import { Home } from "@pages/Home";
import { Login } from "@pages/Login";
import { NotFound } from "@pages/NotFound";
import { Register } from "@pages/Register";
import { Verify } from "@pages/Verify";
import { Logout } from "@pages/Logout";
import { Profile } from "@pages/Profile";
import { onAuthStateChanged, User } from "firebase/auth";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Loader } from "@components/Loader";
import { ProtectedLayout } from "@utils/layouts/ProtectedLayout";
import { SidebarLayout } from "@utils/layouts/SidebarLayout";
import { useAutoLogout } from "@utils/useLogoutTime";
import { UserProvider } from "./contexts/UserContext";
import { Reports } from "./pages/Reports";

function App() {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setIsLoading(false);
        });

        return () => unsubscribe();
    }, []);

    useAutoLogout();

    return (
        <ToastProvider>
            <UserProvider>
                <AnimatePresence>{isLoading && <Loader />}</AnimatePresence>

                <Router>
                    <Routes>
                        <Route path="/verify" element={<Verify />} />
                        <Route path="/" element={<Home />} />
                        <Route path="/logout" element={<Logout />} />
                        <Route
                            path="/login"
                            element={
                                <ProtectedLayout onlyGuest={true} isLoading={isLoading}>
                                    <Login />
                                </ProtectedLayout>
                            }
                        />
                        <Route
                            path="/register"
                            element={
                                <ProtectedLayout onlyGuest={true} isLoading={isLoading}>
                                    <Register />
                                </ProtectedLayout>
                            }
                        />
                        // * PROTECTED ROUTES // * ROUTES WITH SIDEBAR
                        <Route
                            path="/profile"
                            element={
                                <ProtectedLayout isLoading={isLoading}>
                                    <SidebarLayout title="Editar Perfil">
                                        <Profile />
                                    </SidebarLayout>
                                </ProtectedLayout>
                            }
                        />
                        <Route
                            path="/reports"
                            element={
                                <ProtectedLayout isLoading={isLoading}>
                                    <SidebarLayout title="Denúncias">
                                        <Reports />
                                    </SidebarLayout>
                                </ProtectedLayout>
                            }
                        />
                        // * NOT FOUND ROUTE
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </Router>
            </UserProvider>
        </ToastProvider>
    );
}

export default App;
