import { useCommunities } from "@/hooks/community/useCommunities";
import { Link } from "react-router-dom";

export const PopularCommunities = () => {
    const { data } = useCommunities();
    const communities = data?.pages.flatMap((page) => page.communities).slice(0, 5) || [];

    return (
        <div className="flex flex-col gap-3">
            {communities.map((community) => (
                <Link
                    to={`/communities/${community._id}`}
                    key={community._id}
                    className="flex items-center gap-3 rounded-xl p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                    <img
                        src={
                            community.image ||
                            "https://res.cloudinary.com/di5bma0gm/image/upload/v1758557907/default_image_wroapp.jpg"
                        }
                        alt={community.name}
                        className="h-10 w-10 rounded-full object-cover"
                    />
                    <div className="flex flex-col">
                        <span className="text-sm font-medium text-zinc-900 dark:text-white">
                            {community.name}
                        </span>
                        <span className="text-xs text-zinc-500">
                            {community.membersCount} members
                        </span>
                    </div>
                </Link>
            ))}
        </div>
    );
};
