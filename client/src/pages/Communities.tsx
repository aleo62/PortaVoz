import { CommunityFeed } from "@/components/features/community/CommunityFeed";
import { CommunityList } from "@/components/features/community/CommunityList";
import { Button } from "@/components/ui/Button";
import { useModal } from "@/contexts/ModalContext";
import { useCommunities } from "@/hooks/community/useCommunities";
import { CommunityData } from "@/types/communityDataType";
import { IconPlus } from "@tabler/icons-react";

const Communities = () => {
    const { openModal } = useModal();

    const { data: feedData, isLoading } = useCommunities();
    const communitiesFeed: CommunityData[] =
        (feedData?.pages.flatMap((page) => page.communities).slice(0, 5) as CommunityData[]) || [];
    const handleCreateClick = () => {
        openModal("createCommunity", {});
    };

    const { data: asideData } = useCommunities("", "desc", "asc");
    const communitiesAside: CommunityData[] =
        (asideData?.pages.flatMap((page) => page.communities).slice(0, 5) as CommunityData[]) || [];

    return (
        <main className="relative mx-auto h-ful l w-full max-w-7xl lg:grid lg:grid-cols-[2fr_auto] lg:px-8">
            <CommunityFeed communities={communitiesFeed} isLoading={isLoading} />

            <aside className="flex h-fit flex-col items-center justify-between max-md:hidden">
                <div className="py-5">
                    <h3 className="font-title text-title mb-5 text-lg">Comunidades Recentes</h3>
                    <CommunityList communities={communitiesAside} />
                </div>
            </aside>
            <Button
                text="Criar Comunidade"
                className="absolute right-5 bottom-5"
                Icon={IconPlus}
                iconLeft
                onClick={handleCreateClick}
            />
        </main>
    );
};

export default Communities;
