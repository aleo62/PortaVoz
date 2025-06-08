import { motion } from "framer-motion";
import { IconArrowRight } from "@tabler/icons-react";

type CardProps = {
    title: string;
    desc: string;
    Icon: React.ElementType;
    className: string;
};

export const Card = ({ title, desc, Icon, className }: CardProps) => {
    const item = {
        hidden: { opacity: 0, x: 50 },
        show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
    };

    return (
        <motion.div
            className={`card group relative flex min-h-[210px] max-w-70 flex-col justify-center gap-2 self-center rounded-[7px] bg-white p-[25px] shadow-[0px_0px_100px_-27px_rgba(0,_0,_0,_0.1)] lg:h-full lg:w-full ${className} hover:bg-accent cursor-pointer transition duration-300`}
            variants={item}
        >
            <div className="h-fit w-fit">
                {Icon && (
                    <Icon className="text-primary mb-2 size-[35px] stroke-[2] transition-all duration-200 group-hover:h-0 group-hover:text-white" />
                )}
            </div>

            <h3 className="text-title h-fit text-[1.2rem] font-semibold transition-all duration-300 group-hover:translate-y-[-15px] group-hover:text-white">
                {title}
            </h3>

            <p className="text-subtitle h-fit max-w-[226px] text-[13px] transition-all duration-300 group-hover:translate-y-[-15px] group-hover:text-white">
                {desc}
            </p>

            <IconArrowRight className="stroke-1.5 absolute right-4 bottom-4 size-[35px] text-white opacity-0 transition-all duration-300 group-hover:opacity-100" />
        </motion.div>
    );
};
