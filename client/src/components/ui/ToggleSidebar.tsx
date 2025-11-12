import { useIsMobile } from "@/hooks/useIsMobile";
import { useStoreSidebar } from "@/stores/sidebarStore";
import { IconMenu3 } from "@tabler/icons-react";

export const ToggleSidebar = () => {
    const { toggle } = useStoreSidebar();

    return (
        useIsMobile() && (
            <button
                className={`cursor-pointer rounded-lg bg-zinc-50 p-2 text-zinc-700 ring-1 ring-zinc-200 transition-[color] duration-300 hover:bg-zinc-200 hover:text-zinc-900 dark:bg-zinc-800 dark:text-zinc-300 dark:ring-zinc-700 dark:hover:bg-zinc-900 dark:hover:text-white`}
                onClick={toggle}
            >
                <IconMenu3 className="size-6.5" />
            </button>
        )
    );
};
