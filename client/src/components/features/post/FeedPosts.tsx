import { PostData, UserPostData } from "@/types/postDataType";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Post } from "./Post";
import { PostSkeleton } from "./PostSkeleton";

export const FeedPosts = ({
    posts,
    feedLoading,
    feedHasNextPage,
    fetchFeedNextPage,
    grid,
}: {
    posts: PostData[] | UserPostData[];
    feedLoading: boolean;
    feedHasNextPage: boolean;
    fetchFeedNextPage: () => void;
    grid?: boolean;
}) => {
    const { ref, inView } = useInView({});

    useEffect(() => {
        if (inView && !feedLoading && feedHasNextPage) {
            fetchFeedNextPage();
        }
    }, [inView]);

    if (!feedLoading && !posts.length) {
        return (
            <div className="mx-auto text-center text-zinc-500">
                <p className="text-lg">Nenhuma Denúncia enviada ainda</p>
            </div>
        );
    }

    if (feedLoading) {
        return <PostSkeleton />;
    }
    return (
        <section className={`flex flex-col mx-auto gap-4 ${grid && "xxl:grid xxl:px-2 grid-cols-2"}`}>
            {posts.map((post) => (
                <Post post={post as PostData} key={post._id} />
            ))}

            {feedHasNextPage && <div ref={ref}>carregando...</div>}
        </section>
    );
};
