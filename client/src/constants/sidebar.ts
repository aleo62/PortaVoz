import { NotificationModal } from "@components/features/notification/NotificationModal";
import {
    IconHome,
    IconHomeFilled,
    IconInbox,
    IconMessageCircle,
    IconMessageCircleFilled,
    IconUserHexagon,
} from "@tabler/icons-react";

export const SidebarItems = [
    { label: "Início", icon: IconHome, iconSelected: IconHomeFilled, href: "/feed" },
    {
        label: "Chat",
        icon: IconMessageCircle,
        iconSelected: IconMessageCircleFilled,
        href: "/chat",
    },
];

export const SidebarClientItems = [
    {
        label: "Notificações",
        icon: IconInbox,
        iconSelected: IconInbox,
        modal: NotificationModal,
    },
];

export const SidebarAdminItems = [
    { label: "Adm", icon: IconUserHexagon, iconSelected: IconUserHexagon, href: "/admin" },
];
