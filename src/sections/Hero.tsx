import woman from "../assets/images/illustrations/landing-page/woman.png"
import { ButtonPrimary } from "../components/Button";
import { IconPlayerPlayFilled as Play } from "@tabler/icons-react";

export const Hero = () => {
    return (
        <section className="lg:pt-44.5 pt-28 relative pb-30 gradient-section ">
            <div className="container grid lg:grid-cols-2 lg:gap-7.5 items-center justify-center">
                <div className="w-fit">
                    <h2 className="headline mb-[15px]">Transformando Piracicaba em seu <span>Ponto Seguro.</span></h2>

                    <div className="subtitle">
                        Uma plataforma segura e acessível para que cidadãos
                        possam relatar problemas e irregularidades de forma
                        anônima, promovendo transparência, justiça e melhorias
                        na cidade.
                    </div>

                    <div className="mt-16.5 flex items-center gap-4 max-md:flex-col max-md:items-start">
                        <ButtonPrimary>
                            Denunciar Agora!
                        </ButtonPrimary>
                        <div className="flex items-center gap-2">
                            <button className="rounded-full p-3
                            bg-gradient-to-r from-accent/95 to-primary/95 
                            hover:from-accent hover:to-primary 
                            shadow-primary/30 shadow-sm
                            text-body-background
                            hover:scale-105 transition-[transform] duration-200">
                                <Play/>
                            </button>
                            <p className="font-semibold text-title text-[13px] lg:text-[15px]">Conhecer a Iniciativa</p>
                        </div>
                    </div>
                </div>

                <div className="h-65 sm:h-80 lg:h-full">
                    <figure className="h-80 lg:h-full flex justify-center">    
                        <img className="absolute lg:right-[5%] w-[90vw] sm:w-[45vw] max-w-[650px] bottom-0" src={woman} alt="Woman" width={600} />
                    </figure>
                </div>
            </div>

            
        </section>
    );
};
