export const PostSkeleton = () => {
    const Skeleton = ({ className }: { className: string }) => (
        <div className={`animate-pulse bg-zinc-300 dark:bg-zinc-700 ${className}`} />
    );

    return [1, 2, 3].map((i) => (
        <article
            key={i}
            className="relative w-full max-w-[620px] rounded-xl bg-white dark:bg-zinc-900"
        >
            <header className="flex items-center gap-3 p-3 py-5 lg:p-5 lg:py-6">
                <Skeleton className="h-10 w-10 rounded-3xl lg:h-12 lg:w-12" />
                <div className="flex flex-col gap-2">
                    <Skeleton className="h-3 w-28 lg:w-32" />
                    <Skeleton className="h-3 w-20 lg:w-24" />
                </div>
                <Skeleton className="ml-auto h-4 w-4 rounded" />
            </header>

            <Skeleton className="h-90 w-full md:h-135" />

            <div className="flex items-center space-x-1.5 p-3 lg:p-5">
                <Skeleton className="h-9 w-20 rounded-full" />
                <Skeleton className="h-9 w-20 rounded-full" />
                <Skeleton className="ml-auto h-5 w-16 rounded" />
            </div>

            <div className="p-3 pt-1 lg:p-5 lg:pt-2">
                <Skeleton className="mb-3 h-6 w-3/4 rounded lg:h-7" />

                <div className="mb-3 flex flex-col gap-2">
                    <Skeleton className="h-3 w-full rounded" />
                    <Skeleton className="h-3 w-5/6 rounded" />
                </div>

                <div className="flex gap-2">
                    <Skeleton className="h-3 w-12 rounded" />
                    <Skeleton className="h-3 w-16 rounded" />
                    <Skeleton className="h-3 w-10 rounded" />
                </div>
            </div>
        </article>
    ));
};
