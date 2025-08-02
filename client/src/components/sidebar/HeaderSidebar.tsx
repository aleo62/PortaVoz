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
        <header className="flex w-full items-center border-b-1 border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-900">
            <div className="flex w-full items-center divide-zinc-200 rounded-2xl p-3 px-5">
                {isMobile && (
                    <button
                        className={`cursor-pointer rounded-lg bg-zinc-50 p-2 text-zinc-700 ring-1 ring-zinc-200 transition-[color] duration-300 hover:bg-zinc-100 hover:text-zinc-900 dark:bg-zinc-800 dark:text-zinc-300 dark:ring-zinc-700 dark:hover:bg-zinc-900 dark:hover:text-white`}
                        onClick={onClick}
                    >
                        <IconChevronRightPipe className="size-6.5" />
                    </button>
                )}
                <h3 className="text-title font-title border-l-2 border-zinc-200 pl-4 text-lg font-semibold dark:border-zinc-700">
                    {title}
                </h3>
            </div>
        </header>
    );
};
