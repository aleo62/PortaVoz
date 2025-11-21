import { AnimationProps } from "@/types/animationDataType";
import { motion } from "framer-motion";

export const AnimatedCaption = ({ children, className }: AnimationProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className={className}
        >
            {children}
        </motion.div>
    );
};
