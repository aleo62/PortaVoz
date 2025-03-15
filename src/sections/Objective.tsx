import { ButtonPrimary } from "../components/Button";
import man from "../assets/images/illustrations/landing-page/man.png";

export const Objective = () => {
    return (
        <section className="pt-33 pb-33 gradient-section">
            <div className="container relative flex flex-col-reverse xl:grid gap-10 xl:grid-cols-2 xl:gap-5 items-center justify-center">
                <div className="">
                    <div className="">
                        <figure className="flex justify-center items-center">
                            <img
                                className="w-[80vw] sm:w-[45vw] max-w-[520px] xl:absolute xl:bottom-[50%] xl:translate-y-[50%]"
                                src={man}
                                alt="Woman"
                                width={520}
                            />
                        </figure>
                    </div>
                </div>

                <div className="">
                    <p className="caption">Principal Objetivo</p>
                    <h2 className="title mb-[50px]">
                        Sua <span>segurança</span> se torna nossa <span>prioridade</span>.
                    </h2>

                    <div className="subtitle">
                        Agradecemos por confiar em nossa plataforma para relatar
                        este incidente. Sabemos como é importante manter um
                        ambiente seguro e transparente para todos, e por isso,
                        trabalhamos com agilidade para analisar cada denúncia
                        com o máximo de cuidado e responsabilidade.
                        <br />
                        <br />
                        Sua participação faz toda a diferença! Seguimos
                        comprometidos em garantir um espaço protegido e
                        confiável, onde todos possam interagir com
                        tranquilidade. Caso tenha alguma dúvida ou precise de
                        mais assistência, nossa equipe está sempre à disposição.
                    </div>

                    <div className="mt-16.5 flex items-center gap-4 max-md:flex-col max-md:items-start">
                        <ButtonPrimary>Denunciar Agora!</ButtonPrimary>
                    </div>
                </div>
            </div>
        </section>
    );
};
