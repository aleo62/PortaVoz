type BorderProps = {
    className?: string;
};

export const Border = ({ className }: BorderProps) => {
    return (
        <div className={`from-secondary to-body-background absolute h-50 w-50 rounded-full bg-gradient-to-b via-[#DFECFF] via-40% flex items-center justify-center ${className}`}>
            <div className="rounded-full bg-white p-10"></div>
        </div>
    );
};
