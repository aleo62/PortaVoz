import { db } from "@/firebase";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
export const Dashboard = () => {
    const [dados, setDados] = useState<any[]>();

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

    return (
        <>
            <section className="w-full lg:px-5 py-2">
                <h1 className="font-title text-title text-4xl font-semibold">Users</h1>

                <table className="mt-10 text-subtitle divide-y-1 overflow-x-auto max-lg:block w-full divide-subtitle ring-1 ring-subtitle">
                    <tr className="divide-x-1 divide-subtitle">
                        <th>Public Id</th>
                        <th>Nome</th>
                        <th>E-mail</th>
                        <th>Ferramentas</th>
                    </tr>
                    {dados?.map((d) => (
                        <tr className="divide-x-1 divide-subtitle">
                            <td className="overflow-hidden px-2 py-1">{d._publicId}</td>
                            <td className="overflow-hidden px-2 py-1">{d.fName}</td>
                            <td className="overflow-hidden px-2 py-1">{d.email}</td>
                            <td className="overflow-hidden px-2 py-1 flex items-center justify-end gap-5"> <IconTrash/> <IconPencil/></td>
                        </tr>
                    ))}

                </table>
            </section>
        </>
    );
};
