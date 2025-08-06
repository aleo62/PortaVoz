import { IconChevronRightPipe } from "@tabler/icons-react";

export const HeaderSidebar = ({
    title,
    isMobile,
    onClick,
}: {
    title: string;
    isMobile: boolean;
    onClick: () => void;
}) => {
    return (
        <header className="flex w-full items-center bg-transparent lg:px-6 py-3 mb-3 gap-3">
            {isMobile && (
                <button
                    className={`cursor-pointer rounded-lg bg-zinc-50 p-2 text-zinc-700 ring-1 ring-zinc-200 transition-[color] duration-300 hover:bg-zinc-100 hover:text-zinc-900 dark:bg-zinc-800 dark:text-zinc-300 dark:ring-zinc-700 dark:hover:bg-zinc-900 dark:hover:text-white`}
                    onClick={onClick}
                >
                    <IconChevronRightPipe className="size-6.5" />
                </button>
            )}
            <h3 className="text-title font-title text-xl lg:text-2xl font-semibold">{title}</h3>
        </header>
    );
};
