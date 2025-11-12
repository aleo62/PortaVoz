import { FeedReflected } from "@/components/features/post/FeedReflected";
import { Post } from "@/components/features/post/Post";
import { PostSkeleton } from "@/components/features/post/PostSkeleton";
import { ButtonCreatePost } from "@/components/ui/ButtonCreatePost";
import { useIsMobile } from "@/hooks/useIsMobile";
import { usePosts } from "@hooks/posts/usePosts";
import { PostData } from "@utils/types/postDataType";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

export const Feed = () => {
    const isMobile = useIsMobile();

    const {
        data: feedData,
        isLoading: feedLoading,
        fetchNextPage: fetchFeedNextPage,
        hasNextPage: feedHasNextPage,
    } = usePosts({ date: "desc" }, true);

    const { ref, inView } = useInView({});
    const posts: PostData[] = (feedData?.pages.flatMap((page) => page.posts) as PostData[]) || [];

    useEffect(() => {
        if (inView && !feedLoading && feedHasNextPage) {
            fetchFeedNextPage();
        }
    }, [inView]);

    return (
        <main
            className={`xxl:gap-10 grid lg:gap-2 ${!isMobile ? "grid-cols-[1.8fr_1fr]" : "grid-cols-0"} relative max-w-7xl mx-auto w-full lg:px-10`}
        >
            <section className="flex w-full flex-col items-center gap-5 overflow-x-hidden mt-5">
                {feedLoading && <PostSkeleton />}

                {!feedLoading && !posts.length && (
                    <div className="mx-auto text-center text-zinc-500">
                        <p className="text-lg">Nenhuma Denúncia enviada ainda</p>
                        <p className="mt-3 text-5xl">;(</p>
                    </div>
                )}

                {!feedLoading && posts.length > 0 && (
                    <>
                        {posts.map((post: PostData) => (
                            <Post post={post} key={post._id} />
                        ))}

                        {feedHasNextPage && <div ref={ref}>carregando...</div>}
                    </>
                )}
            </section>

            <ButtonCreatePost />

            {!isMobile && <FeedReflected />}
        </main>
    );
};
