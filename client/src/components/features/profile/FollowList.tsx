import { ModalDefaultProps } from "@/contexts/ModalContext";
import { ModalProvider } from "@/contexts/ModalProvider";
import { UserData } from "@/types/userDataType";
import { motion } from "framer-motion";
import { UserSearchItem } from "../search/UserSearchItem";

type ListModalProps = ModalDefaultProps & {
    title: string;
    items: UserData[];
    loading?: boolean;
};

export function ListModal({ title, items, loading, zIndex }: ListModalProps) {
    return (
        <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.95 }}
            transition={{ duration: 0.1 }}
            className="relative mx-auto my-auto max-lg:max-w-[97%] flex h-fit w-full max-w-md flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-2xl dark:border-zinc-800 dark:bg-zinc-900"
            style={{ zIndex }}
        >
            <header className="flex items-center justify-between border-b text-title border-zinc-200 px-4 py-4 text-lg font-medium dark:border-zinc-800">
                <span>{title}</span>
                <ModalProvider.Close />
            </header>

            <main className="flex-1 space-y-3 overflow-auto p-4">
                {loading ? (
                    <div className="flex justify-center py-8">
                        <div className="loader"></div>
                    </div>
                ) : items.length > 0 ? (
                    items.map((item) => <UserSearchItem user={item} />)
                ) : (
                    <p className="text-center text-zinc-500">Nada encontrado :(</p>
            )}
            </main>
        </motion.div>
    );
}
