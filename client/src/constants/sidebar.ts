import {
    IconBookmark,
    IconInbox,
    IconMessageCircle,
    IconSmartHome,
    IconUserHexagon,
    IconUsers,
} from "@tabler/icons-react";

export const SidebarItems = [
    { label: "Início", icon: IconSmartHome, href: "/feed" },
    {
        label: "Chat",
        icon: IconMessageCircle,
        href: "/chat",
        notification: "chat",
    },
    { label: "Comunidades", icon: IconUsers, href: "/communities" },
    { label: "Salvos", icon: IconBookmark, href: "/saves" },
];

export const SidebarClientItems = [
    {
        label: "Caixa de Entrada",
        icon: IconInbox,
        modalKey: "notification",
        notification: "inbox",
    },
];

export const SidebarAdminItems = [{ label: "Adm", icon: IconUserHexagon, href: "/admin" }];
