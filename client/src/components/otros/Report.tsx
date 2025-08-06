import { useUser } from "@/contexts/UserContext";
import { useCreateVote } from "@/hooks/vote/useCreateVote";
import { useDeleteVote } from "@/hooks/vote/useDeleteVote";
import { useIsMobile } from "@/utils/isMobile";
import { PostData } from "@/utils/types/postDataType";
import { IconArrowBigUp, IconDotsVertical, IconMessageDots } from "@tabler/icons-react";
import { InvalidateQueryFilters, QueryClient } from "@tanstack/react-query";
import { RefObject, useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { PostContainer } from "../general/PostContainer";
import { PostOverlay } from "../general/PostOverlay";
import { Severity } from "./Severity";

export const Report = ({
    report,
    onDeletePost,
}: {
    report: PostData;
    onDeletePost: () => void;
}) => {
    const { userData, userDecoded } = useUser();
    const isMobile = useIsMobile();
    const queryClient = new QueryClient();

    const [imageContain, setImageContain] = useState(false);
    const [isUpvoted, setIsUpvoted] = useState(report.isUpvoted);
    const [optionsContainerOpen, setOptionsContainerOpen] = useState(false);
    const [isOverlayOpen, setIsOverlayOpen] = useState(false);

    const toggleRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOverlayOpen) {
            console.log("aaaa");
            queryClient.invalidateQueries(["comments", report._id] as InvalidateQueryFilters);
        }
    }, [isOverlayOpen, report._id]);

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

            <article className="w-full max-w-xl rounded-xl bg-white shadow-[0px_4px_55px_-19px_rgba(0,_0,_0,_0.1)] dark:bg-zinc-900">
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
                            onClose={() => {
                                setOptionsContainerOpen(false);
                            }}
                            toggleRef={toggleRef as RefObject<HTMLDivElement>}
                            isOwner={
                                report.userId == userData?._publicId || !!userDecoded?.claims.admin
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
                            <div className="mt-2 mb-4 flex w-full items-center justify-between gap-2">
                                <h2 className="text-title font-title max-w-[70%] text-lg font-semibold wrap-break-word lg:mb-4 lg:text-xl">
                                    {report.title}
                                </h2>
                                <Severity severity={report.severity} />
                            </div>

                            <div>
                                <p className="text-subtitle mb-7 w-full text-sm font-medium wrap-break-word">
                                    {reportDescription}
                                </p>
                            </div>
                        </div>

                        <div className="mt-7 flex items-center justify-between">
                            <div className="flex items-center space-x-1.5 font-semibold">
                                <div
                                    className={`${isUpvoted ? "text-orange-500 dark:text-orange-300" : "text-subtitle"} flex cursor-pointer items-center justify-center gap-1 rounded-full rounded-l-full p-2 px-4 text-sm ring-1 ring-zinc-300 hover:bg-zinc-100 dark:ring-zinc-700 dark:hover:bg-zinc-800`}
                                    onClick={() => (isUpvoted ? deleteUpvote() : addUpvote())}
                                >
                                    <IconArrowBigUp
                                        className={`${isUpvoted && "fill-orange-500 dark:fill-orange-300"} size-5`}
                                    />
                                    <p className="w-4 text-center">{report.upvotesCount}</p>
                                </div>
                                <div
                                    className="text-subtitle flex cursor-pointer items-center justify-center gap-1 rounded-full rounded-r-full p-2 px-4 text-sm ring-1 ring-zinc-300 hover:bg-zinc-100 dark:ring-zinc-700 dark:hover:bg-zinc-800"
                                    onClick={() => setIsOverlayOpen(true)}
                                >
                                    <IconMessageDots className="size-5" />
                                    <p className="w-4 text-center">{report.commentsCount}</p>
                                </div>
                            </div>

                            <div>
                                {!isMobile ? (
                                    report.tags.map((tag, key) => (
                                        <span
                                            key={key}
                                            className="text-title mr-2 inline-block max-w-30 overflow-hidden rounded-sm bg-zinc-200 p-2 px-4 text-xs font-semibold overflow-ellipsis whitespace-nowrap ring-1 ring-zinc-300 dark:bg-zinc-800 dark:text-zinc-300 dark:ring-zinc-700"
                                        >
                                            {tag}
                                        </span>
                                    ))
                                ) : (
                                    <>
                                        <div className="flex items-center gap-1">
                                            <span className="text-title mr-2 inline-block rounded-sm bg-zinc-200 p-2 px-4 text-xs font-semibold ring-1 ring-zinc-300 dark:bg-zinc-800 dark:text-zinc-300 dark:ring-zinc-700">
                                                {report.tags[0]}
                                            </span>
                                            <p
                                                className="text-subtitle cursor-pointer text-xs"
                                                onClick={() => setIsOverlayOpen(true)}
                                            >
                                                +{" "}
                                                {report.tags.length !== 1 && report.tags.length - 1}
                                            </p>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </main>

                <footer></footer>
            </article>
        </>
    );
};
