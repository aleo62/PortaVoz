import { useModal } from "@/contexts/ModalContext";
import { useDeleteUser } from "@/hooks/user/useDeleteUser";
import { useUsers } from "@/hooks/user/useUsers";
import { UserData } from "@/types/userDataType";
import { IconSearch, IconTrash } from "@tabler/icons-react";
import { useState } from "react";

export const AdminUsers = () => {
    const [search, setSearch] = useState("");
    const { data: usersData, isLoading } = useUsers(true);
    const { mutate: deleteUser } = useDeleteUser();
    const { openModal } = useModal();

    const users: Partial<UserData>[] =
        (usersData?.pages.flatMap((page) => page.users) as Partial<UserData>[]) || [];

    const filteredUsers = users.filter(
        (user) =>
            user.username?.toLowerCase().includes(search.toLowerCase()) ||
            user.fName?.toLowerCase().includes(search.toLowerCase()) ||
            user.email?.toLowerCase().includes(search.toLowerCase()),
    );

    const handleDelete = (userId: string) => {
        if (confirm("Are you sure you want to delete this user?")) {
            deleteUser(userId);
        }
    };

    const handleEdit = (user: Partial<UserData>) => {
        openModal("adminEditUser", { user });
    };

    return (
        <div className="flex h-fit flex-1 flex-col gap-4">
            <div className="flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-3 py-2 dark:border-zinc-800 dark:bg-zinc-900">
                <IconSearch className="text-zinc-400" size={20} />
                <input
                    type="text"
                    placeholder="Search users..."
                    className="w-full bg-transparent outline-none placeholder:text-zinc-400 dark:text-zinc-100"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {/* Desktop Table View */}
            <div className="hidden overflow-hidden rounded-xl ring-1 ring-zinc-200 md:block dark:ring-zinc-800">
                <table className="w-full text-left text-sm">
                    <thead className="bg-zinc-50 text-zinc-500 dark:bg-zinc-800/50 dark:text-zinc-400">
                        <tr>
                            <th className="px-4 py-3 font-medium">User</th>
                            <th className="px-4 py-3 font-medium">Email</th>
                            <th className="px-4 py-3 font-medium">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                        {isLoading ? (
                            <tr>
                                <td colSpan={3} className="p-4 text-center text-zinc-500">
                                    Loading...
                                </td>
                            </tr>
                        ) : filteredUsers.length === 0 ? (
                            <tr>
                                <td colSpan={3} className="p-4 text-center text-zinc-500">
                                    No users found
                                </td>
                            </tr>
                        ) : (
                            filteredUsers.map((user) => (
                                <tr
                                    key={user._id}
                                    className="group hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                                >
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={
                                                    user.image ||
                                                    `https://ui-avatars.com/api/?name=${user.username}`
                                                }
                                                alt={user.username}
                                                className="h-8 w-8 rounded-full object-cover"
                                            />
                                            <div>
                                                <div className="font-medium text-zinc-900 dark:text-zinc-100">
                                                    {user.fName}
                                                </div>
                                                <div className="text-xs text-zinc-500">
                                                    {user.username}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">
                                        {user.email}
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => user._id && handleDelete(user._id)}
                                                className="rounded-lg p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                                                title="Delete user"
                                            >
                                                <IconTrash size={18} />
                                            </button>

                                            <button
                                                onClick={() => handleEdit(user)}
                                                className="rounded-lg p-2 text-zinc-500 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
                                                title="Edit user"
                                            >
                                                Edit
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <div className="flex flex-col gap-3 md:hidden">
                {isLoading ? (
                    <div className="p-4 text-center text-zinc-500">Loading...</div>
                ) : filteredUsers.length === 0 ? (
                    <div className="p-4 text-center text-zinc-500">No users found</div>
                ) : (
                    filteredUsers.map((user) => (
                        <div
                            key={user._id}
                            className="flex flex-col gap-3 rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900"
                        >
                            <div className="flex items-center gap-3">
                                <img
                                    src={
                                        user.image ||
                                        `https://ui-avatars.com/api/?name=${user.username}`
                                    }
                                    alt={user.username}
                                    className="h-10 w-10 rounded-full object-cover"
                                />
                                <div>
                                    <div className="font-medium text-zinc-900 dark:text-zinc-100">
                                        {user.fName}
                                    </div>
                                    <div className="text-xs text-zinc-500">{user.username}</div>
                                </div>
                            </div>
                            <div className="text-sm text-zinc-600 dark:text-zinc-400">
                                {user.email}
                            </div>
                            <div className="flex items-center gap-2 border-t border-zinc-100 pt-3 dark:border-zinc-800">
                                <button
                                    onClick={() => user._id && handleDelete(user._id)}
                                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                                >
                                    <IconTrash size={18} />
                                    Delete
                                </button>
                                <button
                                    onClick={() => handleEdit(user)}
                                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-zinc-500 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
                                >
                                    Edit
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};
