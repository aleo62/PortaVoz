import {
    IconAlertTriangle,
    IconBadgesFilled,
    IconBell,
    IconChecklist,
    IconCloudLock,
    IconCodeCircleFilled,
    IconEarScan,
    IconListSearch,
    IconLock,
    IconMessage2,
    IconMessageUp,
    IconMeteorFilled,
    IconReport,
    IconReportSearch,
    IconSparkles,
    IconUser,
} from "@tabler/icons-react";

export const NavItems = [
    { label: "Início", href: "/home" },
    { label: "Sobre", href: "/about" },
    { label: "FAQ", href: "/faq" },
    { label: "Contato", href: "/contact" },
];

export const portaVozLogo =
    localStorage.theme === "dark"
        ? "https://res.cloudinary.com/di5bma0gm/image/upload/v1754165191/Title_white_Grad._qiwt67.png"
        : "https://res.cloudinary.com/di5bma0gm/image/upload/v1754164869/Title_black_Grad._bd392t.png";

export const SidebarItems = [
    { label: "Denúncias", icon: IconReportSearch, href: "/reports" },
    { label: "Chat", icon: IconMessage2, href: "/chat" },
    { label: "Ajuda", icon: IconEarScan, href: "/help" },
];

export const SidebarConfig = [{ label: "Notificações", icon: IconBell, href: "/notifications" }];

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

export const Tags = [
    {
        Tag: "Desenvolvedor",
        Icon: IconCodeCircleFilled,
        className: "bg-green-100 text-green-700",
    },
    {
        Tag: "Admin",
        Icon: IconBadgesFilled,
        className: "bg-blue-100 text-blue-700",
    },
    {
        Tag: "Criador",
        Icon: IconMeteorFilled,
        className: "bg-yellow-100 text-yellow-700",
    },
];

export const SeverityClassNames: { [key: string]: string } = {
    "pequena": "bg-gradient-to-r from-green-100 to-green-200 text-green-700 inset-ring-zinc-300/30",
    "media": "bg-yellow-100 text-yellow-700",
    "grave": "bg-red-100 text-red-700",
    "super grave": "bg-red-100 text-red-700",
}

export const TestimonalItems = [
    {
        image: "https://imgs.search.brave.com/X3y1wjZ_ZYc2ntiRrD1fRptkx_ViiPGL6aHT5c_baWI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/Zm90b3MtZ3JhdGlz/L2pvdmVtLWJhcmJ1/ZG8tdmVzdGluZG8t/Y2FtaXNldGFfMjcz/NjA5LTU5MzguanBn/P3NlbXQ9YWlzX2h5/YnJpZA",
        title: "Um Atendimento Excepcional do Começo ao Fim",
        client: "Mariana Oliveira",
        role: "Suporte ao Cliente",
    },
    {
        image: "https://imgs.search.brave.com/X3y1wjZ_ZYc2ntiRrD1fRptkx_ViiPGL6aHT5c_baWI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/Zm90b3MtZ3JhdGlz/L2pvdmVtLWJhcmJ1/ZG8tdmVzdGluZG8t/Y2FtaXNldGFfMjcz/NjA5LTU5MzguanBn/P3NlbXQ9YWlzX2h5/YnJpZA",
        title: "Qualidade Incrível, uma das Melhores Plataformas!",
        client: "Carlos Mendes",
        role: "Designer Gráfico",
    },
    {
        image: "https://imgs.search.brave.com/X3y1wjZ_ZYc2ntiRrD1fRptkx_ViiPGL6aHT5c_baWI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/Zm90b3MtZ3JhdGlz/L2pvdmVtLWJhcmJ1/ZG8tdmVzdGluZG8t/Y2FtaXNldGFfMjcz/NjA5LTU5MzguanBn/P3NlbXQ9YWlzX2h5/YnJpZA",
        title: "Melhor Experiência, Simples e Objetiva. Nota 10!",
        client: "Ana Souza",
        role: "Desenvolvedora Front-end",
    },
    {
        image: "https://imgs.search.brave.com/X3y1wjZ_ZYc2ntiRrD1fRptkx_ViiPGL6aHT5c_baWI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/Zm90b3MtZ3JhdGlz/L2pvdmVtLWJhcmJ1/ZG8tdmVzdGluZG8t/Y2FtaXNldGFfMjcz/NjA5LTU5MzguanBn/P3NlbXQ9YWlzX2h5/YnJpZA",
        title: "Simplesmente Perfeito! Cada Detalhe é Ótima!",
        client: "Gabriela Santos",
        role: "Fotógrafa Profissional",
    },
];

export const Cards = [
    {
        title: "Denunciar",
        desc: "Relate problemas ou situações que precisam de atenção de forma rápida e segura.",
        icon: IconReport,
    },
    {
        title: "Ver denúncias",
        desc: "Acompanhe denúncias, informe-se e contribua para um ambiente mais seguro.",
        icon: IconListSearch,
    },
    {
        title: "Interagir",
        desc: "Participe das discussões, compartilhe suas opiniões e conecte-se com outras pessoas.",
        icon: IconMessageUp,
    },
    {
        title: "Ser ouvido",
        desc: "Expresse suas preocupações e tenha certeza de que sua voz será ouvida.",
        icon: IconEarScan,
    },
];

export const topics = [
    {
        body: "Segurança",
        icon: IconCloudLock,
    },
    {
        body: "Confiabilidade",
        icon: IconChecklist,
    },
    {
        body: "Prioridade",
        icon: IconSparkles,
    },
];

export const codeLength = 5;
