type RetProps = {
    className?: string;
};

export const Ret = ({ className }: RetProps) => {
    return (
        <div
            className={`from-secondary to-body-background absolute rounded-[3.5rem] bg-gradient-to-b via-[#DFECFF] via-40% ${className}`}
        ></div>
    );
};
