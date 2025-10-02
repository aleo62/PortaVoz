import { useUser } from "@/contexts/UserContext";
import { db } from "@/firebase";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
export const Dashboard = () => {
    const [dados, setDados] = useState<any[]>();
    const { userDecoded } = useUser();

    useEffect(() => {
        const getDocuments = async () => {
            const querySnapshot = await getDocs(collection(db, "Users"));
            setDados(
                querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                })),
            );
        };

        getDocuments();
    }, []);

    console.log(userDecoded?.token);

    return (
        <>
            <section className="w-full py-2 lg:px-5">
                <h1 className="font-title text-title text-4xl font-semibold">Users</h1>

                <table className="text-subtitle divide-subtitle ring-subtitle mt-10 w-full divide-y-1 overflow-x-auto ring-1 max-lg:block">
                    <tr className="divide-subtitle divide-x-1">
                        <th>Public Id</th>
                        <th>Nome</th>
                        <th>E-mail</th>
                        <th>Ferramentas</th>
                    </tr>
                    {dados?.map((d) => (
                        <tr className="divide-subtitle divide-x-1">
                            <td className="overflow-hidden px-2 py-1">{d._id}</td>
                            <td className="overflow-hidden px-2 py-1">{d.fName}</td>
                            <td className="overflow-hidden px-2 py-1">{d.email}</td>
                            <td className="flex items-center justify-end gap-5 overflow-hidden px-2 py-1">
                                <IconTrash /> <IconPencil />
                            </td>
                        </tr>
                    ))}
                </table>
            </section>
        </>
    );
};
