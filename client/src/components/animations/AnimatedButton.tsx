import { motion } from "framer-motion";
import { AnimationProps } from "@/utils/types/animationType";

export const AnimatedButton = ({ children, delay, className }: AnimationProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: delay ? delay : 0.4 }}
            viewport={{ once: true }}
            className={className}
        >
            {children}
        </motion.div>
    );
};
