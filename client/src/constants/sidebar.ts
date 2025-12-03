import { IconInbox, IconMessageCircle, IconSmartHome, IconUserHexagon } from "@tabler/icons-react";

export const SidebarItems = [
    { label: "Início", icon: IconSmartHome, href: "/feed" },
    {
        label: "Chat",
        icon: IconMessageCircle,
        href: "/chat",
    },
];

export const SidebarClientItems = [
    {
        label: "Notificações",
        icon: IconInbox,
        modalKey: "notification",
    },
];

export const SidebarAdminItems = [{ label: "Adm", icon: IconUserHexagon, href: "/admin" }];
