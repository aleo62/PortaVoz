import { PopularCommunities } from "@/components/features/community/PopularCommunities";
import { useIsMobile } from "@/hooks/useIsMobile";
import { PostData } from "@/types/postDataType";
import { FeedPosts } from "@components/features/post/FeedPosts";
import { FeedReflected } from "@components/features/post/FeedReflected";
import { usePosts } from "@hooks/posts/usePosts";

export const Feed = () => {
    const isMobile = useIsMobile();

    const {
        data: feedData,
        isLoading: feedLoading,
        fetchNextPage: fetchFeedNextPage,
        hasNextPage: feedHasNextPage,
    } = usePosts({ date: "desc" }, true);

    const posts: PostData[] = (feedData?.pages.flatMap((page) => page.posts) as PostData[]) || [];

    return (
        <main className="mx-auto mt-5 w-full max-w-7xl grid-cols-[1fr_auto] lg:grid lg:px-8">
            <FeedPosts
                posts={posts}
                feedLoading={feedLoading}
                feedHasNextPage={feedHasNextPage}
                fetchFeedNextPage={fetchFeedNextPage}
            />

            <aside className="scrollbar-thin dark:scrollbar-thumb-zinc-700 scrollbar-thumb-zinc-400 scrollbar-track-transparent sticky top-10 hidden w-80 flex-col gap-6 lg:flex">
                {!isMobile && <FeedReflected />}

                <div className="flex flex-col gap-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900">
                    <h3 className="font-title text-zinc-900 dark:text-white">
                        Comunidades Populares
                    </h3>
                    <PopularCommunities />
                </div>
            </aside>
        </main>
    );
};
