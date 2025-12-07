import { CommunityDrop } from "@/components/features/community/CommunityDrop";
import { Button } from "@/components/ui/Button";
import { useDeleteCommunity } from "@/hooks/community/useDeleteCommunity";
import { useJoinCommunity } from "@/hooks/community/useJoinCommunity";
import { useStoreUser } from "@/stores/userStore";
import { IconDotsVertical } from "@tabler/icons-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface CommunityHeaderProps {
    community: any;
}

export const CommunityHeader = ({ community }: CommunityHeaderProps) => {
    const { user } = useStoreUser();
    const navigate = useNavigate();
    const { mutate: joinCommunity } = useJoinCommunity();
    const { mutate: deleteCommunity } = useDeleteCommunity();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleJoin = () => {
        joinCommunity(community._id);
        setDropdownOpen(false);
    };

    const handleDelete = () => {
        if (confirm("Tem certeza que deseja deletar esta comunidade?")) {
            deleteCommunity(community._id, {
                onSuccess: () => {
                    navigate("/communities");
                },
            });
        }
    };

    const isOwner = user?._id === community.creatorId || !!user?.claims?.admin;

    return (
        <header className="mb-6 flex flex-col">
            <div className="relative h-45 w-full rounded-2xl bg-zinc-100 dark:bg-zinc-800">
                {community.banner && (
                    <img
                        src={community.banner}
                        alt=""
                        className="h-full w-full rounded-2xl object-cover"
                    />
                )}
                <img
                    src={
                        community.image ||
                        "https://res.cloudinary.com/di5bma0gm/image/upload/v1758557907/default_image_wroapp.jpg"
                    }
                    alt={community.name}
                    className="absolute top-[105%] left-10 h-30 w-30 -translate-y-1/2 rounded-full border-2 border-white object-cover dark:border-zinc-900"
                />
            </div>
            <div className="mt-5 ml-40 flex items-center justify-between px-6 pb-6">
                <h1 className="font-title text-title text-4xl font-medium">{community.name}</h1>

                <div className="flex items-center gap-2">
                    <Button text="Entrar" onClick={handleJoin} />
                    <div
                        className="relative cursor-pointer rounded-lg p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                    >
                        <IconDotsVertical className="text-subtitle size-5" />
                        <CommunityDrop
                            isOpen={dropdownOpen}
                            orientation="bottom"
                            onClose={() => setDropdownOpen(false)}
                            communityId={community._id}
                            isOwner={isOwner}
                            onDeleteCommunity={handleDelete}
                        />
                    </div>
                </div>
            </div>
        </header>
    );
};
