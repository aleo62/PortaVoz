import { ButtonPrimary } from "@components/Button";

import man from "@assets/images/illustrations/landing-page/man.png";

import { motion } from "framer-motion";

import { AnimatedTitle } from "@components/animations/AnimatedTitle";
import { AnimatedSubtitle } from "@components/animations/AnimatedSubtitle";
import { AnimatedButton } from "@components/animations/AnimatedButton";
import { AnimatedCaption } from "@components/animations/AnimatedCaption";

import { topics } from "@/utils/data";
import { Topic } from "@/components/Topic";
import { IconArrowNarrowRight } from "@tabler/icons-react";

export const Objective = () => {
    const container = {
        show: {
            transition: {
                delayChildren: 0.5,
                staggerChildren: 0.2,
            },
        },
    };

    return (
        <section className="gradient-section pt-33 pb-33">
            <div className="relative container flex flex-col-reverse items-center justify-center gap-10 xl:grid xl:grid-cols-2 xl:gap-5">
                <div className="">
                    <figure className="flex items-center justify-center">
                        <motion.img
                            className="w-[80vw] max-w-[495px] sm:w-[45vw] xl:absolute xl:bottom-[50%] xl:translate-y-[50%]"
                            src={man}
                            alt="Woman"
                            width={520}
                            initial={{ opacity: 0, x: -70 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ ease: "easeOut", duration: 1 }}
                            viewport={{ once: true }}
                        />
                    </figure>
                </div>

                <div className="grid justify-center">
                    <div className="mb-[20px]">
                        <AnimatedCaption>
                            <p className="caption">Principal Objetivo</p>
                        </AnimatedCaption>
                        <AnimatedTitle>
                            <h2 className="title">
                                Sua <b>Segurança</b> se torna nossa <b>Prioridade</b>.
                            </h2>
                        </AnimatedTitle>
                    </div>

                    <motion.div
                        className="mb-[50px] flex flex-wrap items-center gap-3"
                        variants={container}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                    >
                        {topics.map(({ body, icon: Icon }, key) => (
                            <Topic Icon={Icon} body={body} key={key} />
                        ))}
                    </motion.div>

                    <AnimatedSubtitle>
                        <div className="subtitle">
                            Agradecemos sinceramente por confiar em nossa plataforma para relatar
                            este incidente. Sabemos o quanto é importante manter um ambiente seguro,
                            respeitoso e transparente para todos os nossos usuários. Sua denúncia é
                            essencial para que possamos identificar e lidar com comportamentos
                            inadequados, garantindo que nossa comunidade continue sendo um espaço
                            acolhedor e confiável.
                        </div>
                    </AnimatedSubtitle>

                    <div className="mt-16.5 flex items-center gap-4 max-md:flex-col max-md:items-start">
                        <AnimatedButton>
                            <ButtonPrimary text="Denunciar Aqui" Icon={IconArrowNarrowRight} />
                        </AnimatedButton>
                    </div>
                </div>
            </div>
        </section>
    );
};
