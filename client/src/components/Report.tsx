import { useState } from "react";

type ReportProps = {
    title: string;
    desc: string;
    images: string[];
    tags: string[];
};

export const Report = ({ title, desc, images, tags }: ReportProps) => {
    const [showFullDesc, setShowFullDesc] = useState(false);
    const maxLength = 150;

    const shouldTruncate = desc.length > maxLength;
    const displayedDesc = showFullDesc ? desc : desc.slice(0, maxLength);

    return (
        <div className="mx-auto max-w-xl rounded-xl bg-white p-2 pb-5 shadow-[0px_4px_55px_-19px_rgba(0,_0,_0,_0.1)]">
            <div className="h-130 w-full overflow-clip rounded-lg">
                <img src={images[0]} alt="Imagem da denúncia" />
            </div>
            <div className="mt-5 px-3">
                <div className="flex items-center justify-between">
                    <h1 className="text-title font-title text-2xl font-semibold">{title}</h1>
                    <div className="mt-3">
                        <div className="mt-2 flex gap-2">
                            {tags.map((tag, i) => (
                                <dd
                                    key={i}
                                    className="rounded bg-zinc-300 p-1 px-3 text-sm text-zinc-800"
                                >
                                    {tag}
                                </dd>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="mt-3">
                    <dt className="font-medium text-zinc-900">Descrição:</dt>
                    <div className="mt-2 flex flex-col gap-1 text-sm text-zinc-700">
                        <span>
                            {displayedDesc}
                            {!showFullDesc && shouldTruncate && "..."}
                        </span>
                        {shouldTruncate && (
                            <button
                                onClick={() => setShowFullDesc(!showFullDesc)}
                                className="w-fit text-xs text-blue-600 hover:underline"
                            >
                                {showFullDesc ? "ver menos" : "ver mais..."}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
