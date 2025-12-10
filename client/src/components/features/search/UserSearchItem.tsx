import { UserData } from "@/types/userDataType";
import { useNavigate } from "react-router-dom";

export const UserSearchItem = ({ user, onSelect }: { user: UserData; onSelect?: () => void }) => {
    const navigate = useNavigate();

    return (
        <div
            className="flex w-full cursor-pointer items-center gap-4 rounded-xl border border-zinc-200 p-3 transition hover:border-blue-400 hover:bg-blue-50/40 dark:border-zinc-800 dark:hover:border-blue-500/60 dark:hover:bg-blue-900/10"
            onClick={() => {
                onSelect?.();
                navigate(`/profile/${user._id}`);
            }}
        >
            <img
                src={user.image as string}
                alt="Imagem do user"
                className="h-12 w-12 rounded-xl object-cover"
            />
            <div className="leading-4.5">
                <h3 className="text-title font-medium">{user.username}</h3>
                <small className="text-subtitle text-sm">
                    {user.fName} {user.lName}
                </small>
            </div>
        </div>
    );
};
