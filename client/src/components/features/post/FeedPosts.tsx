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
            <div className="mx-auto text-center text-zinc-500 mt-5">
                <p className="text-md">Nenhum Post aqui</p>
            </div>
        );
    }

    return (
        <section className={`flex flex-col items-center w-full mx-auto md:mt-5 md:gap-4 max-lg:divide-y-[.7px] divide-zinc-200 dark:divide-zinc-800 ${grid && "xxl:grid xxl:px-2 grid-cols-2"}`}>
            {feedLoading && <PostSkeleton />}
            {!feedLoading && posts.map((post) => (
                <Post post={post as PostData} key={post._id} />
            ))}

            {feedHasNextPage && <div ref={ref}>carregando...</div>}
        </section>
    );
};
