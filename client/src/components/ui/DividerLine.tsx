export const DivideLine = ({ label }: { label?: string }) => {
    return (
        <div className={`flex items-center justify-center ${label && "gap-2"}`}>
            <span className="flex-1 border-t border-zinc-300 dark:border-zinc-800"></span>
            {label && <p className="text-sm text-zinc-500 dark:text-zinc-600">{label}</p>}
            <span className="flex-1 border-t border-zinc-300 dark:border-zinc-800"></span>
        </div>
    );
};
