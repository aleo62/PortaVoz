import { ButtonPrimary } from "../components/Button";

export const Info = () => {
    return (
        <section className="lg:pt-33 pt-30 relative pb-30">
            <div className="container grid lg:grid-cols-2 lg:gap-7.5 items-center justify-center">
                <div className="w-fit">
                    <h2 className="title mb-[50px]">
                        Crie sua <span>conta</span> por conta própria e receba
                        essas <span>possibilidades.</span>
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

                <div className="h-65 sm:h-80 lg:h-full"></div>
            </div>
        </section>
    );
};
