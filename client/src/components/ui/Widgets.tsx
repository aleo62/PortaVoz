type WidgetsProps = {
    children: React.ReactNode;
    onClick?: () => void;
};

export const Widgets = ({ children, onClick }: WidgetsProps) => {
    return (
        <button
            onClick={onClick}
            className="transition-[backgound, color] flex cursor-pointer items-center justify-center gap-4 rounded-2xl bg-white px-3.5 h-13 text-sm font-medium text-zinc-600 ring-[.7px] ring-zinc-300 duration-200 hover:bg-gray-200/50 hover:text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:ring-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-white"
        >
            {children}
        </button>
    );
};
