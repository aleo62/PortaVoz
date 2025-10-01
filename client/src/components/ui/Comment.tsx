import { useUser } from "@/contexts/UserContext";
import { useComments } from "@/hooks/comments/useComments";
import { useDeleteComment } from "@/hooks/comments/useDeleteComment";
import { useUserById } from "@/hooks/user/useUser";
import { useCreateVote } from "@/hooks/vote/useCreateVote";
import { useDeleteVote } from "@/hooks/vote/useDeleteVote";
import { formatDate } from "@/utils/formatHour";
import { CommentData } from "@/utils/types/commentDataType";
import { IconChevronDown, IconChevronUp, IconDotsVertical, IconThumbUp } from "@tabler/icons-react";
import { useRef, useState } from "react";
import { CommentDrop } from "../drop/CommentDrop";

export const Comment = ({
    comment,
    onDeleteComment,
    reply,
}: {
    comment: CommentData;
    onDeleteComment: () => void;
    reply?: boolean;
}) => {
    const { userDecoded } = useUser();
    const date = formatDate(new Date(comment.createdAt));
    const [isUpvoted, setIsUpvoted] = useState(comment.isUpvoted);
    const [optionsContainerOpen, setOptionsContainerOpen] = useState(false);
    const [replyInputOpen, setReplyInputOpen] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const { data: userData } = useUserById();
    const createComment = useCreateComment(userData as UserData);
    const [commentInput, setCommentInput] = useState("");
    const [repliesOpen, setRepliesOpen] = useState(false);
    const { data: repliesData, hasNextPage } = useComments(comment._id);

    const replies = repliesData?.pages.flatMap((page) => page.comments) ?? [];

    // VOTE MANAGEMENT
    const createVote = useCreateVote();
    const deleteVote = useDeleteVote();

    const deleteUpvote = async () => {
        setIsUpvoted(false);
        comment.isUpvoted = false;
        comment.upvotesCount = comment.upvotesCount - 1;

        await deleteVote.mutate(comment._id);
    };

    const addUpvote = async () => {
        setIsUpvoted(true);
        comment.isUpvoted = true;
        comment.upvotesCount = comment.upvotesCount + 1;

        await createVote.mutate(comment._id);
    };

    // REPLIES MANAGEMENT
    const deleteComment = useDeleteComment();

    const handleDeleteComment = async (id: string) => {
        await deleteComment.mutate(id);
    };

    const handleCreateReply = async (e: React.FormEvent) => {
        e.preventDefault();

        setReplyInputOpen(false);
        comment.repliesCount++;

        await createComment.mutate({
            content: commentInput,
            parentId: comment._id,
        });
    };

    return (
        <>
            <div className="flex w-full items-start gap-3">
                <header className="gap-1">
                    <img
                        src={comment.userPhoto}
                        className="h-9 w-9 rounded-full object-cover"
                        alt="User photo"
                    />
                </header>

                <main className="flex-1 pt-[.5rem]">
                    <div className="flex items-center gap-2">
                        <h3 className="text-title text-[.92rem] font-medium">{comment.userName}</h3>
                        <span className="text-xs text-zinc-500 dark:text-zinc-400">{date}</span>
                        <div className="relative ml-auto">
                            <IconDotsVertical
                                className="text-subtitle size-3.5"
                                onClick={() => setOptionsContainerOpen(true)}
                            />
                            <CommentDrop
                                isOpen={optionsContainerOpen}
                                orientation="top"
                                onClose={() => setOptionsContainerOpen(false)}
                                isOwner={
                                    comment.userId == userData?._id || !!userDecoded?.claims.admin
                                }
                                onDeleteComment={onDeleteComment}
                            />
                        </div>
                    </div>

                    <p className="mt-1 text-sm text-zinc-800 dark:text-zinc-200">
                        {comment.content}
                    </p>

                    <div
                        className={`mt-2 flex items-center gap-4 ${isUpvoted ? "text-accent" : "text-subtitle"}`}
                    >
                        <button
                            onClick={() => {
                                isUpvoted ? deleteUpvote() : addUpvote();
                            }}
                            className={`flex items-center gap-1 rounded-lg p-1 px-4 text-xs font-semibold ${isUpvoted ? "bg-secondary-lighter" : "bg-zinc-100 dark:bg-zinc-800"}`}
                        >
                            <IconThumbUp
                                className={`size-4 ${isUpvoted ? "fill-secondary" : "fill-zinc-300"}`}
                            />
                            <p className="w-2">{comment.upvotesCount}</p>
                        </button>
                        {!reply && (
                            <button
                                onClick={() => {
                                    setReplyInputOpen(true);
                                    setTimeout(() => inputRef.current!.focus(), 100);
                                }}
                                className="text-xs text-zinc-500 dark:text-zinc-400"
                            >
                                Responder
                            </button>
                        )}
                    </div>

                    <form action="" onSubmit={(e) => handleCreateReply(e)}>
                        <input
                            type="text"
                            ref={inputRef}
                            onChange={(e) => setCommentInput(e.target.value)}
                            placeholder="Responder..."
                            className={`${!replyInputOpen && "hidden"} my-1 w-full rounded-md bg-white px-3 py-2 text-[.8rem] outline-none dark:bg-zinc-900`}
                        />
                    </form>

                    <div className={`${replies && "mt-5"} ${!repliesOpen && "hidden"}`}>
                        {repliesOpen &&
                            replies?.map((reply) => (
                                <Comment
                                    comment={reply}
                                    onDeleteComment={() => handleDeleteComment(reply._id)}
                                    reply
                                />
                            ))}
                    </div>

                    {comment.repliesCount > 0 &&
                        (repliesOpen ? (
                            hasNextPage ? (
                                <p
                                    className="text-subtitle mt-2 flex items-center gap-2 text-xs"
                                    onClick={() => setRepliesOpen(true)}
                                >
                                    <IconChevronDown className="size-3" /> Ver mais
                                </p>
                            ) : (
                                <p
                                    className="text-subtitle mt-2 flex items-center gap-2 text-xs"
                                    onClick={() => setRepliesOpen(false)}
                                >
                                    <IconChevronUp className="size-3" /> Ocultar
                                </p>
                            )
                        ) : (
                            <p
                                className="text-subtitle mt-2 flex items-center gap-2 text-xs"
                                onClick={() => setRepliesOpen(true)}
                            >
                                <IconChevronDown className="size-3" /> Ver respostas{" "}
                                {comment.repliesCount}
                            </p>
                        ))}
                </main>
            </div>
        </>
    );
};
