import { PostData, UserPostData } from "@/types/postDataType";

import { IconRepeat } from "@tabler/icons-react";
import { PostHeader } from "./PostHeader";
import { PostMain } from "./PostMain";

export const Post = ({ post }: { post: PostData | UserPostData }) => {
    return (
        <>
            <article
                className={`w-full rounded-3xl border-1 border-zinc-200 bg-white shadow-[0_0_20px_-20px_rgba(0,0,0,0.1)] transition-all md:max-w-[620px] dark:border-zinc-800 dark:bg-zinc-900`}
            >
                {(post as UserPostData).kind === "repost" && (
                    <p className="text-subtitle flex items-center gap-2 self-start p-3 px-5">
                        <IconRepeat /> Repostado por {(post as UserPostData).repostedBy.username}
                    </p>
                )}
                <PostHeader post={post as PostData} />
                <PostMain post={post as PostData} />
            </article>
        </>
    );
};
