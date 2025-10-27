import { ButtonCreatePost } from "@/components/ui/ButtonCreatePost";
import { Post } from "@/components/ui/Post";
import { PostReflected } from "@/components/ui/PostReflected";
import { PostReflectedSkeleton } from "@/components/ui/PostReflectedSkeleton";
import { PostSkeleton } from "@/components/ui/PostSkeleton";
import { usePosts } from "@hooks/posts/usePosts";
import { PostData } from "@utils/types/postDataType";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export const Feed = () => {
    const {
        data: feedData,
        isLoading: feedLoading,
        fetchNextPage: fetchFeedNextPage,
        hasNextPage: feedHasNextPage,
    } = usePosts({ date: "desc" }, true);
    const { data: reflectedData, isLoading: reflectedLoading } = usePosts({ vote: "desc" }, true);

    const { ref, inView } = useInView({});
    let posts: PostData[] = (feedData?.pages.flatMap((page) => page.posts) as PostData[]) || [];
    let reflectedPosts: PostData[] =
        (reflectedData?.pages.flatMap((page) => page.posts) as PostData[]) || [];

    useEffect(() => {
        if (inView && !feedLoading && feedHasNextPage) {
            fetchFeedNextPage();
        }
    }, [inView]);

    return (
        <>
            <div className="mx-auto w-full max-w-6xl gap-3 space-y-1 border-b-zinc-200/50 lg:px-5 dark:border-b-zinc-700/50">
                {reflectedLoading && <PostReflectedSkeleton />}

                {!reflectedLoading && !reflectedPosts.length && (
                    <div className="mx-auto my-8 text-center text-zinc-500">
                        <p className="text-base italic">Nada por aqui também 💤</p>
                    </div>
                )}

                {!reflectedLoading && reflectedPosts.length > 0 && (
                    <Swiper
                        modules={[Navigation]}
                        spaceBetween={8}
                        slidesPerView="auto"
                        className="animate-fade-in w-full"
                    >
                        {reflectedPosts.map((post) => (
                            <SwiperSlide key={post._id + "_reflected"} className="!w-auto py-2">
                                <PostReflected post={post} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                )}
            </div>

            <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-5 lg:px-6 lg:mt-10">
                {feedLoading && <PostSkeleton />}

                {!feedLoading && !posts.length && (
                    <div className="mx-auto text-center text-zinc-500">
                        <p className="text-lg">Nenhuma Denúncia enviada ainda</p>
                        <p className="mt-3 text-5xl">;(</p>
                    </div>
                )}

                {!feedLoading && posts.length > 0 && (
                    <section className="flex w-full flex-col items-center space-y-3">
                        {posts.map((post: PostData) => (
                            <Post post={post} key={post._id} />
                        ))}

                        {feedHasNextPage && <div ref={ref}>carregando...</div>}
                    </section>
                )}
            </div>

            <ButtonCreatePost />
        </>
    );
};
