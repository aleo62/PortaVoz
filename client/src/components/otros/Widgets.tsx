type WidgetsProps = {
    children: React.ReactNode;
    onClick?: () => void;
};

export const Widgets = ({ children, onClick }: WidgetsProps) => {
    return (
        <button onClick={onClick} className="transition-[backgound, color] flex cursor-pointer items-center justify-center gap-2 rounded-md bg-white p-3 px-1 text-sm font-medium text-zinc-600 ring-1 ring-zinc-300 duration-200 hover:bg-gray-200/50 hover:text-zinc-700 dark:bg-zinc-900 dark:hover:bg-zinc-800 dark:ring-zinc-700 dark:hover:text-white dark:text-zinc-300">
            {children}
        </button>
    );
};
