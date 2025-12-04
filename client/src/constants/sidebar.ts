import { IconInbox, IconMessageCircle, IconSmartHome, IconUserHexagon } from "@tabler/icons-react";

export const SidebarItems = [
    { label: "Início", icon: IconSmartHome, href: "/feed" },
    {
        label: "Chat",
        icon: IconMessageCircle,
        href: "/chat",
        notification: "chat",
    },
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
