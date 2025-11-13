import { NotificationModal } from "@/components/features/notification/NotificationModal";
import {
    RiChat1Fill,
    RiChat1Line,
    RiCustomerService2Fill,
    RiCustomerService2Line,
    RiHome6Fill,
    RiHome6Line,
    RiInbox2Line,
} from "@remixicon/react";

export const SidebarItems = [
    { label: "Início", icon: RiHome6Line, iconSelected: RiHome6Fill, href: "/feed" },
    { label: "Chat", icon: RiChat1Line, iconSelected: RiChat1Fill, href: "/chat" },
    {
        label: "Ajuda",
        icon: RiCustomerService2Line,
        iconSelected: RiCustomerService2Fill,
        href: "/help",
    },
];

export const SidebarClientItems = [
    {
        label: "Notificações",
        icon: RiInbox2Line,
        iconSelected: RiHome6Fill,
        modal: NotificationModal,
    },
];
