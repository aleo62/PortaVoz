import { Button } from "@/components/ui/Button";
import { UserData } from "@/types/userDataType";

interface AdminEditUserRolesProps {
    handlePromote: (role: "admin" | "moderator", action: "promote" | "demote") => void;
    isPromoting: boolean;
    user: UserData;
}

export const AdminEditUserRoles = ({
    handlePromote,
    isPromoting,
    user,
}: AdminEditUserRolesProps) => {
    const isAdmin = user.role === "admin";
    const isMod = user.role === "moderator";

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
                <div>
                    <h3 className="font-medium text-zinc-900 dark:text-zinc-100">Administrator</h3>
                    <p className="text-sm text-zinc-500">Full access to all system features.</p>
                </div>
                <Button
                    onClick={() => handlePromote("admin", isAdmin ? "demote" : "promote")}
                    isLoading={isPromoting}
                    text={isAdmin ? "Remove Admin" : "Make Admin"}
                    styleType={isAdmin ? "secondary" : "primary"}
                    className={
                        isAdmin
                            ? "!bg-red-50 !text-red-600 hover:!bg-red-100 dark:!bg-red-900/20 dark:!text-red-400 dark:hover:!bg-red-900/30"
                            : ""
                    }
                    size="small"
                />
            </div>
            <div className="flex items-center justify-between rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
                <div>
                    <h3 className="font-medium text-zinc-900 dark:text-zinc-100">Moderator</h3>
                    <p className="text-sm text-zinc-500">Can manage content and reports.</p>
                </div>
                <Button
                    onClick={() => handlePromote("moderator", isMod ? "demote" : "promote")}
                    isLoading={isPromoting}
                    text={isMod ? "Remove Moderator" : "Make Moderator"}
                    styleType="secondary"
                    className={
                        isMod
                            ? "!bg-red-50 !text-red-600 hover:!bg-red-100 dark:!bg-red-900/20 dark:!text-red-400 dark:hover:!bg-red-900/30"
                            : ""
                    }
                    size="small"
                />
            </div>
        </div>
    );
};
