type CircleProps = {
    className?: string;
};

export const Circle = ({ className }: CircleProps) => {
    return (
        <div
            className={`from-secondary to-body-background absolute z-[-10] h-25 w-25 rounded-full bg-gradient-to-b via-[#DFECFF] via-40% xl:h-45 xl:w-45 ${className}`}
        ></div>
    );
};
