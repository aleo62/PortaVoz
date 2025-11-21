import { AnimatedSubtitle } from "@components/ui/animated/AnimatedSubtitle";
import { IconDownload } from "@tabler/icons-react";
import { motion } from "framer-motion";
export const Mobile = () => {
    const headline = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
            },
        },
    };

    return (
        <section className="relative px-2 pt-33 pb-33">
            <div className="bg-accent from-accent to-primary relative container flex h-100 max-w-6xl items-center rounded-4xl bg-gradient-to-r px-3 py-10">
                <span className="flex-1"></span>
                <img
                    src="https://res.cloudinary.com/di5bma0gm/image/upload/v1756640251/landing-page-3-c_pyolsk.png"
                    className="bottom-0 left-20 w-120 max-lg:hidden lg:absolute"
                    alt=""
                />
                <div className="flex h-full flex-col justify-between">
                    <div>
                        <motion.h2
                            className="title mb-2 !text-white"
                            variants={headline}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, amount: 0.2 }}
                        >
                            Aplicativo já Disponível! Instale agora abaixo
                        </motion.h2>
                        <AnimatedSubtitle delay={0.2}>
                            <div className="subtitle !text-white">
                                Aplicativo para celular já disponivel apenas para Androids, clique
                                no botão abaixo e garanto o aplicativo para uma melhor experiência
                                no seu dispositvo móvel
                            </div>
                        </AnimatedSubtitle>
                    </div>

                    <button className="ml-auto flex items-center gap-5 rounded-xl border-none bg-white p-5 py-2 text-lg font-semibold text-zinc-900 transition hover:bg-zinc-200 active:scale-95">
                        Instalar <IconDownload />
                    </button>
                </div>
            </div>
        </section>
    );
};
