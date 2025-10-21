import { IconChevronRightPipe } from "@tabler/icons-react";
import { Dispatch, SetStateAction } from "react";
import { HeaderOptions } from "./HeaderOptions";

export const SidebarMobileHeader = ({
    setIsOpen,
}: {
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
    return (
        <div className="sticky top-0 flex w-full items-center justify-between bg-gradient-to-b from-black to-transparent py-5 lg:hidden">
            <button
                className={`w-fit cursor-pointer rounded-lg bg-zinc-50 p-2 text-zinc-700 ring-1 ring-zinc-200 transition-[color] duration-300 hover:bg-zinc-100 hover:text-zinc-900 dark:bg-zinc-800 dark:text-zinc-300 dark:ring-zinc-700 dark:hover:bg-zinc-900 dark:hover:text-white`}
                onClick={() => setIsOpen(true)}
            >
                <IconChevronRightPipe className="size-6.5" />
            </button>
            <HeaderOptions />
        </div>
    );
};
