import { PostData, UserPostData } from "@/types/postDataType";
import { InvalidateQueryFilters, QueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

import { useModal } from "@/contexts/ModalContext";
import { IconRepeat } from "@tabler/icons-react";
import { PostHeader } from "./PostHeader";
import { PostMain } from "./PostMain";

export const Post = ({ post }: { post: PostData | UserPostData }) => {
    const queryClient = new QueryClient();
    const { modalOpen } = useModal();

    useEffect(() => {
        if (!modalOpen) {
            queryClient.invalidateQueries(["comments", post._id] as InvalidateQueryFilters);
        }
    }, [modalOpen, post._id]);

    return (
        <>
            <article
                className={`w-full max-w-[620px] rounded-2xl bg-white pb-6 transition-all max-lg:pb-4 dark:bg-zinc-900`}
            >
                {(post as UserPostData).kind === "repost" && (
                    <p className="flex items-center gap-2 self-start p-3 px-5 text-subtitle">
                        <IconRepeat /> Repostado por {(post as UserPostData).repostedBy.username}
                    </p>
                )}
                <PostHeader post={post as PostData} />
                <PostMain post={post as PostData} />
            </article>
        </>
    );
};
