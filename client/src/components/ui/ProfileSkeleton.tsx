import { HeaderSidebar } from "@/components/sidebar/HeaderSidebar";

export const ProfileSkeleton = () => {
    return (
        <div className="w-full">
            <HeaderSidebar linkBack />

            <section className="mx-auto w-full max-w-4xl rounded-2xl bg-white pb-9 shadow-[0px_4px_55px_-19px_rgba(0,_0,_0,_0.1)] lg:rounded-3xl lg:p-2 lg:pb-10 dark:bg-zinc-900">
                <header>
                    {/* Banner + avatar area */}
                    <div className="text-title relative h-full w-full">
                        {/* Banner placeholder */}
                        <div className="h-40 w-full animate-pulse rounded-t-2xl bg-stone-300 md:h-60 dark:bg-zinc-800"></div>

                        {/* Avatar placeholder positioned responsively */}
                        <div className="absolute top-[50%] left-[50%] h-32 w-32 translate-x-[-50%] animate-pulse rounded-full bg-stone-300 ring-3 ring-white lg:left-5 lg:h-40 lg:w-40 lg:translate-x-0 dark:bg-zinc-800 dark:ring-zinc-900"></div>
                    </div>

                    {/* Name / subtitle / action */}
                    <div className="text-title mt-14 mb-4 flex w-full flex-col justify-between gap-3 px-2 text-center lg:mt-15 lg:flex-row lg:items-center lg:px-8 lg:text-start">
                        <div className="w-full lg:w-auto">
                            {/* Name placeholder */}
                            <div className="mx-auto h-7 w-48 animate-pulse rounded bg-stone-300 lg:mx-0 dark:bg-zinc-800"></div>

                            {/* Subtitle placeholder */}
                            <div className="mx-auto mt-2 h-4 w-36 animate-pulse rounded bg-stone-200 lg:mx-0 dark:bg-zinc-800"></div>
                        </div>

                        <div className="flex justify-center lg:justify-end">
                            {/* Button placeholder */}
                            <div className="h-9 w-28 animate-pulse rounded-full bg-stone-200 dark:bg-zinc-800"></div>
                        </div>
                    </div>

                    {/* Stats placeholders */}
                    <div className="text-title mb-5 flex items-center justify-center divide-x-1 divide-zinc-300 px-2 text-sm lg:justify-start lg:divide-zinc-700 lg:px-8">
                        <div className="pr-4">
                            <div className="h-4 w-24 animate-pulse rounded bg-stone-200 dark:bg-zinc-800"></div>
                        </div>
                        <div className="pl-4">
                            <div className="h-4 w-24 animate-pulse rounded bg-stone-200 dark:bg-zinc-800"></div>
                        </div>
                    </div>

                    {/* About section placeholder */}
                    <div className="mt-12 px-5 lg:px-8">
                        <div className="h-6 w-40 animate-pulse rounded bg-stone-300 dark:bg-zinc-800"></div>

                        <div className="mt-3 space-y-2">
                            <div className="h-3 w-full animate-pulse rounded bg-stone-200 dark:bg-zinc-800"></div>
                            <div className="h-3 w-5/6 animate-pulse rounded bg-stone-200 dark:bg-zinc-800"></div>
                            <div className="h-3 w-3/4 animate-pulse rounded bg-stone-200 dark:bg-zinc-800"></div>
                        </div>
                    </div>
                </header>
            </section>
        </div>
    );
};
