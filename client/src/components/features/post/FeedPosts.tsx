import { PostData } from "@/utils/types/postDataType";
import { Post } from "./Post";
import { PostSkeleton } from "./PostSkeleton";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

export const FeedPosts = ({
    posts,
    feedLoading,
    feedHasNextPage,
    fetchFeedNextPage
}: {
    posts: PostData[];
    feedLoading: boolean;
    feedHasNextPage: boolean;
    fetchFeedNextPage: () => void
}) => {
    const { ref, inView } = useInView({});

    useEffect(() => {
        if (inView && !feedLoading && feedHasNextPage) {
            fetchFeedNextPage();
        }
    }, [inView]);
    return (
        <section className="flex w-full flex-col items-center gap-5 overflow-x-hidden">
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
    );
};
