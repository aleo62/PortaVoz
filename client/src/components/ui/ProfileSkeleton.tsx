export const ProfileSkeleton = () => {
    return (
        <>
            <header className="max-xxl:px-1 relative mx-auto mt-5 w-full max-w-7xl px-2 md:h-75">
                <div className="relative mx-auto h-40 w-full animate-pulse rounded-3xl bg-zinc-200 shadow-md lg:h-78 dark:bg-zinc-800"></div>
                <div className="border-body-background absolute top-[100%] left-10 h-35 w-35 translate-y-[-50%] animate-pulse rounded-full border-3 bg-zinc-200 shadow-md lg:top-[115%] lg:h-55 lg:w-55 dark:border-zinc-900 dark:bg-zinc-800"></div>
            </header>

            <main className="mx-auto mt-20 mb-10 w-full max-w-7xl px-4 lg:mt-8">
                <div className="flex justify-between gap-2 max-lg:flex-col lg:ml-[270px] lg:items-center">
                    <div>
                        <div className="h-8 w-48 animate-pulse rounded bg-zinc-200 lg:h-10 lg:w-64 dark:bg-zinc-800"></div>
                        <div className="mt-2 h-5 w-32 animate-pulse rounded bg-zinc-200 lg:h-6 lg:w-40 dark:bg-zinc-800"></div>
                    </div>

                    <div className="flex-shrink-0 pt-4 lg:pt-0">
                        <div className="h-9 w-32 animate-pulse rounded-full bg-zinc-200 dark:bg-zinc-800"></div>
                    </div>
                </div>

                <div className="mt-4 flex items-center gap-6 lg:ml-[270px]">
                    <div className="h-5 w-24 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800"></div>
                    <div className="h-5 w-24 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800"></div>
                    <div className="h-5 w-24 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800"></div>
                </div>

                <div className="mt-4 space-y-2 lg:ml-[270px]">
                    <div className="h-4 w-full animate-pulse rounded bg-zinc-200 dark:bg-zinc-800"></div>
                    <div className="h-4 w-5/6 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800"></div>
                </div>
            </main>

            <div className="mb-8 border-b border-zinc-200 dark:border-zinc-800">
                <div className="mx-auto flex max-w-6xl items-center justify-center gap-0">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="flex flex-1 items-center justify-center py-4">
                            <div className="h-5 w-20 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800"></div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mx-auto grid w-full max-w-7xl grid-cols-3 gap-1 md:gap-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div
                        key={i}
                        className="aspect-square w-full animate-pulse rounded-xl bg-zinc-200 dark:bg-zinc-800"
                    />
                ))}
            </div>
        </>
    );
};
