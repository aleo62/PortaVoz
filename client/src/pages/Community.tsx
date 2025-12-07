import { CommunityHeader } from "@/components/features/community/CommunityHeader";
import { CommunityMembers } from "@/components/features/community/CommunityMembers";
import { FeedPosts } from "@/components/features/post/FeedPosts";
import { useCommunity } from "@/hooks/community/useCommunity";
import { useCommunityPosts } from "@/hooks/community/useCommunityPosts";
import Communities from "@/pages/Communities";
import { IconCalendar, IconUser, IconWorld } from "@tabler/icons-react";
import { useParams } from "react-router-dom";

const Community = () => {
    const { id } = useParams<{ id: string }>();

    const { data: communityData, isLoading: isCommunityLoading, isError } = useCommunity(id || "");
    const {
        data: postsData,
        isLoading: isPostsLoading,
        hasNextPage,
        fetchNextPage,
    } = useCommunityPosts(id || "");

    if (!id) return <Communities />;

    if (isCommunityLoading) {
        return (
            <div className="flex h-full w-full items-center justify-center pt-20">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-zinc-200 border-t-zinc-900 dark:border-zinc-800 dark:border-t-white" />
            </div>
        );
    }

    if (isError || !communityData) {
        return (
            <div className="flex h-full w-full items-center justify-center">
                <p className="text-zinc-500">Community not found or an error occurred.</p>
            </div>
        );
    }

    const community = communityData.community;
    const posts = postsData?.pages.flatMap((page) => page.posts) || [];

    return (
        <main className="mx-auto mt-5 w-full max-w-7xl">
            <CommunityHeader community={community} />
            <div className="mt-6 flex gap-8 max-lg:flex-col-reverse">
                <div className="flex-1">
                    <FeedPosts
                        posts={posts}
                        feedLoading={isPostsLoading}
                        feedHasNextPage={hasNextPage}
                        fetchFeedNextPage={fetchNextPage}
                    />
                </div>
                <div className="flex w-80 flex-col gap-4">
                    <div className="rounded-2xl p-5 ring-1 ring-zinc-200 dark:ring-zinc-800">
                        <h3 className="text-title">Sobre</h3>
                        <p className="text-subtitle mb-4 text-sm">{community.description}</p>
                        <span className="text-title flex items-center gap-2 text-sm">
                            <IconCalendar /> Criado em {community.createdAt}
                        </span>
                        <span className="text-title flex items-center gap-2 text-sm">
                            <IconUser /> {community.membersCount} membros
                        </span>
                        <span className="text-title flex items-center gap-2 text-sm">
                            <IconWorld /> Comunidade {community.isPrivate ? "privada" : "pública"}
                        </span>
                    </div>
                    <div className="rounded-2xl p-5 ring-1 ring-zinc-200 dark:ring-zinc-800">
                        <CommunityMembers communityId={community._id} />
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Community;
