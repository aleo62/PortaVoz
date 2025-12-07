import { useModal } from "@/contexts/ModalContext";
import { useCreateRepost } from "@/hooks/repost/useCreateRepost";
import { useDeleteRepost } from "@/hooks/repost/useDeleteRepost";
import { useCreateSave } from "@/hooks/save/useCreateSave";
import { useDeleteSave } from "@/hooks/save/useDeleteSave";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useCreateVote } from "@/hooks/vote/useCreateVote";
import { useDeleteVote } from "@/hooks/vote/useDeleteVote";
import { useStoreUser } from "@/stores/userStore";
import { PostData } from "@/types/postDataType";
import {
    IconArrowBigUp,
    IconArrowBigUpFilled,
    IconBookmark,
    IconBookmarkFilled,
    IconMapPin,
    IconMessage,
    IconRepeat,
    IconShare,
} from "@tabler/icons-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Swiper as SwiperClass } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { PostActionButton } from "./PostActionButton";

type MainPostProps = {
    post: PostData;
    viewMode?: boolean;
};

export const PostMain = ({ post, viewMode }: MainPostProps) => {
    const isMobile = useIsMobile();
    const navigate = useNavigate();
    const { openModal } = useModal();
    const { user } = useStoreUser();

    const [imageContain, setImageContain] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);

    const [isUpvoted, setIsUpvoted] = useState(post.isUpvoted);
    const [isReposted, setIsReposted] = useState(post.isReposted);
    const [isSaved, setIsSaved] = useState(post.isSaved);

    const createVote = useCreateVote();
    const deleteVote = useDeleteVote();

    const removeUpvote = async () => {
        setIsUpvoted(false);
        post.upvotesCount = post.upvotesCount - 1;

        await deleteVote.mutate(post._id);
    };

    const addUpvote = async () => {
        setIsUpvoted(true);
        post.upvotesCount = post.upvotesCount + 1;

        await createVote.mutate(post._id);
    };

    const createRepost = useCreateRepost();
    const deleteRepost = useDeleteRepost();

    const removeRepost = async () => {
        setIsReposted(false);
        post.repostsCount = post.repostsCount - 1;

        await deleteRepost.mutate(post._id);
    };

    const addRepost = async () => {
        setIsReposted(true);
        post.repostsCount = post.repostsCount + 1;

        await createRepost.mutate(post._id);
    };

    const createSave = useCreateSave();
    const deleteSave = useDeleteSave();

    const removeSave = async () => {
        setIsSaved(false);
        await deleteSave.mutate(post._id);
    };

    const addSave = async () => {
        setIsSaved(true);
        await createSave.mutate(post._id);
    };

    const limitDescription = isMobile ? 30 : 45;
    const postDescription =
        !viewMode && post.desc.split(" ").length > limitDescription
            ? post.desc
                  .split(" ")
                  .filter((_, index) => index < limitDescription)
                  .join(" ") + "..."
            : post.desc;

    return (
        <main className="relative px-1 lg:px-2">
            <Swiper
                className="h-120 w-full rounded-2xl px-2 md:h-155"
                onSwiper={(swiper: SwiperClass) => setActiveIndex(swiper.activeIndex)}
                onSlideChange={(swiper: SwiperClass) => setActiveIndex(swiper.activeIndex)}
            >
                {post.images.map((image, index) => (
                    <SwiperSlide key={index}>
                        <img
                            className={`h-full w-full transition-all duration-300 ease-in-out ${imageContain ? "object-contain" : "object-cover"}`}
                            onClick={() => setImageContain(!imageContain)}
                            src={image as string}
                            alt="Representação da Cena"
                            loading="lazy"
                        />
                    </SwiperSlide>
                ))}

                {post.images.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 z-10 flex h-6 -translate-x-1/2 items-center gap-2 rounded-full bg-black/20 px-3 backdrop-blur-sm">
                        {post.images.map((_, index) => (
                            <div
                                key={index}
                                className={`h-2 w-2 rounded-full transition-colors duration-300 ${
                                    index === activeIndex ? "bg-accent" : "bg-white/20"
                                }`}
                            />
                        ))}
                    </div>
                )}

                {post.images.length > 1 && (
                    <div className="absolute right-4 bottom-4 z-10 flex h-6 items-center rounded-full bg-black/20 px-3 text-xs text-white backdrop-blur-sm">
                        {activeIndex + 1}/{post.images.length}
                    </div>
                )}
            </Swiper>

            <div className={`${viewMode ? "px-1 py-3 pb-8" : "px-1 py-6 md:px-3"} space-y-7`}>
                <div
                    className={`flex items-center gap-5 text-xs font-semibold lg:gap-8 lg:text-[.8rem]`}
                >
                    <PostActionButton
                        Icon={IconArrowBigUp}
                        IconActive={IconArrowBigUpFilled}
                        count={post.upvotesCount}
                        onClick={() => (isUpvoted ? removeUpvote() : addUpvote())}
                        isActive={isUpvoted}
                        classActive="text-orange-500 dark:text-orange-300"
                    />

                    {!viewMode && (
                        <>
                            <PostActionButton
                                Icon={IconMessage}
                                count={post.commentsCount}
                                onClick={() => openModal("post", { post })}
                            />
                        </>
                    )}

                    {user?._id! !== post.user._id && (
                        <PostActionButton
                            Icon={IconRepeat}
                            onClick={() => (isReposted ? removeRepost() : addRepost())}
                            isActive={isReposted}
                            classActive="text-green-500 dark:text-green-600"
                            count={post.repostsCount}
                        />
                    )}

                    <div className="ml-auto flex items-center gap-3">
                        <PostActionButton
                            Icon={IconBookmark}
                            IconActive={IconBookmarkFilled}
                            onClick={() => (isSaved ? removeSave() : addSave())}
                            isActive={isSaved}
                            classActive="text-blue-500 dark:text-blue-600"
                        />
                        <PostActionButton
                            Icon={IconShare}
                            IconActive={IconShare}
                            onClick={() =>
                                openModal("postShare", {
                                    postLink: `${location.origin}/post/${post._id}`,
                                    shareItems: [
                                        {
                                            bgColor: "bg-green-500",
                                            Icon: <IconRepeat className="size-8" />,
                                            onClick: () => {},
                                        },
                                    ],
                                })
                            }
                        />
                        {!viewMode && (
                            <>
                                <PostActionButton
                                    Icon={IconMapPin}
                                    IconActive={IconMapPin}
                                    onClick={() => openModal("location", { post })}
                                    isActive={true}
                                    classActive="text-blue-500 dark:text-blue-600"
                                />
                            </>
                        )}
                    </div>
                </div>

                <div>
                    <h2
                        onClick={() => navigate(`/post/${post._id}`)}
                        className="text-title font-title mb-4 max-w-[90%] cursor-pointer truncate text-xl font-medium wrap-break-word hover:underline lg:text-[1.5rem]"
                    >
                        {post.title}
                    </h2>

                    <p className="mb-2 w-full text-[.8rem] wrap-break-word text-zinc-800 lg:text-sm dark:text-zinc-300">
                        {postDescription}
                    </p>

                    <p className="flex items-center gap-1 text-sm">
                        {post.hashtags.map((hashtag, key) => (
                            <span key={key} className="text-accent before:content-['#']">
                                {hashtag.content}
                            </span>
                        ))}
                    </p>
                </div>
            </div>
        </main>
    );
};
