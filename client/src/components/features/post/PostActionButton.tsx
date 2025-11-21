export const PostActionButton = ({
    Icon,
    count,
    onClick,
    isActive,
    classActive,
    IconActive,
}: {
    Icon: React.ElementType;
    onClick: () => void;
    count?: number;
    isActive?: boolean;
    classActive?: string;
    IconActive?: React.ElementType;
}) => {

    return (
        <button
            className={`${isActive ? classActive : "text-zinc-400 dark:text-zinc-600"}  flex cursor-pointer items-center justify-center gap-1 rounded-full rounded-l-full transition-all hover:scale-105 active:scale-95`}
            onClick={onClick}
        >
            {isActive && IconActive ? (
                <IconActive className={`size-6`} />
            ) : (
                <Icon className={`size-6`} />
            )}
            {(count === 0 || !!count) && <span className="w-4 text-center">{count}</span>}
        </button>
    );
};
