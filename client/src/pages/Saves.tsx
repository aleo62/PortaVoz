import { FeedPosts } from "@/components/features/post/FeedPosts";
import { useSaves } from "@/hooks/save/useSaves";
import { useStoreUser } from "@/stores/userStore";
import { PostData } from "@/types/postDataType";

export const Saves = () => {
    const { user } = useStoreUser();
    const { data, fetchNextPage, hasNextPage, isLoading } = useSaves(user!._id);

    const saves = (data?.pages.flatMap((page) => page.saves) as PostData[]) || [];

    return (
        <>

            <FeedPosts
                posts={saves}
                feedLoading={isLoading}
                feedHasNextPage={hasNextPage}
                fetchFeedNextPage={fetchNextPage}
            />
        </>
    );
};
