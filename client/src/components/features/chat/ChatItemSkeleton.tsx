export const ChatItemSkeleton = () => {
    return [1, 2, 3, 4, 5].map((index) => (
        <div
            key={index}
            className="flex h-[80px] w-full animate-pulse cursor-pointer items-center gap-5 rounded-xl bg-zinc-300 p-5 py-4 dark:bg-zinc-700"
        ></div>
    ));
};
