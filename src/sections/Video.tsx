import ReactPlayer from "react-player";

export const Video = () => {
    return (
        <section className="xl:pt-44.5 pt-33 pb-33 relative ">
            <div className="container flex flex-col items-center justify-center gap-20">
                <div className="w-fit xl:flex xl:justify-between xl:items-center">
                    <div className="">
                        <p className="caption">Nosso princípio</p>

                        <h2 className="title mb-[15px]">
                            Conheça a nossa <span>Iniciativa</span> por{" "}
                            <span>Vídeo</span>.
                        </h2>
                    </div>

                    <div className="subtitle">
                        Uma plataforma segura e acessível para que cidadãos
                        possam relatar problemas e irregularidades de forma
                        anônima, promovendo transparência, justiça e melhorias
                        na cidade.
                    </div>
                </div>

                <div className="grid justify-center items-center w-full">
                    <div className="relative w-[90vw] h-[53.2vw] max-w-[898px] max-h-[510px] shadow-[0px_0px_72px_-22px_rgba(51,_65,_85,_0.5)]">
                        <ReactPlayer
                            controls={true}
                            url={
                                "https://youtu.be/g2ZNU6z1oUc?si=iBvO5BevhCKnY0Sd"
                            }
                            width={"100%"}
                            height={"100%"}
                            style={{
                                position: "absolute",
                                left: "50%",
                                top: "50%",
                                transform: "translate(-50%, -50%)",
                                borderRadius: "1rem",
                                overflow: "hidden"
                            }}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};
