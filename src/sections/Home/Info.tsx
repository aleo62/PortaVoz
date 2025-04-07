import { AnimatedButton } from "../../components/animations/AnimatedButton";
import { AnimatedSubtitle } from "../../components/animations/AnimatedSubtitle";
import { AnimatedTitle } from "../../components/animations/AnimatedTitle";
import { ButtonPrimary } from "../../components/Button";
import { Card } from "../../components/Card";
import { IconMessageUp, IconEarScan, IconReport, IconListSearch } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { Ret } from "../../components/deco/Ret";
import { Border } from "../../components/deco/Border";
import { AnimatedCaption } from "../../components/animations/AnimatedCaption";

const Cards = [
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

export const Info = () => {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    return (
        <section className="relative overflow-visible pt-33 pb-33">
            <Ret className="top-[350px] left-[-40px] rotate-[-125deg]" />
            <Border className="top-[30px] right-[-20px]" />

            <div className="relative z-10 container grid items-center justify-center lg:gap-5 xl:grid-cols-2">
                <div className="">
                    <AnimatedCaption>
                        <p className="caption">Beneficios de se Cadastrar</p>
                    </AnimatedCaption>
                    <AnimatedTitle>
                        <h2 className="title mb-[50px]">
                            Crie sua <b>Conta</b> e então aproveite essas <b>Vantagens</b>{" "}
                            exclusivas.
                        </h2>
                    </AnimatedTitle>

                    <AnimatedSubtitle>
                        <div className="subtitle">
                            Crie sua conta de forma rápida e fácil para acessar recursos exclusivos,
                            como relatar problemas, enviar denúncias com segurança e obter suporte
                            especializado.
                        </div>
                    </AnimatedSubtitle>

                    <div className="mt-16.5 flex items-center gap-4 max-md:flex-col max-md:items-start">
                        <AnimatedButton>
                            <ButtonPrimary>Criar conta aqui</ButtonPrimary>
                        </AnimatedButton>
                    </div>
                </div>

                <motion.div
                    className="mt-20 flex grid-cols-[270px_270px] grid-rows-[210px_210px] flex-col gap-4 xl:mt-0 xl:grid"
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.3 }}
                >
                    {Cards.map(({ title, desc, icon }, key) => (
                        <Card
                            key={key}
                            title={title}
                            desc={desc}
                            Icon={icon}
                            className={`${
                                key % 2 === 0 ? "xl:translate-y-[-30px] xl:transform" : ""
                            } ${key % 2 !== 0 ? "xl:translate-y-[30px] xl:transform" : ""}`}
                        />
                    ))}
                </motion.div>
            </div>
        </section>
    );
};
