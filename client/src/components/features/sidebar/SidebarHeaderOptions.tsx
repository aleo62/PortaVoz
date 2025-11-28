import { IconSearch } from "@tabler/icons-react";

export const HeaderOptions = ({ openModal }: { openModal: (modalKey: string, props?: Record<string, any>) => void }) => {
    return (
        <div className="ml-auto flex items-center lg:gap-3">
            <button
                className="flex w-[300px] items-center gap-1 rounded-xl bg-white dark:bg-zinc-900 p-3 py-2.5 shadow-2xs ring-1 ring-zinc-200 dark:ring-zinc-800"
                onClick={() => openModal("search", {})}
            >
                <IconSearch className="mr-2 size-5" />
                <span className="text-subtitle text-sm">Encontre Algo</span>

                <span className="text-subtitle ml-auto text-sm">⌘ + F</span>
            </button>
        </div>
    );
};
