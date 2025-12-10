import { useCommunityMembers } from "@/hooks/community/useCommunityMembers";
import { Link } from "react-router-dom";

interface CommunityMembersProps {
    communityId: string;
}

export const CommunityMembers = ({ communityId }: CommunityMembersProps) => {
    const { data, fetchNextPage, hasNextPage } = useCommunityMembers(communityId);
    const members = data?.pages.flatMap((page) => page.members) || [];

    return (
        <>
            <div className="flex flex-col gap-3">
                {members.map((member: any) => (
                    <Link
                        to={`/profile/${member.userId._id}`}
                        key={member._id}
                        className="flex items-center gap-3 rounded-xl p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    >
                        <img
                            src={
                                member.userId.image ||
                                "https://res.cloudinary.com/di5bma0gm/image/upload/v1758557907/default_image_wroapp.jpg"
                            }
                            alt={member.userId.username}
                            className="h-10 w-10 rounded-full object-cover"
                        />
                        <div className="flex flex-col">
                            <span className="text-sm font-medium text-zinc-900 dark:text-white">
                                {member.userId.fName} {member.userId.lName}
                            </span>
                            <span className="text-xs text-zinc-500">@{member.userId.username}</span>
                        </div>
                    </Link>
                ))}
            </div>
            {hasNextPage && (
                <button
                    onClick={() => fetchNextPage()}
                    className="text-sm font-medium text-blue-500 hover:underline"
                >
                    Load more
                </button>
            )}
        </>
    );
};
