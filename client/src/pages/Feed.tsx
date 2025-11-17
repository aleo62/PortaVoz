import { FeedPosts } from "@/components/features/post/FeedPosts";
import { FeedReflected } from "@/components/features/post/FeedReflected";
import { ButtonCreatePost } from "@/components/ui/ButtonCreatePost";
import { useIsMobile } from "@/hooks/useIsMobile";
import { usePosts } from "@hooks/posts/usePosts";
import { PostData } from "@utils/types/postDataType";

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
        <main
            className={`xxl:gap-10 grid lg:gap-2 ${!isMobile ? "grid-cols-[1.8fr_1fr]" : "grid-cols-0"} xxl:px-10 relative mx-auto mt-5 w-full max-w-7xl lg:mt-10 lg:px-1`}
        >
            <FeedPosts
                posts={posts}
                feedLoading={feedLoading}
                feedHasNextPage={feedHasNextPage}
                fetchFeedNextPage={fetchFeedNextPage}
            />

            <ButtonCreatePost />

            {!isMobile && <FeedReflected />}
        </main>
    );
};
