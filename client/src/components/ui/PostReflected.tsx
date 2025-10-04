import { PostData } from "@/utils/types/postDataType";
import { IconArrowBigUp, IconMessageDots } from "@tabler/icons-react";

export const PostReflected = ({
    title,
    desc,
    images,
    upvotesCount,
    commentsCount,
}: Partial<PostData>) => {
    return (
        <div className="flex items-center gap-2 rounded-xl bg-white p-2 inset-ring-1 inset-ring-zinc-200 dark:bg-zinc-900 dark:inset-ring-zinc-700">
            <div className="w-50 lg:w-55 p-3">
                <h3 className="lg:text-md text-title font-title truncate text-[1.05rem]">
                    {title}
                </h3>
                <p className="text-subtitle line-clamp-2 max-w-45 text-xs">{desc}</p>

                <div className="text-subtitle mt-4 flex items-center gap-3 text-xs">
                    <span className="flex items-center gap-1">
                        <IconArrowBigUp className="size-4.5" /> {upvotesCount}
                    </span>
                    <span className="flex items-center gap-1">
                        <IconMessageDots className="size-4.5" /> {commentsCount}
                    </span>
                </div>
            </div>

            <img
                src={images?.[0] as string}
                className="h-28 w-28 rounded-xl object-cover lg:h-30 lg:w-30"
                alt=""
            />
        </div>
    );
};
