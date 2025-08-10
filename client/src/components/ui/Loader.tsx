import { motion } from "framer-motion";
import { DotLoader } from "react-spinners";

export const Loader = () => {
    return (
        <motion.div
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed top-0 left-0 z-100 flex h-full w-full items-center justify-center bg-white/50 backdrop-blur-3xl dark:bg-zinc-950/50"
        >
            <DotLoader color="#3d69d8" />
        </motion.div>
    );
};
