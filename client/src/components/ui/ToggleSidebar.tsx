import { useIsMobile } from "@/hooks/useIsMobile";
import { useStoreSidebar } from "@/stores/sidebarStore";
import { IconMenu3 } from "@tabler/icons-react";

export const ToggleSidebar = () => {
    const { toggle } = useStoreSidebar();

    return (
        useIsMobile() && (
            <button
                className={`text-title cursor-pointer rounded-lg bg-white p-2 shadow-sm ring-1 dark:ring-zinc-800 ring-zinc-200 transition-all active:bg-zinc-100 dark:bg-zinc-900 active:dark:bg-zinc-800/70`}
                onClick={toggle}
            >
                <IconMenu3 className="size-6" />
            </button>
        )
    );
};
