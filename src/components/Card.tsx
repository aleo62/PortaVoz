import React from "react";

type CardProps = {
    title: string;
    desc: string;
    Icon: React.ElementType;
    className: string;
};

export const Card = ({ title, desc, Icon, className }: CardProps) => {
    return (
        <div className={`p-[25px] grid gap-[5px] md:gap-[12px] w-full h-full bg-transparent shadow-lg shadow-primary/30 rounded-xl ${className}`}>
            <div className="bg-secondary p-1.5 w-fit h-fit rounded-[5px]">
                {Icon && <Icon className="size-[30px] stroke-[2.5] text-primary" />}
            </div>
            <h3 className="font-semibold text-xl h-fit font-">{title}</h3>
            <p className="max-w-[226px] text-[13px] h-fit text-subtitle">{desc}</p>
        </div>
    );
};
