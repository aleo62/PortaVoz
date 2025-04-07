type RetProps = {
    className?: string;
};

export const Ret = ({ className }: RetProps) => {
    return (
        <div
            className={`from-secondary to-body-background absolute h-50 w-50 rounded-[3.5rem] bg-gradient-to-b via-[#DFECFF] via-40% xl:h-80 xl:w-80 ${className}`}
        ></div>
    );
};
