import { Dashboard } from "@/pages/admin/Dashboard";
import { Chat } from "@/pages/Chat";
import { CreatePost } from "@/pages/CreatePost";
import { EditProfile } from "@/pages/EditProfile";
import { Feed } from "@/pages/Feed";
import { ForgotPassword } from "@/pages/ForgotPassword";
import { Login } from "@/pages/Login";
import { Logout } from "@/pages/Logout";
import { NotFound } from "@/pages/NotFound";
import { NotVerified } from "@/pages/NotVerified";
import { PostView } from "@/pages/PostView";
import { Profile } from "@/pages/Profile";
import { Register } from "@/pages/Register";
import { Verify } from "@/pages/Verify";
import { ProtectedLayout } from "@/utils/layouts/ProtectedLayout";
import { SidebarLayout } from "@/utils/layouts/SidebarLayout";
import { Home } from "@pages/Home";
import React, { ReactNode } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

type RouteDataType = {
    key: string;
    path: string;
    Page: React.ReactNode;
    layouts?: {
        Component: React.ComponentType<any>;
        props?: {
            onylyAdmin?: boolean;
            onlyGuest?: boolean;
            noHeader?: boolean;
            linkBack?: boolean;
        };
    }[];
};

const resolveElement = ({ layouts, Page }: Omit<RouteDataType, "key" | "path">): ReactNode => {
    let resolved: ReactNode = Page;

    const layoutsReversed = layouts?.reverse();
    if (layouts) {
        for (const layout of layoutsReversed!) {
            const { Component, props } = layout;
            resolved = <Component {...props}> {resolved} </Component>;
        }
    }

    return resolved;
};

export const AppRoutes = () => {
    const RoutesArray: RouteDataType[] = [
        { key: "Home", path: "/", Page: <Home /> },
        { key: "Logout", path: "/logout", Page: <Logout /> },
        {
            key: "Login",
            path: "/auth/login",
            Page: <Login />,
            layouts: [{ Component: ProtectedLayout, props: { onlyGuest: true } }],
        },
        {
            key: "Register",
            path: "/auth/register",
            Page: <Register />,
            layouts: [{ Component: ProtectedLayout, props: { onlyGuest: true } }],
        },
        {
            key: "ForgotPassword",
            path: "/forgot-password",
            Page: <ForgotPassword />,
            layouts: [{ Component: ProtectedLayout, props: { onlyGuest: true } }],
        },
        {
            key: "Verify",
            path: "/verify",
            Page: <Verify />,
            layouts: [{ Component: ProtectedLayout }],
        },
        {
            key: "NotVerified",
            path: "/not-verified",
            Page: <NotVerified />,
            layouts: [{ Component: ProtectedLayout }],
        },
        {
            key: "EditProfile",
            path: "/edit-profile",
            Page: <EditProfile />,
            layouts: [{ Component: SidebarLayout }, { Component: ProtectedLayout }],
        },
        {
            key: "EditProfile",
            path: "/edit-profile",
            Page: <EditProfile />,
            layouts: [{ Component: SidebarLayout }, { Component: ProtectedLayout }],
        },
        {
            key: "Feed",
            path: "/feed",
            Page: <Feed />,
            layouts: [{ Component: SidebarLayout }, { Component: ProtectedLayout }],
        },
        {
            key: "AdminDashboard",
            path: "/admin/dashboard",
            Page: <Dashboard />,
            layouts: [
                { Component: SidebarLayout },
                { Component: ProtectedLayout, props: { onylyAdmin: true } },
            ],
        },
        {
            key: "Chat",
            path: "/chat",
            Page: <Chat />,
            layouts: [
                { Component: SidebarLayout, props: { noHeader: true } },
                { Component: ProtectedLayout },
            ],
        },
        {
            key: "ChatWithId",
            path: "/chat/:chatId",
            Page: <Chat />,
            layouts: [
                { Component: SidebarLayout, props: { noHeader: true } },
                { Component: ProtectedLayout },
            ],
        },
        {
            key: "PostView",
            path: "/post/:postId",
            Page: <PostView />,
            layouts: [
                { Component: SidebarLayout, props: { linkBack: true } },
                { Component: ProtectedLayout },
            ],
        },
        {
            key: "Profile",
            path: "/profile",
            Page: <Profile />,
            layouts: [
                { Component: SidebarLayout, props: { linkBack: true } },
                { Component: ProtectedLayout },
            ],
        },
        {
            key: "ProfileWithId",
            path: "/profile/:userId",
            Page: <Profile />,
            layouts: [
                { Component: SidebarLayout, props: { linkBack: true } },
                { Component: ProtectedLayout },
            ],
        },
        {
            key: "CreatePost",
            path: "/post/create",
            Page: <CreatePost />,
            layouts: [
                { Component: SidebarLayout, props: { linkBack: true } },
                { Component: ProtectedLayout },
            ],
        },
        {
            key: "NotFound",
            path: "*",
            Page: <NotFound />,
        },
    ];

    return (
        <Router>
            <Routes>
                {RoutesArray.map(({ path, Page, layouts }) => (
                    <Route path={path} element={resolveElement({ layouts, Page })} />
                ))}
            </Routes>
        </Router>
    );
};
