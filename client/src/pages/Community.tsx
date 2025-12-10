import { CommunityHeader } from "@/components/features/community/CommunityHeader";
import { CommunityMembers } from "@/components/features/community/CommunityMembers";
import { FeedPosts } from "@/components/features/post/FeedPosts";
import { Button } from "@/components/ui/Button";
import { useCommunity } from "@/hooks/community/useCommunity";
import { useCommunityPosts } from "@/hooks/community/useCommunityPosts";
import { useIsMobile } from "@/hooks/useIsMobile";
import Communities from "@/pages/Communities";
import { IconCalendar, IconUser, IconWorld } from "@tabler/icons-react";
import { useParams } from "react-router-dom";

const Community = () => {
    const { id } = useParams<{ id: string }>();
    const isMobile = useIsMobile();

    const { data: communityData, isLoading: isCommunityLoading, isError } = useCommunity(id || "");
    const {
        data: postsData,
        isLoading: isPostsLoading,
        hasNextPage,
        fetchNextPage,
    } = useCommunityPosts(id || "");

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

    function formatarData(data: string | number | Date) {
        const date = new Date(data);

        if (isNaN(date.getTime())) return "Data inválida";

        return date.toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        });
    }

    return (
        <main className="mx-auto mt-5 h-fit w-full max-w-7xl flex  flex-col">
            {!id && <Communities />}

            {id && (
                <>
                    <CommunityHeader community={community} />
                    <div className="mt-6 flex gap-8 max-lg:flex-col-reverse w-full">
                        <div className="flex-1">
                            <FeedPosts
                                posts={posts}
                                feedLoading={isPostsLoading}
                                feedHasNextPage={hasNextPage}
                                fetchFeedNextPage={fetchNextPage}
                            />
                        </div>
                        <div className="flex gap-4 px-1 lg:w-80 lg:flex-col">
                            <div className="h-fit rounded-2xl p-5 ring-1 ring-zinc-200 dark:ring-zinc-800">
                                <h3 className="text-title font-title text-lg">Sobre</h3>
                                <p className="text-subtitle mb-4 text-sm">
                                    {community.description}
                                </p>
                                <div className="flex flex-col justify-center gap-2">
                                    <span className="text-title flex items-center gap-2 text-sm">
                                        <IconCalendar /> Criado em{" "}
                                        {formatarData(community.createdAt)}
                                    </span>
                                    <span className="text-title flex items-center gap-2 text-sm">
                                        <IconUser /> {community.membersCount} membros
                                    </span>
                                    <span className="text-title flex items-center gap-2 text-sm">
                                        <IconWorld /> Comunidade{" "}
                                        {community.isPrivate ? "privada" : "pública"}
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-col h-fit gap-4 rounded-2xl p-5 ring-1 ring-zinc-200 dark:ring-zinc-800">
                                <h3 className="font-title text-title text-lg">Membros</h3>
                                {isMobile ? (
                                    <Button text="Ver Membros" styleType="outlined" size="small" />
                                ) : (
                                    <CommunityMembers communityId={community._id} />
                                )}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </main>
    );
};

export default Community;
