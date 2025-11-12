import { IconAlertTriangle, IconInbox, IconLock, IconUser } from "@tabler/icons-react";

export const NavItems = [
    { label: "Início", href: "/" },
    { label: "FAQ", href: "/faq" },
    { label: "Denúncias", href: "/feed" },
];

export const portaVozLogo = (isDarkTheme: boolean, simple?: boolean) =>
    isDarkTheme
        ? simple
            ? "https://res.cloudinary.com/di5bma0gm/image/upload/v1762799471/logo-2-dark-mode_pkbqc9.png"
            : "https://res.cloudinary.com/di5bma0gm/image/upload/v1761170904/logo-dark-mode.png"
        : simple
          ? "https://res.cloudinary.com/di5bma0gm/image/upload/v1762799472/logo-2-white-mode_dt55vo.png"
          : "https://res.cloudinary.com/di5bma0gm/image/upload/v1761170938/logo-light-mode.png";

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
