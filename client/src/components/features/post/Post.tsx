import { PostData } from "@/utils/types/postDataType";
import { InvalidateQueryFilters, QueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

import { useModal } from "@/contexts/ModalContext";
import { PostHeader } from "./PostHeader";
import { PostMain } from "./PostMain";

export const Post = ({ post }: { post: PostData }) => {
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
                <PostHeader post={post} />
                <PostMain post={post} />
            </article>
        </>
    );
};
