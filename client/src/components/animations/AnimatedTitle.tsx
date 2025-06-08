import { motion } from "framer-motion";
import { AnimationProps } from "@utils/types/animationType";

export const AnimatedTitle = ({ children, className, delay }: AnimationProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: delay ? delay : 0.2 }}
            viewport={{ once: true }}
            className={className}
        >
            {children}
        </motion.div>
    );
};
