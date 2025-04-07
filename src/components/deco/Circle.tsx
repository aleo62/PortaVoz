type CircleProps = {
    className?: string;
}

export const Circle = ({ className }: CircleProps) => {
    return <div className={`from-secondary to-body-background absolute z-[-10] h-35 w-35 rounded-full bg-gradient-to-b via-[#DFECFF] via-40% xl:h-60 xl:w-60 ${className}`}></div>;
};
