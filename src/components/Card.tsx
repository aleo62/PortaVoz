import React from "react";

type CardProps = {
    title: string;
    desc: string;
    Icon: React.ElementType;
    className: string;
};

export const Card = ({ title, desc, Icon, className }: CardProps) => {
    return (
        <div className={`p-[25px] self-center max-w-95 grid gap-[15px] md:w-full md:h-full bg-transparent shadow-[0px_4px_20px_0px_#00000024] rounded-xl ${className}`}>
            <div className="bg-secondary/60 p-1.5 w-fit h-fit rounded-[5px]">
                {Icon && <Icon className="size-[30px] stroke-[2.1] text-primary" />}
            </div>
            <h3 className="font-semibold text-[1.2rem] text-title h-fit font-">{title}</h3>
            <p className="max-w-[226px] text-[13px] h-fit text-subtitle">{desc}</p>
        </div>
    );
};
