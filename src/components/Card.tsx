import React from "react";
import { IconArrowRight } from "@tabler/icons-react";

type CardProps = {
    title: string;
    desc: string;
    Icon: React.ElementType;
    className: string;
};

export const Card = ({ title, desc, Icon, className }: CardProps) => {
    return (
        <div
            className={`group p-[25px] relative self-center max-w-70 flex flex-col justify-center gap-2 h-[210px] lg:w-full lg:h-full bg-white shadow-[0px_0px_100px_-27px_rgba(0,_0,_0,_0.1)] rounded-[7px] ${className} transition duration-300 cursor-pointer hover:bg-accent`}
        >
            <div className="w-fit h-fit">
                {Icon && (
                    <Icon className="size-[35px] mb-2 stroke-[2.1] text-primary group-hover:text-white group-hover:h-0 transition-all duration-200" />
                )}
            </div>

            <h3 className="font-semibold text-[1.2rem] text-title h-fit group-hover:text-white group-hover:translate-y-[-15px] transition-all duration-300">
                {title}
            </h3>

            <p className="max-w-[226px] text-[13px] h-fit text-subtitle group-hover:text-white group-hover:translate-y-[-15px] transition-all duration-300">
                {desc}
            </p>
            
            <IconArrowRight className="size-[35px] stroke-1.5 absolute text-white bottom-4 right-4 opacity-0 transition-all duration-500 group-hover:opacity-100 "/>
        </div>
    );
};
