import { ProtectedRoute } from "@/components/guards/ProtectedRoute";
import { AdminDashboard } from "@/pages/admin/AdminDashboard";
import { Chat } from "@/pages/Chat";
import Communities from "@/pages/Communities";
import Community from "@/pages/Community";
import { CreatePost } from "@/pages/CreatePost";
import { Feed } from "@/pages/Feed";
import { ForgotPassword } from "@/pages/ForgotPassword";
import { Login } from "@/pages/Login";
import { Logout } from "@/pages/Logout";
import { NotFound } from "@/pages/NotFound";
import { NotVerified } from "@/pages/NotVerified";
import { PostView } from "@/pages/PostView";
import { PrivacyPolicy } from "@/pages/PrivacyPolicy";
import { Profile } from "@/pages/Profile";
import { Register } from "@/pages/Register";
import { Saves } from "@/pages/Saves";
import { TermsOfService } from "@/pages/TermsOfService";
import { Verify } from "@/pages/Verify";
import { LandingLayout } from "@components/layouts/LandingLayout";
import { SidebarLayout } from "@components/layouts/SidebarLayout";
import { Home } from "@pages/Home";
import React, { ReactNode } from "react";
import { Route, Routes } from "react-router-dom";

type RouteDataType = {
    key: string;
    path: string;
    Page: React.ReactNode;
    layouts?: {
        Component: React.ComponentType<any>;
        props?: {
            onylyAdmin?: boolean;
            onlyGuest?: boolean;
            title?: string;
            noHeader?: boolean;
            linkBack?: string;
            flex_col?: boolean;
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

const RoutesArray: RouteDataType[] = [
    { key: "Home", path: "/", Page: <Home />, layouts: [{ Component: LandingLayout }] },
    { key: "Logout", path: "/logout", Page: <Logout /> },
    {
        key: "Login",
        path: "/auth/login",
        Page: <Login />,
        layouts: [{ Component: ProtectedRoute, props: { onlyGuest: true } }],
    },
    {
        key: "Register",
        path: "/auth/register",
        Page: <Register />,
        layouts: [{ Component: ProtectedRoute, props: { onlyGuest: true } }],
    },
    {
        key: "ForgotPassword",
        path: "/auth/forgot-password",
        Page: <ForgotPassword />,
        layouts: [{ Component: ProtectedRoute, props: { onlyGuest: true } }],
    },
    {
        key: "Verify",
        path: "/auth/verify",
        Page: <Verify />,
        layouts: [{ Component: ProtectedRoute }],
    },
    {
        key: "NotVerified",
        path: "/not-verified",
        Page: <NotVerified />,
        layouts: [{ Component: ProtectedRoute }],
    },
    {
        key: "Feed",
        path: "/feed",
        Page: <Feed />,
        layouts: [
            { Component: SidebarLayout, props: { title: "Feed" } },
            { Component: ProtectedRoute },
        ],
    },
    {
        key: "AdminDashboard",
        path: "/admin",
        Page: <AdminDashboard />,
        layouts: [
            { Component: SidebarLayout, props: { flex_col: false, noHeader: true } },
            { Component: ProtectedRoute, props: { onylyAdmin: true } },
        ],
    },
    {
        key: "AdminDashboard",
        path: "/admin/:adminTab",
        Page: <AdminDashboard />,
        layouts: [
            { Component: SidebarLayout, props: { flex_col: false, noHeader: true } },
            { Component: ProtectedRoute, props: { onylyAdmin: true } },
        ],
    },
    {
        key: "Chat",
        path: "/chat",
        Page: <Chat />,
        layouts: [
            { Component: SidebarLayout, props: { noHeader: true, flex_col: false } },
            { Component: ProtectedRoute },
        ],
    },
    {
        key: "ChatWithId",
        path: "/chat/:chatId",
        Page: <Chat />,
        layouts: [
            { Component: SidebarLayout, props: { noHeader: true, flex_col: false } },
            { Component: ProtectedRoute },
        ],
    },
    {
        key: "PostView",
        path: "/post/:postId",
        Page: <PostView />,
        layouts: [
            {
                Component: SidebarLayout,
                props: { linkBack: "Feed", title: "Ver Post", flex_col: false },
            },
            { Component: ProtectedRoute },
        ],
    },
    {
        key: "Profile",
        path: "/profile",
        Page: <Profile />,
        layouts: [
            { Component: SidebarLayout, props: { title: "Perfil" } },
            { Component: ProtectedRoute },
        ],
    },
    {
        key: "ProfileWithId",
        path: "/profile/:userId",
        Page: <Profile />,
        layouts: [
            { Component: SidebarLayout, props: { title: "Perfil" } },
            { Component: ProtectedRoute },
        ],
    },
    {
        key: "CreatePost",
        path: "/post/create",
        Page: <CreatePost />,
        layouts: [
            { Component: SidebarLayout, props: { title: "Criar Post" } },
            { Component: ProtectedRoute },
        ],
    },
    {
        key: "Saves",
        path: "/saves",
        Page: <Saves />,
        layouts: [
            { Component: SidebarLayout, props: { title: "Salvos" } },
            { Component: ProtectedRoute },
        ],
    },
    {
        key: "PrivacyPolicy",
        path: "/privacy-policy",
        Page: <PrivacyPolicy />,
        layouts: [{ Component: LandingLayout }],
    },
    {
        key: "TermsOfService",
        path: "/terms-of-service",
        Page: <TermsOfService />,
        layouts: [{ Component: LandingLayout }],
    },
    {
        key: "Communities",
        path: "/communities",
        Page: <Communities />,
        layouts: [
            { Component: SidebarLayout, props: { title: "Comunidades", flex_col: false } },
            { Component: ProtectedRoute },
        ],
    },
    {
        key: "Community",
        path: "/communities/:id",
        Page: <Community />,
        layouts: [
            { Component: SidebarLayout, props: { title: "Comunidade" } },
            { Component: ProtectedRoute },
        ],
    },
    {
        key: "NotFound",
        path: "*",
        Page: <NotFound />,
    },
];

type RouteKey = (typeof RoutesArray)[number]["key"];
export const RoutesPath = (key: RouteKey) => {
    return RoutesArray.find((route) => route.key === key)?.path;
};

export const AppRoutes = () => {
    return (
        <Routes>
            {RoutesArray.map(({ path, Page, layouts }) => (
                <Route path={path} element={resolveElement({ layouts, Page })} />
            ))}
        </Routes>
    );
};
