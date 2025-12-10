import { CommunityCard } from "./CommunityCard";
import { CommunitySkeleton } from "./CommunitySkeleton";

interface CommunityFeedProps {
    communities: any[];
    isLoading?: boolean;
}

export const CommunityFeed = ({ communities, isLoading }: CommunityFeedProps) => {
    return (
        <section className="flex w-full max-w-2xl flex-col gap-5 py-5">
            {isLoading ? (
                <CommunitySkeleton />
            ) : (
                communities.map((community) => (
                    <CommunityCard key={community._id} community={community} />
                ))
            )}
        </section>
    );
};
