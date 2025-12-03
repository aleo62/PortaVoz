import { IconCopy, IconFlag, IconUsers } from "@tabler/icons-react";
import { getAuth } from "firebase/auth";
import { Link, useLocation } from "react-router-dom";

export const AdminSidebar = () => {
    const location = useLocation();
    const isActive = (path: string) => location.pathname === path;

    const handleCopyToken = async () => {
        const auth = getAuth();
        const token = await auth.currentUser?.getIdToken();
        if (token) {
            await navigator.clipboard.writeText(token);
            alert("Token copied to clipboard!");
        }
    };

    return (
        <aside className="flex w-full justify-between border-zinc-200 bg-white p-4 max-lg:border-b lg:h-full lg:w-64 lg:flex-col lg:border-r dark:border-zinc-800 dark:bg-zinc-900">
            <nav className="flex gap-2 lg:flex-col">
                <Link
                    to="/admin"
                    className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                        isActive("/admin")
                            ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100"
                            : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
                    }`}
                >
                    <IconUsers size={20} />
                    Users
                </Link>
                <Link
                    to="/admin/reports"
                    className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                        isActive("/admin/reports")
                            ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100"
                            : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
                    }`}
                >
                    <IconFlag size={20} />
                    Denuncias
                </Link>
            </nav>

            <button
                onClick={handleCopyToken}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
            >
                <IconCopy size={20} />
                Copy Token
            </button>
        </aside>
    );
};
