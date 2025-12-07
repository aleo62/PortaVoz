import { CommunityList } from "@/components/features/community/CommunityList";
import { Button } from "@/components/ui/Button";
import { useModal } from "@/contexts/ModalContext";
import { useCommunities } from "@/hooks/community/useCommunities";
import { IconPlus } from "@tabler/icons-react";

const Communities = () => {
    const { data } = useCommunities();
    const { openModal } = useModal();

    const handleCreateClick = () => {
        openModal("createCommunity", {});
    };

    const communities = data?.pages.flatMap((page) => page.communities) || [];

    return (
        <main className="mx-auto h-full w-full max-w-7xl grid-cols-[2fr_auto] lg:grid lg:px-8">
            <CommunityList communities={communities} />

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
