import { ButtonPrimary } from "../components/Button";
import { Card } from "../components/Card";
import { IconFlag, IconExclamationCircle, IconMessages, IconBroadcast } from "@tabler/icons-react";

const Cards = [
    {
        title: "Denunciar",
        desc: "Relate problemas ou situações que precisam de atenção de forma rápida e segura.",
        icon: IconExclamationCircle,
    },
    {
        title: "Ver denúncias",
        desc: "Acompanhe denúncias, informe-se e contribua para um ambiente mais seguro.",
        icon: IconFlag,
    },
    {
        title: "Interagir",
        desc: "Participe das discussões, compartilhe suas opiniões e conecte-se com outras pessoas.",
        icon: IconMessages,
    },
    {
        title: "Ser ouvido",
        desc: "Expresse suas preocupações e tenha certeza de que sua voz será ouvida.",
        icon: IconBroadcast,
    },
];

export const Info = () => {
    return (
        <section className="lg:pt-33 pt-30 relative pb-30">
            <div className="container grid lg:grid-cols-2 lg:gap-5 items-center justify-center">
                <div className="w-fit">
                    <h2 className="title mb-[50px]">
                        Crie sua <span>conta</span> por conta própria e receba
                        essas <span>possibilidades</span>.
                    </h2>

                    <div className="subtitle">
                        Aprenda como criar sua conta de forma simples e rápida
                        para desbloquear diversas funcionalidades exclusivas,
                        incluindo a possibilidade de relatar problemas, enviar
                        denúncias com segurança e acessar suporte especializado
                        diretamente em nossa plataforma.
                    </div>

                    <div className="mt-16.5 flex items-center gap-4 max-md:flex-col max-md:items-start">
                        <ButtonPrimary>Denunciar Agora!</ButtonPrimary>
                    </div>
                </div>

                <div className="h-full flex flex-col md:grid gap-4 mt-30 md:grid-cols-[266px_266px] lg:mt-0 grid-rows-[200px_200px]">
                    {Cards.map(({ title, desc, icon }, key) => (
                        <Card
                            key={key}
                            title={title}
                            desc={desc}
                            Icon={icon}
                            className={`
                                ${key % 2 === 0 ? 'md:transform md:translate-y-[-30px]' : ''}
                                ${key % 2 !== 0 ? 'md:transform md:translate-y-[30px]' : ''}
                            `}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};
