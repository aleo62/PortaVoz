import { motion } from 'framer-motion';
import woman from '../../assets/images/illustrations/landing-page/woman.png';
import { ButtonPrimary } from '../../components/Button';
import { AnimatedSubtitle } from '../../components/animations/AnimatedSubtitle';
import { AnimatedButton } from '../../components/animations/AnimatedButton';

export const Hero = () => {
    const title = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
            },
        },
    };

    const line = {
        hidden: { opacity: 0, y: -25 },
        show: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.7, ease: 'easeOut' },
        },
    };

    return (
        <section className="gradient-section relative pt-33 pb-33 xl:pt-48">
            <div className="container grid items-center justify-center xl:relative xl:grid-cols-2 xl:gap-7.5">
                <div className="w-fit">
                    <motion.h2
                        className="headline mb-[20px]"
                        variants={title}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.5 }}
                    >
                        <motion.span className="block" variants={line}>
                            Transformando
                        </motion.span>
                        <motion.span className="block" variants={line}>
                            Piracicaba em seu
                        </motion.span>
                        <motion.span className="block" variants={line}>
                            <b>Ponto Seguro</b>.
                        </motion.span>
                    </motion.h2>

                    <AnimatedSubtitle delay={0.8}>
                        <div className="subtitle">
                            Uma plataforma segura e acessível para que cidadãos possam relatar
                            problemas e irregularidades de forma anônima, promovendo transparência,
                            justiça e melhorias na cidade.
                        </div>
                    </AnimatedSubtitle>

                    <div className="mt-16.5 flex items-center gap-4 max-md:flex-col max-md:items-start">
                        <AnimatedButton delay={1}>
                            <ButtonPrimary>Denunciar Agora!</ButtonPrimary>
                        </AnimatedButton>
                    </div>
                </div>

                <div className="h-65 sm:h-80 xl:h-full">
                    <figure className="flex h-80 justify-center lg:h-full">
                        <motion.img
                            className="woman-image absolute bottom-0 w-[85vw] max-w-[380px] md:w-[45vw] xl:right-[32px] xl:bottom-[-31.5%] xl:max-w-[600px]"
                            src={woman}
                            alt="Woman"
                            initial={{ opacity: 0, x: 70 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ ease: 'easeOut', duration: 1 }}
                            viewport={{ once: true }}
                        />
                    </figure>
                </div>
            </div>
        </section>
    );
};
