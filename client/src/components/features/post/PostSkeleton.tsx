export const PostSkeleton = () => {
    const Skeleton = ({ className }: { className: string }) => (
        <div className={`animate-pulse bg-zinc-200 dark:bg-zinc-700 ${className}`} />
    );

    return [1, 2, 3].map((i) => (
        <article
            key={i}
            className="w-full border-zinc-200 bg-white transition-all md:max-w-2xl md:rounded-3xl md:border-1 md:border-zinc-200 md:shadow-[0_0_20px_-20px_rgba(0,0,0,0.1)] dark:border-zinc-800 dark:bg-zinc-900"
        >
            <header className="flex items-center gap-3 p-3 py-5 lg:px-5 lg:py-6">
                <Skeleton className="h-11 w-11 rounded-full lg:h-13 lg:w-13" />
                <div className="flex flex-col gap-2">
                    <Skeleton className="h-4 w-32 rounded lg:w-40" />
                    <Skeleton className="h-3 w-20 rounded lg:w-24" />
                </div>
                <Skeleton className="ml-auto h-5 w-5 rounded" />
            </header>

            <main className="relative px-1 lg:px-2">
                <Skeleton className="h-120 w-full rounded-2xl md:h-155" />

                <div className="space-y-7 px-1 py-6 md:px-3">
                    <div className="flex items-center gap-5 lg:gap-8">
                        <div className="flex items-center gap-2">
                            <Skeleton className="h-6 w-6 rounded" />
                            <Skeleton className="h-4 w-6 rounded" />
                        </div>
                        <div className="flex items-center gap-2">
                            <Skeleton className="h-6 w-6 rounded" />
                            <Skeleton className="h-4 w-6 rounded" />
                        </div>
                        <div className="flex items-center gap-2">
                            <Skeleton className="h-6 w-6 rounded" />
                            <Skeleton className="h-4 w-6 rounded" />
                        </div>

                        <div className="ml-auto flex items-center gap-3">
                            <Skeleton className="h-6 w-6 rounded" />
                            <Skeleton className="h-6 w-6 rounded" />
                            <Skeleton className="h-6 w-6 rounded" />
                        </div>
                    </div>

                    <div>
                        <Skeleton className="mb-4 h-6 w-3/4 rounded lg:h-8" />

                        <div className="mb-2 flex flex-col gap-2">
                            <Skeleton className="h-4 w-full rounded" />
                            <Skeleton className="h-4 w-5/6 rounded" />
                        </div>

                        <div className="flex gap-2 pt-2">
                            <Skeleton className="h-3 w-16 rounded" />
                            <Skeleton className="h-3 w-20 rounded" />
                            <Skeleton className="h-3 w-12 rounded" />
                        </div>
                    </div>
                </div>
            </main>
        </article>
    ));
};
