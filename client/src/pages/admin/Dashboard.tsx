import { useUsers } from "@/hooks/user/useUsers";
import { UserData } from "@/utils/types/userDataType";
import { useEffect } from "react";
export const Dashboard = () => {
    const { data: usersData } = useUsers(true);

    useEffect(() => {
        console.log(usersData);
    }, [usersData]);
    const users: Partial<UserData>[] =
        (usersData?.pages.flatMap((page) => page.users) as Partial<UserData>[]) || [];

    return (
        <>
            <section className="container max-w-7xl lg:px-10">
                <h1 className="font-title text-title text-4xl font-semibold">Users</h1>

                <div className="mt-3 divide-y-1 divide-zinc-200 rounded-2xl bg-white p-4 dark:bg-zinc-900">
                    {users.map((user) => (
                        <fieldset className="p-2">{user.username}</fieldset>
                    ))}
                </div>
            </section>
        </>
    );
};
