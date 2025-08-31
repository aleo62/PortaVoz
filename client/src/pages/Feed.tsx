import { HeaderSidebar } from "@/components/sidebar/HeaderSidebar";
import { Post } from "@/components/ui/Post";
import { PostPreview } from "@/components/ui/PostPreview";
import { PostPreviewSkeleton } from "@/components/ui/PostPreviewSkeleton";
import { PostSkeleton } from "@/components/ui/PostSkeleton";
import { useDeletePost } from "@/hooks/posts/useDeletePost";
import { useIsMobile } from "@/utils/isMobile";
import { usePosts } from "@hooks/posts/usePosts";
import { IconPlus } from "@tabler/icons-react";
import { PostData } from "@utils/types/postDataType";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export const Posts = () => {
const navigate = useNavigate();
const deletePost = useDeletePost();
const [dateFilter, setDateFilter] = useState<"asc" | "desc">("asc");

const {
    data: feedData,
    isLoading: feedLoading,
    fetchNextPage: fetchFeedNextPage,
    hasNextPage: feedHasNextPage,
    refetch: feedRefetch,
} = usePosts({ date: dateFilter });
const {
    data: reflectedData,
    isLoading: reflectedLoading,
    // fetchNextPage: fetchReflectedNextPage,
    // hasNextPage: reflectedHasNextPage,
} = usePosts({ vote: "desc" });

const { ref, inView } = useInView({});
let posts: PostData[] = (feedData?.pages.flatMap((page) => page.posts) as PostData[]) || [];
let reflectedPosts: PostData[] =
    (reflectedData?.pages.flatMap((page) => page.posts) as PostData[]) || [];

useEffect(() => {
    if (inView && !feedLoading && feedHasNextPage) {
        fetchFeedNextPage();
    }
}, [inView]);

const hadleDeletePost = async (id: string) => {
    // @ts-ignore
    posts = posts.filter((post: PostData) => post._id !== id);
    await deletePost.mutate(id);
};

return (
    <>
        <div className="w-full">
            {!useIsMobile() && <HeaderSidebar />}
            <div className="mx-auto w-full max-w-6xl gap-3 space-y-1 border-b-1 border-b-zinc-200 pb-8 lg:px-5 dark:border-b-zinc-700">
                <h2 className="text-title font-title text-md px-1 font-medium">Repercutidos</h2>

                {reflectedLoading ? (
                    <div className="w-auto px-1 py-2">
                        <PostPreviewSkeleton />
                    </div>
                ) : (
                    <Swiper
                        modules={[Navigation]}
                        spaceBetween={6}
                        slidesPerView={"auto"}
                        className="max-w-lg:hidden w-full"
                    >
                        {reflectedPosts.map(
                            ({ _id, title, desc, upvotesCount, commentsCount }) => (
                                <SwiperSlide key={_id} className="!w-auto px-1 py-2">
                                    <PostPreview
                                        title={title}
                                        desc={desc}
                                        upvotesCount={upvotesCount}
                                        commentsCount={commentsCount}
                                    />
                                </SwiperSlide>
                            ),
                        )}
                    </Swiper>
                )}
            </div>

            <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-5 pt-8 lg:px-6">
                <div className="mb-5 flex items-center gap-1 text-xs">
                    <button
                        onClick={() => (setDateFilter("asc"), feedRefetch())}
                        className={`text-title rounded-lg p-3 px-7 ${dateFilter === "asc" ? "bg-white ring-1 ring-zinc-200 dark:bg-zinc-900 dark:ring-zinc-800" : "hover:bg-zinc-200 hover:dark:bg-zinc-700"} font-medium`}
                    >
                        Mais antigos
                    </button>
                    <button
                        onClick={() => (setDateFilter("desc"), feedRefetch())}
                        className={`text-title rounded-lg p-3 px-7 ${dateFilter === "desc" ? "bg-white ring-1 ring-zinc-200 dark:bg-zinc-900 dark:ring-zinc-800" : "hover:bg-zinc-200 hover:dark:bg-zinc-700"} font-medium`}
                    >
                        Mais recentes
                    </button>
                </div>

                {feedLoading ? (
                    <PostSkeleton />
                ) : (
                    <section className="flex w-full flex-col items-center space-y-3">
                        {/* @ts-ignore */}
                        {posts.map((post: PostData) => (
                            <Post
                                post={post}
                                onDeletePost={async () => await hadleDeletePost(post._id)}
                                key={post._id}
                            />
                        ))}

                        {feedHasNextPage && <div ref={ref}>carregando...</div>}
                    </section>
                )}
                
            </div>
        </div>

        <button
            className="bg-accent absolute right-10 bottom-10 z-100 flex h-12 w-12 items-center justify-center rounded-full text-white"
            onClick={() => navigate("/create-post")}
        >
            <IconPlus size={25} />
        </button>
    </>
);
};
