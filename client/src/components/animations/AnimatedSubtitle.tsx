import { AnimationProps } from "@/utils/types/animationDataType";
import { motion } from "framer-motion";

export const AnimatedSubtitle = ({ children, className, delay }: AnimationProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: delay ? delay : 0.5 }}
            viewport={{ once: true }}
            className={className}
        >
            {children}
        </motion.div>
    );
};
