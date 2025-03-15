import ReactPlayer from "react-player";
import video from "../assets/videos/Portavoz_Video.mp4";

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

                <div className="grid justify-center items-center">
                    <div className="w-full max-w-[898px] max-h-[504] p-2 rounded-2xl md:p-3 lg:p-4 md:rounded-3xl bg-transparent shadow-[0px_0px_80px_0px_rgba(59,_130,_246,_0.5)]">
                        <div className="pb-2 md:pb-3 pr-2 w-full flex gap-2 items-center justify-end">
                            <div className="h-2 w-2 md:h-3 md:w-3 rounded-full bg-red-500"></div>
                            <div className="h-2 w-2 md:h-3 md:w-3 rounded-full bg-yellow-500"></div>
                            <div className="h-2 w-2 md:h-3 md:w-3 rounded-full bg-green-500"></div>
                        </div>
                        <ReactPlayer
                            controls={true}
                            url={video}
                            width={"100%"}
                            height={"100%"}
                            style={{ borderRadius: "1rem", overflow: "hidden" }}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};
