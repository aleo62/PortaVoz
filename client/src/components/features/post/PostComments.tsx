import { useComments } from "@/hooks/comments/useComments";
import { useCreateComment } from "@/hooks/comments/useCreateComment";
import { useDeleteComment } from "@/hooks/comments/useDeleteComment";
import { useStoreUser } from "@/stores/userStore";
import { CommentData } from "@/types/commentDataType";
import { PostData } from "@/types/postDataType";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Comment } from "../comment/Comment";

type PostCommentsProps = {
    post: PostData;
};

export const PostComments = ({ post }: PostCommentsProps) => {
    const { user: userData } = useStoreUser();
    const [commentInput, setCommentInput] = useState("");

    const { data, isLoading, fetchNextPage, hasNextPage } = useComments(post._id, true);
    const comments: CommentData[] = data?.pages.flatMap((page) => page.comments) ?? [];

    const createComment = useCreateComment();
    const handleCreateComment = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!commentInput.trim()) return;

        await createComment.mutate({
            content: commentInput,
            parentId: post._id,
        });
        setCommentInput("");
    };

    const deleteComment = useDeleteComment();
    const handleDeleteComment = async (id: string) => {
        await deleteComment.mutate(id);
    };

    const { ref, inView } = useInView({});
    useEffect(() => {
        if (inView && !isLoading && hasNextPage) fetchNextPage();
    }, [inView]);

    return (
        <div className="mt-6 w-full border-t border-zinc-200 pt-6 dark:border-zinc-800">
            <h3 className="mb-4 text-lg font-medium text-zinc-900 dark:text-zinc-100">
                Comentários ({post.commentsCount})
            </h3>

            <form className="mb-6 flex items-center gap-3" onSubmit={(e) => handleCreateComment(e)}>
                <img
                    src={userData?.image as string}
                    alt=""
                    className="h-10 w-10 rounded-full object-cover"
                />

                <input
                    type="text"
                    placeholder="Adicione um comentário..."
                    className="focus:ring-accent text-title h-11 w-full rounded-xl bg-zinc-100 px-4 text-sm font-medium transition-all duration-300 outline-none focus:ring-2 dark:bg-zinc-900"
                    value={commentInput}
                    onChange={(e) => setCommentInput(e.target.value)}
                />
            </form>

            <div className="space-y-4">
                {comments.length <= 0 && !isLoading && (
                    <div className="text-subtitle py-4 text-center text-sm">
                        Nenhum comentário ainda. Seja o primeiro a comentar!
                    </div>
                )}

                {comments.map((comment) => (
                    <Comment
                        key={comment._id}
                        comment={comment}
                        onDeleteComment={() => handleDeleteComment(comment._id)}
                    />
                ))}

                {hasNextPage && (
                    <div ref={ref} className="text-subtitle py-2 text-center text-xs">
                        Carregando mais comentários...
                    </div>
                )}
            </div>
        </div>
    );
};
