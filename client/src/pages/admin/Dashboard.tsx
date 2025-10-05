import { useStoreUser } from "@/stores/userStore";
export const Dashboard = () => {
    const { user } = useStoreUser();

    console.log(user?.token);

    return (
        <>
            <section className="w-full py-2 lg:px-5">
                <h1 className="font-title text-title text-4xl font-semibold">Users</h1>

                <div>
                    <table className="text-subtitle divide-subtitle ring-subtitle mt-10 w-full divide-y-1 overflow-x-auto ring-1 max-lg:block">
                        <tr className="divide-subtitle divide-x-1">
                            <th>Public Id</th>
                            <th>Nome</th>
                            <th>E-mail</th>
                            <th>Ferramentas</th>
                        </tr>
                    </table>
                </div>
            </section>
        </>
    );
};
