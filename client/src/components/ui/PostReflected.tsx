import { PostData } from "@/utils/types/postDataType";
import { IconArrowBigUp, IconMessageDots } from "@tabler/icons-react";

export const PostReflected = ({ title, desc, images, upvotesCount, commentsCount }: Partial<PostData>) => {
    return (
        <div className="flex h-35 items-center gap-2 rounded-xl bg-white p-2 inset-ring-1 inset-ring-zinc-200 dark:bg-zinc-900 dark:inset-ring-zinc-700">
            <div className="h-30 p-3">
                <h3 className="text-md text-title font-title font-medium w-50 truncate ">
                    { title }
                </h3>
                <p className="text-subtitle max-w-45 text-xs line-clamp-2">
                    { desc }
                </p>

                <div className="text-subtitle mt-4 flex items-center gap-3 text-xs">
                    <span className="flex items-center gap-1">
                        <IconArrowBigUp className="size-4.5" /> { upvotesCount }
                    </span>
                    <span className="flex items-center gap-1">
                        <IconMessageDots className="size-4.5" /> { commentsCount }
                    </span>
                </div>
            </div>

            <img
                src={images?.[0] as string}
                className="h-30 w-30 rounded-xl object-cover"
                alt=""
            />
        </div>
    );
};
