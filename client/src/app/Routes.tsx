import { Chat } from "@/pages/Chat";
import { CreatePost } from "@/pages/CreatePost";
import { Posts } from "@/pages/Feed";
import { ForgotPassword } from "@/pages/ForgotPassword";
import { NotFound } from "@/pages/NotFound";
import { Post } from "@/pages/PostView";
import { Profile } from "@/pages/Profile";
import { Verify } from "@/pages/Verify";
import { Dashboard } from "@pages/admin/Dashboard";
import { EditProfile } from "@pages/EditProfile";
import { Home } from "@pages/Home";
import { Login } from "@pages/Login";
import { Logout } from "@pages/Logout";
import { Register } from "@pages/Register";
import { ProtectedLayout } from "@utils/layouts/ProtectedLayout";
import { SidebarLayout } from "@utils/layouts/SidebarLayout";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

export const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/auth/logout" element={<Logout />} />
                <Route
                    path="/auth/login"
                    element={
                        <ProtectedLayout onlyGuest={true}>
                            <Login />
                        </ProtectedLayout>
                    }
                />
                <Route
                    path="/auth/register"
                    element={
                        <ProtectedLayout onlyGuest={true}>
                            <Register />
                        </ProtectedLayout>
                    }
                />
                <Route
                    path="/auth/forgot-password"
                    element={
                        <ProtectedLayout onlyGuest={true}>
                            <ForgotPassword />
                        </ProtectedLayout>
                    }
                />
                <Route
                    path="/auth/verify"
                    element={
                        <ProtectedLayout>
                            <Verify />
                        </ProtectedLayout>
                    }
                />
                // * PROTECTED ROUTES // * ROUTES WITH SIDEBAR
                <Route
                    path="/edit-profile"
                    element={
                        <ProtectedLayout>
                            <SidebarLayout>
                                <EditProfile />
                            </SidebarLayout>
                        </ProtectedLayout>
                    }
                />
                <Route
                    path="/feed"
                    element={
                        <ProtectedLayout>
                            <SidebarLayout>
                                <Posts />
                            </SidebarLayout>
                        </ProtectedLayout>
                    }
                />
                <Route
                    path="/chat"
                    element={
                        <ProtectedLayout>
                            <SidebarLayout>
                                <Chat />
                            </SidebarLayout>
                        </ProtectedLayout>
                    }
                />
                <Route
                    path="/chat/:chatId"
                    element={
                        <ProtectedLayout>
                            <SidebarLayout noHeader>
                                <Chat />
                            </SidebarLayout>
                        </ProtectedLayout>
                    }
                />
                <Route
                    path="/post/:postId"
                    element={
                        <ProtectedLayout>
                            <SidebarLayout>
                                <Post />
                            </SidebarLayout>
                        </ProtectedLayout>
                    }
                />
                <Route
                    path="/create-post"
                    element={
                        <ProtectedLayout>
                            <CreatePost />
                        </ProtectedLayout>
                    }
                />
                <Route
                    path="/profile"
                    element={
                        <ProtectedLayout>
                            <SidebarLayout>
                                <Profile />
                            </SidebarLayout>
                        </ProtectedLayout>
                    }
                />
                <Route
                    path="/profile/:publicId"
                    element={
                        <ProtectedLayout>
                            <SidebarLayout>
                                <Profile />
                            </SidebarLayout>
                        </ProtectedLayout>
                    }
                />
                <Route
                    path="/admin"
                    element={
                        <ProtectedLayout onlyAdmin={true}>
                            <SidebarLayout>
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
