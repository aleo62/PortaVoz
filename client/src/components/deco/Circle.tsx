type CircleProps = {
    className?: string;
};

export const Circle = ({ className }: CircleProps) => {
    return (
        <div
            className={`from-secondary to-body-background absolute z-[-10] rounded-full bg-gradient-to-b via-secondary-lighter via-40% ${className}`}
        ></div>
    );
};
