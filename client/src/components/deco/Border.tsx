type BorderProps = {
    className?: string;
};

export const Border = ({ className }: BorderProps) => {
    return (
        <div
            className={`from-secondary to-body-background absolute flex items-center justify-center rounded-full bg-gradient-to-b via-secondary-lighter via-40% ${className}`}
        >
            <div className="bg-body-background rounded-full p-10"></div>
        </div>
    );
};
