import { useEffect } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import { ToastProvider } from "@/contexts/ToastContext";
import { UserProvider } from "@/contexts/UserContext";

import { useTheme } from "@/hooks/useTheme";

import { EditProfile } from "@/pages/EditProfile";
import { Reports } from "@/pages/Reports";
import { Home } from "@pages/Home";
import { Login } from "@pages/Login";
import { Logout } from "@pages/Logout";
import { NotFound } from "@pages/NotFound";
import { Register } from "@pages/Register";
import { Verify } from "@pages/Verify";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ProtectedLayout } from "@utils/layouts/ProtectedLayout";
import { SidebarLayout } from "@utils/layouts/SidebarLayout";
import { useAutoLogout } from "@utils/useLogoutTime";
import { Dashboard } from "./pages/admin/Dashboard";
import { CreateReport } from "./pages/CreateReport";
function App() {
    const { verifyTheme } = useTheme();
    const queryClient = new QueryClient();

    useAutoLogout();
    verifyTheme();

    useEffect(() => {
        const message = () => {
            console.log("%cE aí curioso!", "font-weight: bold ;font-size: 20px");
            console.log(
                "%cSe liga, esse é o nosso repositorio: https://github.com/aleo62/Portavoz",
                "font-weight: bold ;font-size: 12px",
            );
        };
        message();
    }, []);

    return (
        <QueryClientProvider client={queryClient}>
            <ToastProvider>
                <UserProvider>
                    <Router>
                        <Routes>
                            <Route path="/verify" element={<Verify />} />
                            <Route path="/" element={<Home />} />
                            <Route path="/logout" element={<Logout />} />
                            <Route
                                path="/login"
                                element={
                                    <ProtectedLayout onlyGuest={true}>
                                        <Login />
                                    </ProtectedLayout>
                                }
                            />
                            <Route
                                path="/register"
                                element={
                                    <ProtectedLayout onlyGuest={true}>
                                        <Register />
                                    </ProtectedLayout>
                                }
                            />
                            // * PROTECTED ROUTES // * ROUTES WITH SIDEBAR
                            <Route
                                path="/editprofile"
                                element={
                                    <ProtectedLayout>
                                        <SidebarLayout title="Editar Perfil">
                                            <EditProfile />
                                        </SidebarLayout>
                                    </ProtectedLayout>
                                }
                            />
                            <Route
                                path="/reports"
                                element={
                                    <ProtectedLayout>
                                        <SidebarLayout title="Denúncias">
                                            <Reports />
                                        </SidebarLayout>
                                    </ProtectedLayout>
                                }
                            />
                            <Route
                                path="/createreport"
                                element={
                                    <ProtectedLayout>
                                        <CreateReport />
                                    </ProtectedLayout>
                                }
                            />
                            <Route
                                path="/admin"
                                element={
                                    <ProtectedLayout onlyAdmin={true}>
                                        <SidebarLayout title="Dashboard">
                                            <Dashboard />
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
        </QueryClientProvider>
    );
}

export default App;
