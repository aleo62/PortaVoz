import { motion } from "framer-motion";

import { ModalDefaultProps } from "@/contexts/ModalContext";
import { IconX } from "@tabler/icons-react";

export const ImageModal = ({
    image,
    zIndex,
    closeModal,
}: { image: string } & ModalDefaultProps) => {
    return (
        <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.95 }}
            transition={{ duration: 0.1 }}
            className="my-auto h-fit"
            style={{ zIndex }}
        >
            <IconX
                className={`mb-2 ml-auto text-white dark:text-zinc-900`}
                onClick={() => closeModal()}
            ></IconX>
            <img
                className={`w-xl transition-all duration-300 ease-in-out`}
                src={image as string}
                alt="Representação da Cena"
            />
        </motion.div>
    );
};
