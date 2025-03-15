import woman from "../assets/images/illustrations/landing-page/woman.png";
import { ButtonPrimary } from "../components/Button";
import { IconPlayerPlayFilled as Play } from "@tabler/icons-react";

export const Hero = () => {
    return (
        <section className="xl:pt-44.5 pt-33 pb-33 relative gradient-section ">
            <div className="container grid xl:grid-cols-2 xl:relative xl:gap-7.5 items-center justify-center">
                <div className="w-fit">
                    <h2 className="headline mb-[15px]">
                        Transformando Piracicaba em seu{" "}
                        <span>
                            Ponto Seguro<b>.</b>
                        </span>
                    </h2>

                    <div className="subtitle">
                        Uma plataforma segura e acessível para que cidadãos
                        possam relatar problemas e irregularidades de forma
                        anônima, promovendo transparência, justiça e melhorias
                        na cidade.
                    </div>

                    <div className="mt-16.5 flex items-center gap-4 max-md:flex-col max-md:items-start">
                        <ButtonPrimary>Denunciar Agora!</ButtonPrimary>
                        <div className="flex items-center gap-2">
                            <button
                                className="rounded-full p-3
                            bg-gradient-to-r from-accent/95 to-primary/95 
                            hover:from-accent hover:to-primary 
                            shadow-primary/30 shadow-sm
                            text-body-background
                            hover:scale-105 transition-[transform] duration-200"
                            >
                                <Play />
                            </button>
                            <p className="font-semibold text-title text-[13px] xl:text-[15px]">
                                Conhecer a Iniciativa
                            </p>
                        </div>
                    </div>
                </div>

                <div className="h-65 sm:h-80 xl:h-full">
                    <figure className="h-80 lg:h-full flex justify-center">
                        <img
                            className="absolute bottom-0 xl:right-[32px] xl:bottom-[-32%] w-[95vw] max-w-[400px] md:w-[45vw] md: lg:max-w-[600px]"
                            src={woman}
                            alt="Woman"
                            width={600}
                        />
                    </figure>
                </div>
            </div>
        </section>
    );
};
