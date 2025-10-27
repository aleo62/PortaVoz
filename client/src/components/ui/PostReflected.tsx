import { PostData } from "@/utils/types/postDataType";
import { IconArrowBigUp, IconMessageDots } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

export const PostReflected = ({ post }: { post: PostData }) => {
    const navigate = useNavigate();

    return (
        <article
            onClick={() => navigate(`/post/${post._id}`)}
            className="flex cursor-pointer items-center gap-2 rounded-2xl bg-white p-2 inset-ring-[.5px] inset-ring-zinc-200 dark:bg-zinc-900 dark:inset-ring-zinc-700"
        >
            <div className="w-50 p-3 lg:w-55">
                <h3 className="lg:text-md text-title font-title mb-0.5 truncate text-[1.01rem]">
                    {post.title}
                </h3>
                <p className="text-subtitle line-clamp-2 max-w-45 text-xs">{post.desc}</p>

                <div className="text-subtitle mt-4 flex items-center gap-3 text-xs">
                    <span className="flex items-center gap-1">
                        <IconArrowBigUp className="size-4.5" /> {post.upvotesCount}
                    </span>
                    <span className="flex items-center gap-1">
                        <IconMessageDots className="size-4.5" /> {post.commentsCount}
                    </span>
                </div>
            </div>

            <img
                src={post.images?.[0] as string}
                className="h-28 w-28 rounded-xl object-cover lg:h-30 lg:w-30"
                alt=""
            />
        </article>
    );
};
