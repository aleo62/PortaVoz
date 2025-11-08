interface SidebarProfileItemProps {
    label: string;
    Icon: React.ElementType;
    onClick: () => void;
    key: number;
    isActive: boolean;
}

export const SidebarProfileItem = ({
    label,
    Icon,
    onClick,
    isActive,
}: SidebarProfileItemProps) => {
    return (
        <li className="w-40 lg:w-full">
            <button
                className={`transition-color flex h-11 items-center gap-2 px-3 py-3 text-sm font-medium ${isActive ? "text-white" : "text-zinc-700 hover:bg-gray-100 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-950 dark:hover:text-white"} w-full rounded-md`}
                onClick={onClick}
            >
                <Icon className="h-5 w-5" />
                {label}
            </button>
        </li>
    );
};
