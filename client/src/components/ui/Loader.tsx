import { motion } from "framer-motion";
import { SpinnerCircularSplit } from "spinners-react";

export const Loader = ({ isLoading }: { isLoading: boolean }) => {
    return (
        isLoading && (
            <motion.div
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed top-0 left-0 z-200 flex h-full w-full items-center justify-center bg-white/50 backdrop-blur-3xl dark:bg-zinc-950/50"
            >
                <SpinnerCircularSplit size={80} thickness={120} color="#3d69d8" secondaryColor="rgba(0, 0, 0, 0)" />
            </motion.div>
        )
    );
};
