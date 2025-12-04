import { PostData, UserPostData } from "@/types/postDataType";

import { IconRepeat } from "@tabler/icons-react";
import { PostHeader } from "./PostHeader";
import { PostMain } from "./PostMain";

export const Post = ({ post }: { post: PostData | UserPostData }) => {
    return (
        <>
            <article
                className={`w-full md:rounded-3xl border-b-1 border-zinc-200 bg-white md:shadow-[0_0_20px_-20px_rgba(0,0,0,0.1)] transition-all md:max-w-[620px] md:border-1 md:border-zinc-200 dark:border-zinc-800 dark:bg-zinc-900`}
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
