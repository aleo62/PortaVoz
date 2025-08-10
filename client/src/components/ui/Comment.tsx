import { useUser } from "@/contexts/UserContext";
import { useCreateVote } from "@/hooks/vote/useCreateVote";
import { useDeleteVote } from "@/hooks/vote/useDeleteVote";
import { formatDate } from "@/utils/formatHour";
import { CommentData } from "@/utils/types/commentDataType";
import { IconDotsVertical, IconThumbUp } from "@tabler/icons-react";
import { useState } from "react";
import { CommentDrop } from "../drop/CommentDrop";

export const Comment = ({
    comment,
    onDeleteComment,
}: {
    comment: CommentData;
    onDeleteComment: () => void;
}) => {
    const { userData, userDecoded } = useUser();
    const date = formatDate(new Date(comment.createdAt));
    const [isUpvoted, setIsUpvoted] = useState(comment.isUpvoted);
    const [optionsContainerOpen, setOptionsContainerOpen] = useState(false);

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

    return (
        <div className="flex w-full items-start gap-3">
            <header className="gap-1">
                <img src={comment.userPhoto} className="h-9 w-9 rounded-full" alt="User photo" />
            </header>

            <main className="flex-1 pt-[.5rem]">
                <div className="relative flex items-center gap-2">
                    <h3 className="text-title text-[.92rem] font-medium">{comment.userName}</h3>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400">{date}</span>
                    <IconDotsVertical
                        className="text-subtitle ml-auto size-3.5"
                        onClick={() => setOptionsContainerOpen(true)}
                    />
                    <CommentDrop
                        isOpen={optionsContainerOpen}
                        orientation="top"
                        onClose={() => setOptionsContainerOpen(false)}
                        isOwner={
                            comment.userId == userData?._publicId || !!userDecoded?.claims.admin
                        }
                        onDeleteComment={onDeleteComment}
                    />
                </div>

                <p className="mt-1 text-sm text-zinc-800 dark:text-zinc-200"> {comment.content} </p>

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
                    <button className="text-xs text-zinc-500 dark:text-zinc-400">Responder</button>
                </div>
            </main>
        </div>
    );
};
