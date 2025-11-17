import { useModal } from "@/contexts/ModalContext";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useCreateVote } from "@/hooks/vote/useCreateVote";
import { useDeleteVote } from "@/hooks/vote/useDeleteVote";
import { PostData } from "@/utils/types/postDataType";
import {
    IconArrowBigUp,
    IconArrowBigUpFilled,
    IconBookmark,
    IconBookmarkFilled,
    IconMap,
    IconMapPin,
    IconMapPinFilled,
    IconMessage,
    IconRepeat,
} from "@tabler/icons-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { LocationModal } from "../../modal/LocationModal";
import { PostModal } from "./PostModal";

type MainPostProps = {
    post: PostData;
    viewMode?: boolean;
};

export const PostMain = ({ post, viewMode }: MainPostProps) => {
    const isMobile = useIsMobile();
    const navigate = useNavigate();
    const { openModal } = useModal();

    const [imageContain, setImageContain] = useState(false);
    const [isUpvoted, setIsUpvoted] = useState(post.isUpvoted);

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

    const limitDescription = isMobile ? 30 : 45;
    const postDescription =
        !viewMode && post.desc.split(" ").length > limitDescription
            ? post.desc
                  .split(" ")
                  .filter((_, index) => index < limitDescription)
                  .join(" ") + "..."
            : post.desc;

    const PostActionButton = ({
        Icon,
        count,
        onClick,
        isActive,
        classActive,
        IconActive,
    }: {
        Icon: React.ElementType;
        onClick: () => void;
        count?: number;
        isActive?: boolean;
        classActive?: string;
        IconActive?: React.ElementType;
    }) => {
        return (
            <button
                className={`${isActive ? classActive : "text-zinc-500 dark:text-zinc-600"} flex cursor-pointer items-center justify-center gap-1 rounded-full rounded-l-full transition-all hover:scale-105`}
                onClick={onClick}
            >
                {isActive && IconActive ? (
                    <IconActive className={`size-6`} />
                ) : (
                    <Icon className={`size-6`} />
                )}
                {(count === 0 || !!count) && <span className="w-4 text-center">{count}</span>}
            </button>
        );
    };

    return (
        <main className="relative">
            <Swiper className="h-100 w-[97.5%] rounded-2xl px-2 md:h-155">
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

            <div className={`${viewMode ? "px-1 py-3 pb-8" : "p-3 lg:px-6 lg:py-5"} space-y-7`}>
                <div className={`flex items-center gap-8 text-xs font-semibold lg:text-[.8rem]`}>
                    <PostActionButton
                        Icon={IconArrowBigUp}
                        IconActive={IconArrowBigUpFilled}
                        count={post.upvotesCount}
                        onClick={() => (isUpvoted ? deleteUpvote() : addUpvote())}
                        isActive={isUpvoted}
                        classActive="text-orange-500 dark:text-orange-300"
                    />

                    {!viewMode && (
                        <>
                            <PostActionButton
                                Icon={IconMessage}
                                count={post.commentsCount}
                                onClick={() => openModal(<PostModal post={post} key={post._id} />)}
                            />
                        </>
                    )}

                    <PostActionButton
                        Icon={IconRepeat}
                        onClick={() => (isUpvoted ? deleteUpvote() : addUpvote())}
                        isActive={isUpvoted}
                        classActive="text-green-500 dark:text-green-600"
                        count={post.upvotesCount}
                    />

                    <div className="ml-auto flex items-center gap-2">
                        <PostActionButton
                            Icon={IconBookmark}
                            IconActive={IconBookmarkFilled}
                            onClick={() => (isUpvoted ? deleteUpvote() : addUpvote())}
                            isActive={isUpvoted}
                            classActive="text-blue-500 dark:text-blue-600"
                        />
                        {!viewMode && (
                            <>
                                <PostActionButton
                                    Icon={IconMapPin}
                                    IconActive={IconMapPin}
                                    onClick={() => openModal(<LocationModal post={post} />)}
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
