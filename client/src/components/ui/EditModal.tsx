import { IconX } from "@tabler/icons-react";
import { motion } from "framer-motion";

type EditModalProps = {
    children: React.ReactNode;
    onClose: () => void;
    Icon: React.ElementType;
    title: string;
};

export const EditModal = ({ children, onClose, Icon, title }: EditModalProps) => {
    return (
        <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.95 }}
            transition={{ duration: 0.1 }}
            className="h-fit w-full max-w-xl space-y-5 rounded-xl bg-white dark:bg-zinc-900 my-auto"
        >
            <div className="text-title flex items-center justify-between border-b border-zinc-200 px-5 py-5 dark:border-zinc-700 dark:text-white">
                <div className="flex items-center gap-3">
                    <div className="rounded-full bg-zinc-100 p-2 ring-1 ring-zinc-300 dark:bg-zinc-950">
                        <Icon className="size-6" />
                    </div>
                    <h2 className="font-title text-lg font-semibold">{title}</h2>
                </div>

                <IconX
                    className="size-5 cursor-pointer text-zinc-500 dark:text-white"
                    onClick={onClose}
                />
            </div>
            {children}
        </motion.div>
    );
};
