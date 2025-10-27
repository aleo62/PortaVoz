export const DivideLine = ({ label }: { label: string }) => {
    return (
        <div className="my-6 flex items-center justify-center gap-2">
            <span className="flex-1 border-t border-zinc-300 dark:border-zinc-700"></span>
            <p className="text-sm text-zinc-500 dark:text-zinc-600">{label}</p>
            <span className="flex-1 border-t border-zinc-300 dark:border-zinc-700"></span>
        </div>
    );
};
