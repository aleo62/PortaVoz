import { CommunityData } from "@/types/communityDataType";
import { Link } from "react-router-dom";

export const CommunityList = ({ communities }: { communities: CommunityData[] }) => {
    return (
        <div className="flex flex-col gap-3">
            {communities.map((community) => (
                <Link
                    to={`/communities/${community._id}`}
                    key={community._id}
                    className="flex items-center gap-3  rounded-xl p-3 hover:bg-zinc-100 dark:hover:bg-zinc-800/50"
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
                        <span className="text-sm font-medium text-zinc-900 dark:text-white truncate w-50">
                            {community.name}
                        </span>
                        <span className="text-xs text-zinc-500">
                            {community.membersCount} membros
                        </span>
                    </div>
                </Link>
            ))}
        </div>
    );
};
