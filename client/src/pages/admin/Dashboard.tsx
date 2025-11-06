import { useStoreUser } from "@/stores/userStore";
export const Dashboard = () => {
    const { user } = useStoreUser();

    console.log(user?.token);

    return (
        <>
            <section className="w-full py-2 lg:px-5">
                <h1 className="font-title text-title text-4xl font-semibold">Users</h1>
            </section>
        </>
    );
};
