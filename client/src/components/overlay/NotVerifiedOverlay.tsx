import { motion } from "framer-motion";
import { OverlayTemplate } from "../templates/OverlayTemplate";

export const NotVerifiedOverlay = ({
    isOpen,
    onClose,
}: {
    isOpen: boolean;
    onClose: () => void;
}) => {
    return (
        <div>
            <OverlayTemplate isOpen={isOpen} onClose={onClose}>
                <motion.div
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0.95 }}
                    transition={{ duration: 0.1 }}
                    className="bg-body-background h-fit w-full max-w-[97%] space-y-5 rounded-xl p-5 px-3 lg:max-w-xl"
                >
                    <div>Não verificado</div>
                </motion.div>
            </OverlayTemplate>
        </div>
    );
};
