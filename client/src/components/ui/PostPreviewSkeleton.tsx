export const PostPreviewSkeleton = () => {
    return (
        <div className="flex w-[368px] animate-pulse items-center gap-2 rounded-xl bg-white p-2 ring-1 ring-zinc-200 dark:bg-zinc-900 dark:ring-zinc-700">
            <div className="flex h-28 lg:h-30 flex-col justify-between p-3">
                <div>
                    <div className="h-4 w-3/4 rounded bg-zinc-200 dark:bg-zinc-700"></div>
                    <div className="mt-2 h-3 w-full rounded bg-zinc-200 dark:bg-zinc-700"></div>
                    <div className="mt-1 h-3 w-2/3 rounded bg-zinc-200 dark:bg-zinc-700"></div>
                </div>

                <div className="mt-4 flex items-center gap-3">
                    <div className="h-3 w-10 rounded bg-zinc-200 dark:bg-zinc-700"></div>
                    <div className="h-3 w-12 rounded bg-zinc-200 dark:bg-zinc-700"></div>
                </div>
            </div>

            <div className="lg:h-30 lg:w-30 h-28 w-28 rounded-xl bg-zinc-200 dark:bg-zinc-700 ml-auto"></div>
        </div>
    );
};
