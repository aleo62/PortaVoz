import { useIsMobile } from "@/hooks/useIsMobile";
import { IconPlus, IconSearch } from "@tabler/icons-react";

export const HeaderOptions = ({
    openModal,
}: {
    openModal: (modalKey: string, props?: Record<string, any>) => void;
}) => {
    return (
        <div className="ml-auto flex items-center lg:gap-3 gap-2">
            <button
                className="flex items-center gap-1 rounded-xl bg-white p-3 py-2.5 shadow-2xs ring-1 ring-zinc-200 lg:w-[250px] dark:bg-zinc-900 dark:ring-zinc-800"
                onClick={() => openModal("search", {})}
            >
                <IconSearch className="size-5 lg:mr-2" />
                <span className="text-subtitle text-sm max-md:hidden">Encontre Algo</span>
                <span className="text-subtitle ml-auto text-sm max-md:hidden">⌘ + F</span>
            </button>

            <button className="bg-accent shadow-accent/20 flex h-11 w-11 lg:w-fit lg:px-8 items-center justify-center rounded-full text-sm text-white shadow-md transition-all duration-300 hover:scale-102">
                {useIsMobile() ? <IconPlus /> : "Criar Post" }
            </button>
        </div>
    );
};
