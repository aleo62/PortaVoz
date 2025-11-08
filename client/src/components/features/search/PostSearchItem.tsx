import { PostData } from "@/utils/types/postDataType";
import { useNavigate } from "react-router-dom";

export const PostSearchItem = ({ post }: { post: PostData }) => {
    const navigate = useNavigate();

    return (
        <article
            className="w-full cursor-pointer gap-3 rounded-xl bg-zinc-100 p-3 px-4 ring-1 ring-zinc-200 lg:px-6 dark:bg-zinc-900/30 dark:ring-zinc-800"
            onClick={() => navigate(`/post/${post._id}`)}
        >
            <h3 className="text-title truncate text-base font-medium">{post.title}</h3>
            <p className="text-subtitle truncate text-xs">{post.desc}</p>

            <div className="mt-3 ml-auto h-fit w-fit space-x-1">
                {post.hashtags.map((hashtag, key) => (
                    <span key={key} className="text-accent text-xs">{`#${hashtag}`}</span>
                ))}
            </div>
        </article>
    );
};
