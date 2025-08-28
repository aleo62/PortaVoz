import { PostData } from "@/utils/types/postDataType";
import { IconArrowBigUp, IconMessageDots } from "@tabler/icons-react";

export const PostPreview = ({ title, desc, upvotesCount, commentsCount }: Partial<PostData>) => {
    return (
        <div className="flex h-35 items-center gap-2 rounded-xl bg-white p-2 ring-1 ring-zinc-200 dark:bg-zinc-900 dark:ring-zinc-700">
            <div className="h-30 p-3">
                <h3 className="text-md text-title font-title font-medium">
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
                src="https://res.cloudinary.com/dzruwovge/image/upload/v1756208400/posts/bdhf9mrpae5skuagmvsy.png"
                className="h-30 w-30 rounded-xl object-cover"
                alt=""
            />
        </div>
    );
};
