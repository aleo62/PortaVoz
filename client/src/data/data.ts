import {
    IconAlertTriangle,
    IconEarScan,
    IconInbox,
    IconLock,
    IconMessage,
    IconSword,
    IconTable,
    IconUser,
} from "@tabler/icons-react";

export const NavItems = [
    { label: "Início", href: "/" },
    { label: "FAQ", href: "/faq" },
    { label: "Denúncias", href: "/feed" },
];

export const portaVozLogo = (isDarkTheme: boolean) =>
    isDarkTheme
        ? "https://res.cloudinary.com/di5bma0gm/image/upload/v1761170904/logo-dark-mode.png"
        : "https://res.cloudinary.com/di5bma0gm/image/upload/v1761170938/logo-light-mode.png";

export const SidebarItems = [
    { label: "Feed", icon: IconTable, href: "/feed" },
    { label: "Chat", icon: IconMessage, href: "/chat" },
    { label: "Ajuda", icon: IconEarScan, href: "/help" },
];

export const SidebarSpecialItems = [{ label: "Admin", icon: IconSword, href: "/admin" }];

export const SidebarConfig = [
    { label: "Caixa de Entrada", icon: IconInbox, href: "/notifications" },
];

export const SidebarProfileItems = [
    { label: "Visão Geral", icon: IconUser },
    { label: "Privacidade", icon: IconLock },
    { label: "Área de Perigo", icon: IconAlertTriangle },
];

export const InfoFooterItems = [
    { label: "Termos de Uso", href: "/tos" },
    { label: "Políticas de Privacidade", href: "/politics" },
    { label: "Perguntas Frequentes", href: "/faq" },
];

export const codeLength = 5;
