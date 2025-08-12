import { CreatePost } from "@/pages/CreatePost";
import { NotFound } from "@/pages/NotFound";
import { Post } from "@/pages/PostView";
import { Posts } from "@/pages/Posts";
import { Profile } from "@/pages/Profile";
import { Dashboard } from "@pages/admin/Dashboard";
import { EditProfile } from "@pages/EditProfile";
import { Home } from "@pages/Home";
import { Login } from "@pages/Login";
import { Logout } from "@pages/Logout";
import { Register } from "@pages/Register";
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
                    path="/createpost"
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
