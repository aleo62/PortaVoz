import { useUser } from "@/contexts/UserContext";
import { useCreateVote } from "@/hooks/vote/useCreateVote";
import { useDeleteVote } from "@/hooks/vote/useDeleteVote";
import { useIsMobile } from "@/utils/isMobile";
import { PostData } from "@/utils/types/postDataType";
import { IconArrowBigUpLines, IconDotsVertical, IconMessageDots } from "@tabler/icons-react";
import { RefObject, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { PostContainer } from "../general/PostContainer";
import { PostOverlay } from "../general/PostOverlay";

export const Report = ({
    report,
    onDeletePost,
}: {
    report: PostData;
    onDeletePost: () => void;
}) => {
    const { userData, userDecoded } = useUser();
    const isMobile = useIsMobile();

    const [imageContain, setImageContain] = useState(false);
    const [isUpvoted, setIsUpvoted] = useState(report.isUpvoted);
    const [optionsContainerOpen, setOptionsContainerOpen] = useState(false);
    const [isOverlayOpen, setIsOverlayOpen] = useState(false);

    const toggleRef = useRef<HTMLDivElement>(null);

    const limitDescription = isMobile ? 30 : 45;
    const reportDescription =
        report.desc.split(" ").length > limitDescription
            ? report.desc
                  .split(" ")
                  .filter((_, index) => index < limitDescription)
                  .join(" ") + "..."
            : report.desc;

    // VOTE MANAGEMENT
    const createVote = useCreateVote();
    const deleteVote = useDeleteVote();

    const deleteUpvote = async () => {
        setIsUpvoted(false);
        report.upvotesCount = report.upvotesCount - 1;

        await deleteVote.mutate(report._id);
    };

    const addUpvote = async () => {
        setIsUpvoted(true);
        report.upvotesCount = report.upvotesCount + 1;

        await createVote.mutate(report._id);
    };

    return (
        <>
            <PostOverlay
                isOpen={isOverlayOpen}
                onClose={() => setIsOverlayOpen(false)}
                report={report}
            />

            <article className="mx-auto w-full max-w-xl rounded-xl bg-white shadow-[0px_4px_55px_-19px_rgba(0,_0,_0,_0.1)] dark:bg-zinc-900">
                <header className="flex items-center gap-3 p-3 py-5 lg:p-5 lg:py-6">
                    <img
                        src={report.userPhoto}
                        alt={report.userName}
                        className="h-10 w-10 rounded-full"
                    />

                    <div className="leading-4.5">
                        <p className="text-md text-title font-medium">{report.userName}</p>
                        <p className="text-subtitle text-[.8rem]">{report.userId}</p>
                    </div>

                    <div className="relative ml-auto w-fit cursor-pointer">
                        <IconDotsVertical
                            className="text-subtitle size-4"
                            onClick={() => setOptionsContainerOpen(true)}
                        />
                        <PostContainer
                            isContainerOpen={optionsContainerOpen}
                            orientation="top"
                            onClose={() => setOptionsContainerOpen(false)}
                            toggleRef={toggleRef as RefObject<HTMLDivElement>}
                            isOwner={
                                report.userId == userData?._publicId ||
                                !!userDecoded?.claims.isAdmin
                            }
                            onDeletePost={onDeletePost}
                        />
                    </div>
                </header>

                <main>
                    <div className="h-90 w-full md:h-135">
                        <Swiper className="h-full">
                            {report.images.map((image) => (
                                <SwiperSlide>
                                    <img
                                        className={`h-full w-full transition-all duration-300 ease-in-out ${imageContain ? "object-contain" : "object-cover"}`}
                                        onClick={() => setImageContain(!imageContain)}
                                        src={image as string}
                                        alt="Representação da Cena"
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>

                    <div className="divide-y-1 divide-zinc-300 p-3 lg:p-5 dark:divide-zinc-700">
                        <div className="">
                            <h2 className="text-title font-title mt-2 mb-2 text-lg font-semibold lg:mb-4 lg:text-xl">
                                {report.title}
                            </h2>

                            <div>
                                {/* <h4 className="text-title mb-1 text-sm font-medium">Descrição</h4> */}
                                <p className="text-subtitle mb-7 text-sm font-medium">
                                    {reportDescription}
                                </p>
                            </div>
                        </div>

                        <div className="mt-7 flex items-center justify-between">
                            <div className="flex w-35 items-center divide-x-1 divide-zinc-300 rounded-full font-bold ring-1 ring-zinc-300 dark:divide-zinc-500 dark:ring-zinc-500">
                                <div
                                    className={`${isUpvoted ? "text-orange-500 dark:text-orange-300" : "text-subtitle"} flex w-1/2 cursor-pointer items-center justify-center gap-1 rounded-l-full p-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800`}
                                    onClick={() => (isUpvoted ? deleteUpvote() : addUpvote())}
                                >
                                    <IconArrowBigUpLines
                                        className={`${isUpvoted && "fill-orange-500 dark:fill-orange-300"} size-5`}
                                    />
                                    {report.upvotesCount}
                                </div>
                                <div
                                    className="text-subtitle flex w-1/2 cursor-pointer items-center justify-center gap-1 rounded-r-full p-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800"
                                    onClick={() => setIsOverlayOpen(true)}
                                >
                                    <IconMessageDots className="size-5" />
                                    {report.commentsCount}
                                </div>
                            </div>

                            <div>
                                {report.tags.map((tag, key) => (
                                    <span
                                        key={key}
                                        className="text-title mr-2 inline-block rounded-sm bg-zinc-200 p-2 px-4 text-xs font-semibold ring-1 ring-zinc-300 dark:bg-zinc-800 dark:text-zinc-300 dark:ring-zinc-700"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </main>

                <footer></footer>
            </article>
        </>
    );
};
