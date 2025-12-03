import {
    IconChecklist,
    IconCloudLock,
    IconEarScan,
    IconListSearch,
    IconMessageUp,
    IconReport,
    IconSparkles,
} from "@tabler/icons-react";

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

export const Topics = [
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

export const NavItems = [
    { label: "Início", href: "/" },
    { label: "FAQ", href: "/faq" },
    { label: "Denúncias", href: "/feed" },
];
