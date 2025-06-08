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
        <header className="flex w-full items-center bg-white border-b-1 border-zinc-200">
            <div className="flex w-full items-center divide-zinc-200 rounded-2xl p-5 px-5 ">
                {isMobile && (
                    <button
                        className="rounded-lg bg-zinc-100 p-2 mr-4  text-zinc-700 transition-[color] duration-300 hover:text-zinc-900"
                        onClick={onClick}
                    >
                        <IconChevronRightPipe className="size-6" />
                    </button>
                )}
                <h1 className="text-title font-title text-xl font-semibold pl-4 border-l-2 border-zinc-200">{title}</h1>
            </div>
        </header>
    );
};
