import { ModalDefaultProps } from "@/contexts/ModalContext";
import { IconX } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { ReactElement } from "react";

type PostShareModalProps = ModalDefaultProps & {
    shareItems: ShareItems[];
    postLink: string;
};

export type ShareItems = {
    bgColor: string;
    Icon: ReactElement;
    onClick: () => void;
};

export const PostShareModal = ({
    shareItems,
    postLink,
    zIndex,
    closeModal,
}: PostShareModalProps) => {
    return (
        <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.95 }}
            transition={{ duration: 0.1 }}
            className="my-auto h-fit w-full max-w-lg space-y-5 rounded-xl bg-white p-3 dark:bg-zinc-900"
            style={{ zIndex }}
        >
            <IconX
                className="size-5 cursor-pointer text-zinc-500 dark:text-white"
                onClick={closeModal}
            />

            {shareItems.map((item) => (
                <div className={`${item.bgColor} w-fit rounded-3xl p-5 text-white`}>
                    {" "}
                    {item.Icon}{" "}
                </div>
            ))}

            <div className="bg-body-background text-title flex h-fit items-center gap-2 rounded-lg p-2">
                <p className="rounded-lg bg-zinc-200 p-1 px-3 dark:bg-zinc-800">Copiar Link</p>{" "}
                <span className="text-subtitle flex-1 truncate">{postLink}</span>
            </div>
        </motion.div>
    );
};
