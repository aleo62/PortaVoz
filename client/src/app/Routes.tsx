import { NotFound } from "@/pages/NotFound";
import { Dashboard } from "@pages/admin/Dashboard";
import { CreateReport } from "@pages/CreateReport";
import { EditProfile } from "@pages/EditProfile";
import { Home } from "@pages/Home";
import { Login } from "@pages/Login";
import { Logout } from "@pages/Logout";
import { Register } from "@pages/Register";
import { Reports } from "@pages/Reports";
import { Verify } from "@pages/Verify";
import { ProtectedLayout } from "@utils/layouts/ProtectedLayout";
import { SidebarLayout } from "@utils/layouts/SidebarLayout";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

export const AppRoutes = () => {
    return (
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
    );
};
