export const PostReflectedSkeleton = () => {
    return (
        <div className="relative h-45 w-full max-w-75 animate-pulse overflow-hidden rounded-xl bg-zinc-200 dark:bg-zinc-800">
            <div className="absolute inset-0 flex h-full flex-col justify-end gap-2 p-4 px-3">
                <div className="h-5 w-3/4 rounded bg-zinc-300 dark:bg-zinc-700"></div>
                <div className="space-y-1">
                    <div className="h-3 w-full rounded bg-zinc-300 dark:bg-zinc-700"></div>
                    <div className="h-3 w-2/3 rounded bg-zinc-300 dark:bg-zinc-700"></div>
                </div>
            </div>
        </div>
    );
};
