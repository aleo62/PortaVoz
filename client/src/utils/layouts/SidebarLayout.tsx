import { Sidebar } from "@/components/sidebar/Sidebar";
import { IconChevronRightPipe } from "@tabler/icons-react";
import { useState } from "react";
import { useIsMobile } from "../isMobile";
import { HeaderOptions } from "@/components/sidebar/HeaderOptions";
export const SidebarLayout = ({ children }: { children: React.ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);
    const isMobile = useIsMobile();

    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} className="flex-shrink-0" />

            <div className="scrollbar-thumb-zinc-500 scrollbar-corner-zinc-950 scrollbar-thin flex h-full flex-1 flex-col overflow-hidden overflow-y-auto p-3 px-2">
                {isMobile && (
                    <div className="flex items-center justify-between lg:hidden py-5 w-full">
                        <button
                            className={`w-fit cursor-pointer rounded-lg bg-zinc-50 p-2 text-zinc-700 ring-1 ring-zinc-200 transition-[color] duration-300 hover:bg-zinc-100 hover:text-zinc-900 dark:bg-zinc-800 dark:text-zinc-300 dark:ring-zinc-700 dark:hover:bg-zinc-900 dark:hover:text-white`}
                            onClick={() => setIsOpen(true)}
                        >
                            <IconChevronRightPipe className="size-6.5" />
                        </button>
                        <HeaderOptions />
                    </div>
                )}
                <div className="flex flex-col justify-center gap-3 lg:flex-row pb-9">{children}</div>
            </div>
        </div>
    );
};
