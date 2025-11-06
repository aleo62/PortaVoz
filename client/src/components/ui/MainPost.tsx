import { useIsMobile } from "@/hooks/useIsMobile";
import { useCreateVote } from "@/hooks/vote/useCreateVote";
import { useDeleteVote } from "@/hooks/vote/useDeleteVote";
import { PostData } from "@/utils/types/postDataType";
import { IconArrowBigUp, IconMap, IconMessageDots } from "@tabler/icons-react";
import { Dispatch, SetStateAction, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";

type MainPostProps = {
    post: PostData;
    setIsOverlayOpen?: Dispatch<SetStateAction<boolean>>;
    setLocationOpen?: Dispatch<SetStateAction<boolean>>;
    viewMode?: boolean;
};

export const MainPost = ({ post, setIsOverlayOpen, setLocationOpen, viewMode }: MainPostProps) => {
    const isMobile = useIsMobile();
    const navigate = useNavigate();

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

    return (
        <main className="relative">
            <Swiper className="h-90 w-[98%] rounded-2xl px-2 md:h-135">
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

            <div
                className={`${viewMode ? "px-1 py-3 pb-8" : "p-3 lg:px-6 lg:py-5"} space-y-5`}
            >
                <div
                    className={`flex items-center space-x-1.5 font-semibold ${isMobile ? "text-xs" : "text-[.8rem]"} `}
                >
                    <span
                        className={`${isUpvoted ? "text-orange-500 dark:text-orange-300" : "text-subtitle"} flex cursor-pointer items-center justify-center gap-1 rounded-full rounded-l-full p-2 px-4 ring-1 ring-zinc-300 hover:bg-zinc-100 dark:ring-zinc-700 dark:hover:bg-zinc-800`}
                        onClick={() => (isUpvoted ? deleteUpvote() : addUpvote())}
                    >
                        <IconArrowBigUp
                            className={`${isUpvoted && "fill-orange-500 dark:fill-orange-300"} ${isMobile ? "size-4.5" : "size-5"}`}
                        />
                        <p className="w-4 text-center">{post.upvotesCount}</p>
                    </span>
                    {!viewMode && (
                        <>
                            <span
                                className="text-subtitle flex cursor-pointer items-center justify-center gap-1 rounded-full rounded-r-full p-2 px-4 ring-1 ring-zinc-300 hover:bg-zinc-100 dark:ring-zinc-700 dark:hover:bg-zinc-800"
                                onClick={() => setIsOverlayOpen!(true)}
                            >
                                <IconMessageDots
                                    className={`size-5 ${isMobile ? "size-4.5" : "size-5"}`}
                                />
                                <p className="w-4 text-center">{post.commentsCount}</p>
                            </span>
                            <a
                                onClick={() => setLocationOpen!((prev) => !prev)}
                                className="text-accent text-md ml-auto flex items-center gap-1 font-medium underline"
                            >
                                <IconMap size={25} />
                            </a>
                        </>
                    )}
                </div>
                <div>
                    <h2
                        onClick={() => navigate(`/post/${post._id}`)}
                        className="text-title font-title max-w-[90%] cursor-pointer truncate text-xl font-medium wrap-break-word hover:underline lg:mb-2 lg:text-[1.5rem]"
                    >
                        {post.title}
                    </h2>

                    <p className="mb-5 w-full text-[.8rem] wrap-break-word text-zinc-800 lg:text-sm dark:text-zinc-300">
                        {postDescription}
                    </p>

                    <div className="flex items-center gap-1 text-sm">
                        {post.hashtags.map((hashtag, key) => (
                            <span key={key} className="text-accent before:content-['#']">
                                {hashtag.content}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
};
