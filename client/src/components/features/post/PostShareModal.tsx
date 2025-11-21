import { useModal } from "@/contexts/ModalContext";
import { IconX } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { ReactElement } from "react";

type PostShareModalProps = {
    shareItems: ShareItems[];
    postLink: string;
};

export type ShareItems = {
    bgColor: string;
    Icon: ReactElement;
    onClick: () => void;
}

export const PostShareModal = ({ shareItems, postLink }: PostShareModalProps) => {
    const { closeModal } = useModal();

    return (
        <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.95 }}
            transition={{ duration: 0.1 }}
            className="my-auto h-fit w-full max-w-lg space-y-5 rounded-xl bg-white dark:bg-zinc-900 p-3"
        >
            <IconX
                className="size-5 cursor-pointer text-zinc-500 dark:text-white"
                onClick={closeModal}
            />

            {shareItems.map(item => <div className={`${item.bgColor} p-5 rounded-3xl text-white w-fit`}> {item.Icon} </div>)}

            <div className="bg-body-background text-title rounded-lg p-2 h-fit flex items-center gap-2">
                <p className="bg-zinc-200 dark:bg-zinc-800 p-1 px-3 rounded-lg">Copiar Link</p> <span className="text-subtitle flex-1 truncate">{ postLink }</span>
            </div>
        </motion.div>
    );
};
