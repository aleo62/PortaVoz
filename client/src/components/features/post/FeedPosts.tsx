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
            <div className="mx-auto mt-5 text-center text-zinc-500">
                <p className="text-md">Nenhum Post aqui</p>
            </div>
        );
    }

    return (
        <section
            className={`mx-automd:gap-4 flex w-full flex-col items-center gap-4 divide-zinc-200 max-lg:divide-y-[.7px] dark:divide-zinc-800 ${grid && "xxl:grid xxl:px-2 grid-cols-2"}`}
        >
            {feedLoading && <PostSkeleton />}
            {!feedLoading && posts.map((post) => <Post post={post as PostData} key={post._id} />)}

            {feedHasNextPage && <div ref={ref}>carregando...</div>}
        </section>
    );
};
