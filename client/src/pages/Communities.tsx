import { CommunityFeed } from "@/components/features/community/CommunityFeed";
import { Button } from "@/components/ui/Button";
import { useModal } from "@/contexts/ModalContext";
import { useCommunities } from "@/hooks/community/useCommunities";
import { IconPlus } from "@tabler/icons-react";

const Communities = () => {
    const { data, isLoading } = useCommunities();
    const { openModal } = useModal();

    const handleCreateClick = () => {
        openModal("createCommunity", {});
    };

    const communities = data?.pages.flatMap((page) => page.communities) || [];

    return (
        <main className="mx-auto flex-1 w-full max-w-7xl max-lg:flex flex-col lg:grid-cols-[2fr_auto] lg:grid lg:px-8">
            <CommunityFeed communities={communities} isLoading={isLoading} />

            <aside className="flex items-center justify-between">
                <Button
                    text="Criar Comunidade"
                    Icon={IconPlus}
                    iconLeft
                    onClick={handleCreateClick}
                />
            </aside>
        </main>
    );
};

export default Communities;
