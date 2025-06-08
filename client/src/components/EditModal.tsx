import { IconX } from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";

type EditModalProps = {
    children: React.ReactNode;
    onClose: () => void;
    Icon: React.ElementType;
    title: string;
};

export const EditModal = ({ children, onClose, Icon, title }: EditModalProps) => {
    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.1 }}
                className="fixed top-0 left-0 z-50 flex h-full w-full justify-center bg-black/50 px-3 py-10 backdrop-blur-xl"
            >
                <motion.div
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0.95 }}
                    transition={{ duration: 0.1 }}
                    className="h-fit w-full max-w-xl space-y-5 rounded-xl bg-white"
                >
                    <div className="text-title flex items-center justify-between border-b border-zinc-200 px-5 py-5">
                        <div className="flex items-center gap-3">
                            <div className="rounded-full bg-zinc-100 p-2 ring-1 ring-zinc-300">
                                <Icon className="size-6" />
                            </div>
                            <h2 className="font-title text-lg font-semibold">{title}</h2>
                        </div>

                        <IconX className="size-5 cursor-pointer text-zinc-500" onClick={onClose} />
                    </div>
                    {children}
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};
