import { useUser } from "@/contexts/UserContext";
import { useCreateVote } from "@/hooks/vote/useCreateVote";
import { useDeleteVote } from "@/hooks/vote/useDeleteVote";
import { useIsMobile } from "@/utils/isMobile";
import { PostData } from "@/utils/types/postDataType";
import { IconArrowBigUp, IconDotsVertical, IconMap, IconMessageDots } from "@tabler/icons-react";
import { InvalidateQueryFilters, QueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { PostDrop } from "../drop/PostDrop";
import { LocationOverlay } from "../overlay/LocationOverlay";
import { PostOverlay } from "../overlay/PostOverlay";
import { MapView } from "./MapView";

export const Post = ({ post, onDeletePost }: { post: PostData; onDeletePost: () => void }) => {
    const navigate = useNavigate();

    const { userData, userDecoded } = useUser();
    const isMobile = useIsMobile();
    const queryClient = new QueryClient();

    const [imageContain, setImageContain] = useState(false);
    const [isUpvoted, setIsUpvoted] = useState(post.isUpvoted);
    const [optionsDropOpen, setOptionsDropOpen] = useState(false);
    const [isOverlayOpen, setIsOverlayOpen] = useState(false);
    const [locationOpen, setLocationOpen] = useState(false);

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

            {isMobile && locationOpen && (
                <LocationOverlay
                    isOpen={locationOpen}
                    onClose={() => setLocationOpen(false)}
                    post={post}
                />
            )}

            <article
                className={`relative w-full max-w-2xl rounded-xl bg-white shadow-[0px_4px_55px_-19px_rgba(0,_0,_0,_0.1)] transition-all ${!isMobile && locationOpen && "translate-x-[-45%]"} dark:bg-zinc-900`}
            >
                <header className="relative flex items-center gap-3 p-3 py-5 lg:p-5 lg:py-6">
                    <div
                        onClick={() => navigate(`/profile/${post.userId}`)}
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
                    </div>

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

                <main className="relative">
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

                    <div className="flex items-center space-x-1.5 p-3 font-semibold lg:p-5">
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

                        <a
                            onClick={() => setLocationOpen(!locationOpen)}
                            className="text-accent text-md ml-auto flex items-center gap-1 font-medium underline"
                        >
                            <IconMap size={25} />
                        </a>
                    </div>

                    <div className="p-3 pt-1 lg:p-5 lg:pt-2">
                        <div className="mb-1 flex w-full items-center justify-between gap-2">
                            <h2
                                onClick={() => navigate(`/post/${post._id}`)}
                                className="text-title font-title max-w-[90%] cursor-pointer truncate text-xl font-semibold wrap-break-word hover:underline lg:mb-2 lg:text-[1.5rem]"
                            >
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

                <footer className="flex w-full items-center justify-end py-2"></footer>
                {!isMobile && (
                    <div
                        className={`${locationOpen ? "left-[143%] opacity-100" : "left-1/2 opacity-0"} absolute top-1/2 w-full -translate-x-1/2 -translate-y-1/2 space-y-5 transition-all lg:max-w-md`}
                    >
                        <h3 className="text-title font-title mb-2 text-lg font-medium">Endereço</h3>

                        <p className="border-l-2 border-zinc-700/70 pl-2 text-sm text-zinc-800 dark:text-zinc-200">
                            {post?.address}
                        </p>

                        <h3 className="text-title font-title mb-2 text-lg font-medium">
                            Localização
                        </h3>

                        {post?.location?.latitude != null && post?.location?.longitude != null && (
                            <MapView
                                latitude={Number(post.location.latitude)}
                                longitude={Number(post.location.longitude)}
                            />
                        )}
                    </div>
                )}
            </article>
        </>
    );
};
