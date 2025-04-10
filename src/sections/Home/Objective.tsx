import { ButtonPrimary } from "@components/Button";

import man from "@assets/images/illustrations/landing-page/man.png";

import { motion } from "framer-motion";
import { AnimatedTitle } from "@components/animations/AnimatedTitle";
import { AnimatedSubtitle } from "@components/animations/AnimatedSubtitle";
import { AnimatedButton } from "@components/animations/AnimatedButton";
import { AnimatedCaption } from "@components/animations/AnimatedCaption";

export const Objective = () => {
    return (
        <section className="gradient-section pt-33 pb-33">
            <div className="relative container flex flex-col-reverse items-center justify-center gap-10 xl:grid xl:grid-cols-2 xl:gap-5">
                <div className="">
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
                </div>

                <div className="grid justify-center">
                    <AnimatedCaption>
                        <p className="caption">Principal Objetivo</p>
                    </AnimatedCaption>
                    <AnimatedTitle>
                        <h2 className="title mb-[50px]">
                            Sua <b>Segurança</b> se torna nossa <b>Prioridade</b>.
                        </h2>
                    </AnimatedTitle>

                    <AnimatedSubtitle>
                        <div className="subtitle">
                            Agradecemos por confiar em nossa plataforma para relatar este incidente.
                            Sabemos como é importante manter um ambiente seguro e transparente para
                            todos, e por isso, trabalhamos com agilidade para analisar cada denúncia
                            com o máximo de cuidado e responsabilidade.
                            <br />
                            <br />
                            Sua participação faz toda a diferença! Seguimos comprometidos em
                            garantir um espaço protegido e confiável, onde todos possam interagir
                            com tranquilidade. Caso tenha alguma dúvida ou precise de mais
                            assistência, nossa equipe está sempre à disposição.
                        </div>
                    </AnimatedSubtitle>

                    <div className="mt-16.5 flex items-center gap-4 max-md:flex-col max-md:items-start">
                        <AnimatedButton>
                            <ButtonPrimary>Denunciar Agora!</ButtonPrimary>
                        </AnimatedButton>
                    </div>
                </div>
            </div>
        </section>
    );
};
