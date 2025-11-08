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
        <motion.div
            className="text-title flex items-center justify-center gap-2 rounded-3xl bg-gradient-to-br from-zinc-300/10 to-zinc-300/50 px-3 py-2 font-medium inset-ring-2 inset-ring-zinc-300/20 backdrop-blur-3xl"
            variants={item}
        >
            <Icon />
            <p>{body}</p>
        </motion.div>
    );
};
