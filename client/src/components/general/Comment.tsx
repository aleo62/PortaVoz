import { formatDate } from "@/utils/formatHour";
import { CommentData } from "@/utils/types/commentDataType";
import { IconThumbUp } from "@tabler/icons-react";

export const Comment = ({ comment }: { comment: CommentData }) => {
    const date = formatDate(new Date(comment.createdAt));

    return (
        <div className="flex items-start gap-3">
            <header className="gap-1">
                <img src={comment.userPhoto} className="h-9 w-9 rounded-full" alt="User photo" />
            </header>

            <main className="pt-[.5rem]">
                <div className="flex items-center gap-2">
                    <h3 className="text-title text-[.92rem] font-medium">{comment.userName}</h3>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400">{date}</span>
                </div>
                <p className="mt-1 text-sm text-zinc-800 dark:text-zinc-200"> {comment.content} </p>

                <div
                    className={`mt-2 flex items-center gap-4 ${comment.isUpvoted ? "text-accent" : "text-subtitle"}`}
                >
                    <button
                        className={`flex items-center gap-1 rounded-lg p-1 px-4 text-xs font-semibold ${comment.isUpvoted ? "bg-secondary-lighter" : "bg-zinc-100 dark:bg-zinc-800"}`}
                    >
                        <IconThumbUp
                            className={`size-4 ${comment.isUpvoted ? "fill-secondary" : "fill-zinc-300"}`}
                        />
                        {comment.upvotesCount}
                    </button>
                    <button className="text-xs text-zinc-500 dark:text-zinc-400">Responder</button>
                </div>
            </main>
        </div>
    );
};
