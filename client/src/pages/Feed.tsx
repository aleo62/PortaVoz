import { PopularCommunities } from "@/components/features/community/PopularCommunities";
import { useIsMobile } from "@/hooks/useIsMobile";
import { PostData } from "@/types/postDataType";
import { FeedPosts } from "@components/features/post/FeedPosts";
import { FeedReflected } from "@components/features/post/FeedReflected";
import { usePosts } from "@hooks/posts/usePosts";
import { IconX } from "@tabler/icons-react";
import { useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export const Feed = () => {
    const isMobile = useIsMobile();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const hashtag = searchParams.get("hashtag") || undefined;

    const filters = useMemo(() => {
        return {
            date: "desc" as const,
            ...(hashtag ? { tags: [hashtag] } : {}),
        };
    }, [hashtag]);

    const {
        data: feedData,
        isLoading: feedLoading,
        fetchNextPage: fetchFeedNextPage,
        hasNextPage: feedHasNextPage,
    } = usePosts(filters, true);

    const posts: PostData[] = (feedData?.pages.flatMap((page) => page.posts) as PostData[]) || [];

    const clearHashtagFilter = () => {
        const next = new URLSearchParams(searchParams);
        next.delete("hashtag");
        navigate({ pathname: "/feed", search: next.toString() });
    };

    return (
        <>
            {hashtag && (
                <div className="flex items-center justify-between gap-2  max-w-7xl mx-auto w-full lg:px-8 my-10">
                    <h3 className="text-title font-title text-2xl">Filtrado por: <span className="text-accent">#{hashtag}</span></h3>

                    <IconX onClick={clearHashtagFilter} size={18} />
                </div>
            )}
            <main className="mx-auto mt-5 w-full max-w-7xl grid-cols-[2fr_1fr] lg:grid lg:px-8">
                <FeedPosts
                    posts={posts}
                    feedLoading={feedLoading}
                    feedHasNextPage={feedHasNextPage}
                    fetchFeedNextPage={fetchFeedNextPage}
                />

                {!isMobile && (
                    <aside className="scrollbar-thin dark:scrollbar-thumb-zinc-700 scrollbar-thumb-zinc-400 scrollbar-track-transparent sticky top-10 hidden w-full max-w-80 flex-col gap-6 lg:flex">
                        <FeedReflected />

                        <div className="flex flex-col gap-4 rounded-2xl">
                            <h3 className="font-title text-zinc-900 dark:text-white">
                                Comunidades Populares
                            </h3>
                            <PopularCommunities />
                        </div>
                    </aside>
                )}
            </main>
        </>
    );
};
