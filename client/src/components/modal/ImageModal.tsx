import { motion } from "framer-motion";

import { useModal } from "@/contexts/ModalContext";
import { IconX } from "@tabler/icons-react";

export const ImageModal = ({ image }: { image: string }) => {
    const { closeModal } = useModal();

    return (
        <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.95 }}
            transition={{ duration: 0.1 }}
            className=" h-fit my-auto"
        >
            <IconX className={`text-white dark:text-zinc-900 mb-2 ml-auto`} onClick={() => closeModal()}></IconX>
            <img
                className={`w-xl transition-all duration-300 ease-in-out`}
                src={image as string}
                alt="Representação da Cena"
            />
        </motion.div>
    );
};
