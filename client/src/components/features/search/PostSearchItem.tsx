import { PostData } from "@/types/postDataType";
import { useNavigate } from "react-router-dom";

export const PostSearchItem = ({ post, onSelect }: { post: PostData; onSelect?: () => void }) => {
    const navigate = useNavigate();

    const handleNavigatePost = () => {
        onSelect?.();
        navigate(`/post/${post._id}`);
    };

    const handleNavigateHashtag = (label: string, e: React.MouseEvent) => {
        e.stopPropagation();
        onSelect?.();
        navigate(`/feed?hashtag=${encodeURIComponent(label)}`);
    };

    return (
        <article
            className="w-full cursor-pointer gap-3 rounded-xl border border-zinc-200 p-3 transition hover:border-blue-400 hover:bg-blue-50/40 lg:px-4 dark:border-zinc-800 dark:hover:border-blue-500/60 dark:hover:bg-blue-900/10"
            onClick={handleNavigatePost}
        >
            <h3 className="text-title truncate text-base font-medium">{post.title}</h3>
            <p className="text-subtitle truncate text-xs">{post.desc}</p>

            <div className="mt-3 flex flex-wrap gap-2">
                {post.hashtags.map((hashtag: any, key) => {
                    const label =
                        typeof hashtag === "string"
                            ? hashtag
                            : (hashtag.content ?? hashtag._id ?? "");
                    return (
                        <button
                            type="button"
                            key={key}
                            onClick={(e) => handleNavigateHashtag(label, e)}
                            className="rounded-full px-3 py-1 text-xs font-medium text-blue-600 ring-1 ring-blue-100 transition hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-200 dark:ring-blue-800/70 dark:hover:bg-blue-800/40"
                        >
                            #{label}
                        </button>
                    );
                })}
            </div>
        </article>
    );
};
