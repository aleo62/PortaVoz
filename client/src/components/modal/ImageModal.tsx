import { motion } from "framer-motion";

import { ModalDefaultProps } from "@/contexts/ModalContext";
import { ModalProvider } from "@/contexts/ModalProvider";

export const ImageModal = ({ image, zIndex }: { image: string } & ModalDefaultProps) => {
    return (
        <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.95 }}
            transition={{ duration: 0.1 }}
            className="my-auto h-fit"
            style={{ zIndex }}
        >
            <ModalProvider.Close />
            <img
                className={`w-xl transition-all duration-300 ease-in-out`}
                src={image as string}
                alt="Representação da Cena"
            />
        </motion.div>
    );
};
