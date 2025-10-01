import { PostData } from "@/utils/types/postDataType";
import { useNavigate } from "react-router-dom";

export const PostPreview = ({ post }: { post: PostData }) => {
    const navigate = useNavigate();

    return (
        <article className="gap-3 rounded-xl bg-zinc-100 dark:bg-zinc-900/30 p-3 px-4 lg:px-6 ring-1 ring-zinc-200 w-full dark:ring-zinc-800 cursor-pointer" onClick={() => navigate(`/post/${post._id}`)}>
            <h3 className="truncate text-base font-medium text-title">{post.title}</h3>
            <p className="truncate text-xs text-subtitle">{post.desc}</p>

            <div className="mt-3 h-fit space-x-1 ml-auto w-fit">
                {post.hashtags.map((hashtag) => (
                    <span className="text-xs text-accent">{`#${hashtag}`}</span>
                ))}
            </div>
        </article>
    );
};
