import { motion } from "framer-motion";
import React from "react";

type TopicProps = {
    body: string;
    Icon: React.ElementType;
};

export const Topic = ({ body, Icon }: TopicProps) => {
    const item = {
        hidden: { opacity: 0, x: 50 },
        show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
    };

    return (
        <motion.div className="topic" variants={item}>
            <Icon />
            <p>{body}</p>
        </motion.div>
    );
};
