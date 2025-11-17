import { useModal } from "@/contexts/ModalContext";
import { IconSearch } from "@tabler/icons-react";
import { SearchModal } from "../search/SearchModal";

export const HeaderOptions = () => {
    const { openModal } = useModal();

    return (
        <div className="ml-auto flex items-center lg:gap-3">
            <button
                className="bg-body-background flex w-[300px] items-center gap-1 rounded-xl px-3 py-2.5 ring-1 ring-zinc-200 dark:ring-zinc-800"
                onClick={() => openModal(<SearchModal />)}
            >
                <IconSearch className="mr-2 size-5" />
                <span className="text-subtitle text-sm">Encontre Algo</span>
            </button>
        </div>
    );
};
