import { NotificationModal } from "@/components/features/notification/NotificationModal";
import {
    IconHome,
    IconHomeFilled,
    IconInbox,
    IconLifebuoy,
    IconLifebuoyFilled,
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
    {
        label: "Ajuda",
        icon: IconLifebuoy,
        iconSelected: IconLifebuoyFilled,
        href: "/help",
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
