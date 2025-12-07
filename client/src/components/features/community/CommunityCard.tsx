import { CommunityDrop } from "@/components/features/community/CommunityDrop";
import { useDeleteCommunity } from "@/hooks/community/useDeleteCommunity";
import { useJoinCommunity } from "@/hooks/community/useJoinCommunity";
import { useStoreUser } from "@/stores/userStore";
import { IconCheck, IconDotsVertical } from "@tabler/icons-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface CommunityCardProps {
    community: any;
}

export const CommunityCard = ({ community }: CommunityCardProps) => {
    const navigate = useNavigate();
    const { user } = useStoreUser();
    const { mutate: joinCommunity } = useJoinCommunity();
    const { mutate: deleteCommunity } = useDeleteCommunity();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleJoin = () => {
        joinCommunity(community._id);
        setDropdownOpen(false);
    };

    const handleDelete = () => {
        if (confirm("Tem certeza que deseja deletar esta comunidade?")) {
            deleteCommunity(community._id);
        }
    };

    const isOwner = user?._id === community.creatorId || !!user?.claims?.admin;
    const isJoined = community.isJoined ?? false;

    return (
        <div
            onClick={() => navigate(`/communities/${community._id}`)}
            className="group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl ring-1 ring-zinc-200 transition-all dark:ring-zinc-800"
        >
            <div className="h-24 w-full bg-zinc-100 dark:bg-zinc-800">
                {community.banner && (
                    <img src={community.banner} alt="" className="h-full w-full object-cover" />
                )}
            </div>
            <div className="flex flex-1 flex-col p-4">
                <div className="-mt-10 mb-3 flex items-end justify-between">
                    <img
                        src={
                            community.image ||
                            "https://res.cloudinary.com/di5bma0gm/image/upload/v1758557907/default_image_wroapp.jpg"
                        }
                        alt={community.name}
                        className="h-16 w-16 rounded-xl border-4 border-white object-cover shadow-sm dark:border-zinc-900"
                    />
                    {isJoined && (
                        <div className="flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">
                            <IconCheck className="size-3.5" />
                            <span>Membro</span>
                        </div>
                    )}
                </div>
                <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                        <h3 className="mb-1 text-lg font-bold text-zinc-900 dark:text-zinc-100">
                            {community.name}
                        </h3>
                        <p className="line-clamp-2 text-sm text-zinc-500 dark:text-zinc-400">
                            {community.description} • {community.membersCount} membros
                        </p>
                    </div>
                    <div
                        className="relative cursor-pointer rounded-lg p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                        onClick={(e) => {
                            e.stopPropagation();
                            setDropdownOpen(!dropdownOpen);
                        }}
                    >
                        <IconDotsVertical className="text-subtitle size-4" />
                        <CommunityDrop
                            isOpen={dropdownOpen}
                            orientation="bottom"
                            onClose={() => setDropdownOpen(false)}
                            communityId={community._id}
                            isOwner={isOwner}
                            onDeleteCommunity={handleDelete}
                            onJoinCommunity={!isJoined ? handleJoin : undefined}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
