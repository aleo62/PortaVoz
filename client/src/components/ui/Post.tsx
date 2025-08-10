import { useUser } from "@/contexts/UserContext";
import { useCreateVote } from "@/hooks/vote/useCreateVote";
import { useDeleteVote } from "@/hooks/vote/useDeleteVote";
import { useIsMobile } from "@/utils/isMobile";
import { PostData } from "@/utils/types/postDataType";
import { IconArrowBigUp, IconDotsVertical, IconMap, IconMessageDots } from "@tabler/icons-react";
import { InvalidateQueryFilters, QueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { PostDrop } from "../drop/PostDrop";
import { PostOverlay } from "../overlay/PostOverlay";

export const Post = ({
    post,
    onDeletePost,
}: {
    post: PostData;
    onDeletePost: () => void;
}) => {
    const { userData, userDecoded } = useUser();
    const isMobile = useIsMobile();
    const queryClient = new QueryClient();

    const [imageContain, setImageContain] = useState(false);
    const [isUpvoted, setIsUpvoted] = useState(post.isUpvoted);
    const [optionsDropOpen, setOptionsDropOpen] = useState(false);
    const [isOverlayOpen, setIsOverlayOpen] = useState(false);

    useEffect(() => {
        if (!isOverlayOpen) {
            queryClient.invalidateQueries(["comments", post._id] as InvalidateQueryFilters);
        }
    }, [isOverlayOpen, post._id]);

    const limitDescription = isMobile ? 30 : 45;
    const postDescription =
        post.desc.split(" ").length > limitDescription
            ? post.desc
                  .split(" ")
                  .filter((_, index) => index < limitDescription)
                  .join(" ") + "..."
            : post.desc;

    // VOTE MANAGEMENT
    const createVote = useCreateVote();
    const deleteVote = useDeleteVote();

    const deleteUpvote = async () => {
        setIsUpvoted(false);
        post.upvotesCount = post.upvotesCount - 1;

        await deleteVote.mutate(post._id);
    };

    const addUpvote = async () => {
        setIsUpvoted(true);
        post.upvotesCount = post.upvotesCount + 1;

        await createVote.mutate(post._id);
    };

    return (
        <>
            <PostOverlay
                isOpen={isOverlayOpen}
                onClose={() => setIsOverlayOpen(false)}
                post={post}
            />

            <article className="w-full max-w-xl rounded-xl bg-white shadow-[0px_4px_55px_-19px_rgba(0,_0,_0,_0.1)] dark:bg-zinc-900">
                <header className="flex items-center gap-3 p-3 py-5 lg:p-5 lg:py-6">
                    <a
                        href={`/profile/${post.userId}`}
                        className="flex cursor-pointer items-center gap-3"
                    >
                        <img
                            src={post.userPhoto}
                            alt={post.userName}
                            className="h-10 w-10 rounded-full"
                        />

                        <div className="leading-4.5">
                            <p className="text-md text-title font-medium">{post.userName}</p>
                            <p className="text-subtitle text-[.8rem]">{post.userId}</p>
                        </div>
                    </a>

                    <div
                        className="relative ml-auto w-fit cursor-pointer"
                        onClick={() =>
                            optionsDropOpen ? setOptionsDropOpen(false) : setOptionsDropOpen(true)
                        }
                    >
                        <IconDotsVertical className="text-subtitle size-4" />
                        <PostDrop
                            isOpen={optionsDropOpen}
                            orientation="top"
                            onClose={() => {
                                setOptionsDropOpen(false);
                            }}
                            isOwner={
                                post.userId == userData?._publicId || !!userDecoded?.claims.admin
                            }
                            onDeletePost={onDeletePost}
                        />
                    </div>
                </header>

                <main>
                    <div className="h-90 w-full md:h-135">
                        <Swiper className="h-full">
                            {post.images.map((image) => (
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

                    <div className="flex items-center space-x-1.5 p-5 font-semibold">
                        <div
                            className={`${isUpvoted ? "text-orange-500 dark:text-orange-300" : "text-subtitle"} flex cursor-pointer items-center justify-center gap-1 rounded-full rounded-l-full p-2 px-4 text-sm ring-1 ring-zinc-300 hover:bg-zinc-100 dark:ring-zinc-700 dark:hover:bg-zinc-800`}
                            onClick={() => (isUpvoted ? deleteUpvote() : addUpvote())}
                        >
                            <IconArrowBigUp
                                className={`${isUpvoted && "fill-orange-500 dark:fill-orange-300"} size-5`}
                            />
                            <p className="w-4 text-center">{post.upvotesCount}</p>
                        </div>
                        <div
                            className="text-subtitle flex cursor-pointer items-center justify-center gap-1 rounded-full rounded-r-full p-2 px-4 text-sm ring-1 ring-zinc-300 hover:bg-zinc-100 dark:ring-zinc-700 dark:hover:bg-zinc-800"
                            onClick={() => setIsOverlayOpen(true)}
                        >
                            <IconMessageDots className="size-5" />
                            <p className="w-4 text-center">{post.commentsCount}</p>
                        </div>
                    </div>

                    <div className="p-5 pt-0">
                        <div className="mb-1 flex w-full items-center justify-between gap-2">
                            <h2 className="text-title font-title max-w-[70%] text-lg font-semibold wrap-break-word lg:mb-2 lg:text-[1.5rem]">
                                {post.title}
                            </h2>
                        </div>

                        <div>
                            <p className="mb-2 w-full text-sm wrap-break-word text-zinc-800 dark:text-zinc-300">
                                {postDescription}
                            </p>
                        </div>

                        <div className="flex items-center gap-1 text-sm">
                            {post.hashtags.map((tag, key) => (
                                <span key={key} className="text-accent before:content-['#']">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </main>

                <footer className="p-5 w-full flex items-center justify-end">
                    <a href={`post/${post._id}`} className="flex gap-1 text-accent font-medium underline">Ver Localização <IconMap/></a>
                </footer>
            </article>
        </>
    );
};
