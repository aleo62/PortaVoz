import { PostData } from "@/types/postDataType";
import { IconArrowBigUp, IconMessageDots } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

export const PostProfilePreview = ({ post }: { post: PostData }) => {
    const navigate = useNavigate();

    return (
        <article
            key={post._id}
            onClick={() => navigate(`/post/${post._id}`)}
            className="w-full cursor-pointer gap-3 overflow-hidden rounded-3xl bg-white p-3 inset-ring-1 inset-ring-zinc-200/60 transition-all hover:scale-101 lg:p-2 dark:bg-zinc-900 dark:inset-ring-zinc-700/60"
        >
            <img
                src={post.images[0] as string}
                alt="imagem"
                className="aspect-square w-full rounded-2xl object-cover"
            />

            <div className="mt-6 h-full w-full rounded-xl to-90% px-2 pb-5">
                <h3 className="text-title text-md w-[90%] truncate">{post.title}</h3>
                <div className="text-accent space-x-1 text-sm">
                    {post.hashtags.map((hashtag) => (
                        <span>#{hashtag.content}</span>
                    ))}
                </div>

                <div className="text-subtitle mt-2 ml-auto flex w-fit items-center gap-2 text-xs">
                    <span className="flex items-center gap-1">
                        <IconArrowBigUp className="size-5" /> {post.upvotesCount}
                    </span>
                    <span className="flex items-center gap-1">
                        <IconMessageDots className="size-5" />
                        {post.commentsCount}
                    </span>
                </div>
            </div>
        </article>
    );
};
