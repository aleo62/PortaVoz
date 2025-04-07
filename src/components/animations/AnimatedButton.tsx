import React from 'react';
import { motion } from 'framer-motion';

type ButtonProps = {
    children: React.ReactNode;
    delay?: number;
    className?: string;
};

export const AnimatedButton = ({ children, delay, className }: ButtonProps) => {
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
