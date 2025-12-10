import { UserData } from "@/types/userDataType";
import { Link } from "react-router-dom";

export const FollowItem = ({ user, onSelect }: { user: UserData, onSelect?: () => void }) => {
    const fullName =
        user.fName || user.lName ? `${user.fName ?? ""} ${user.lName ?? ""}`.trim() : null;

    return (
        <Link
            to={`/profile/${user._id}`}
            onClick={onSelect}
            className="flex items-center gap-3 rounded-xl p-3 transition hover:bg-zinc-100 dark:hover:bg-zinc-800"
        >
            <img
                src={user.image || "/default-user.png"}
                alt={user.username}
                className="h-12 w-12 rounded-full object-cover"
            />

            <div className="flex flex-col">
                {fullName && (
                    <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">
                        {fullName}
                    </span>
                )}

                <span className="text-sm text-zinc-500 dark:text-zinc-400">
                    @{user.username}
                </span>
            </div>
        </Link>
    );
};