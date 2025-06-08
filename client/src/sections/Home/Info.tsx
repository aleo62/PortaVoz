import { AnimatedButton } from "@components/animations/AnimatedButton";
import { AnimatedCaption } from "@components/animations/AnimatedCaption";
import { AnimatedSubtitle } from "@components/animations/AnimatedSubtitle";
import { AnimatedTitle } from "@components/animations/AnimatedTitle";

import { ButtonPrimary } from "@components/Button";
import { Card } from "@components/Card";
import { Cards } from "@utils/data";
import { motion } from "framer-motion";

import { Border } from "@components/deco/Border";
import { Ret } from "@components/deco/Ret";
import { IconUserFilled } from "@tabler/icons-react";

export const Info = () => {
    const container = {
        show: {
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    return (
        <section className="relative overflow-visible pt-33 pb-33">
            <Ret className="top-[350px] left-[-40px] h-50 w-50 rotate-[-125deg] xl:h-80 xl:w-80" />
            <Border className="top-[30px] right-[-20px] h-45 w-45" />

            <div className="relative z-10 container grid items-center justify-center lg:gap-5 xl:grid-cols-2">
                <div className="">
                    <div className="mb-[50px]">
                        <AnimatedCaption>
                            <p className="caption">Benefícios</p>
                        </AnimatedCaption>
                        <AnimatedTitle>
                            <h2 className="title">
                                Crie sua <b>Conta</b> e então aproveite essas <b>Vantagens</b>{" "}
                                exclusivas.
                            </h2>
                        </AnimatedTitle>
                    </div>

                    <AnimatedSubtitle>
                        <div className="subtitle">
                            Crie sua conta de forma rápida e fácil para acessar recursos exclusivos,
                            como relatar problemas, enviar denúncias com segurança e obter suporte
                            especializado.
                        </div>
                    </AnimatedSubtitle>

                    <div className="mt-16.5 flex items-center gap-4 max-md:flex-col max-md:items-start">
                        <AnimatedButton>
                            <ButtonPrimary text="Criar conta" Icon={IconUserFilled} />
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
