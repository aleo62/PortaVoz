import { CommunityCard } from "./CommunityCard";

interface CommunityListProps {
    communities: any[];
}

export const CommunityList = ({ communities }: CommunityListProps) => {
    return (
        <section className="flex h-full max-w-2xl w-full flex-col py-5 gap-5">
            {communities.map((community) => (
                <CommunityCard key={community._id} community={community} />
            ))}
        </section>
    );
};
