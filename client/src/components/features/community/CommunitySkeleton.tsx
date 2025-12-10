export const CommunitySkeleton = () => {
    return [1, 2, 3].map((i) => (
        <div
            key={i}
            className="relative flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900"
        >
            {/* Banner */}
            <div className="h-24 w-full animate-pulse bg-zinc-200 dark:bg-zinc-800" />

            <div className="flex flex-1 flex-col p-4">
                {/* Avatar */}
                <div className="-mt-10 mb-3 flex items-end justify-between">
                    <div className="h-16 w-16 animate-pulse rounded-xl border-4 border-white bg-zinc-200 dark:border-zinc-900 dark:bg-zinc-800" />
                </div>

                {/* Content */}
                <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 space-y-2">
                        <div className="h-6 w-1/2 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
                        <div className="h-4 w-1/3 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
                    </div>
                    <div className="h-5 w-5 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
                </div>
            </div>
        </div>
    ));
};
