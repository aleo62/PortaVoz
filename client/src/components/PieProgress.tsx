export const PieProgress = ({ percentage, className }: { percentage: number, className?: string }) => {
    const radius = 60;
    const stroke = 12;
    const normalizedRadius = radius - stroke / 2;
    const circumference = 2 * Math.PI * normalizedRadius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
        <svg height={radius * 2} width={radius * 2} className={className}>
            {/* fundo cinza */}
            <circle
                stroke="#e5e7eb"
                fill="transparent"
                strokeWidth={stroke}
                r={normalizedRadius}
                cx={radius}
                cy={radius}
            />
            {/* progresso */}
            <circle
                stroke="#23c423"
                fill="transparent"
                strokeWidth={stroke}
                strokeDasharray={circumference + " " + circumference}
                strokeDashoffset={strokeDashoffset}
                r={normalizedRadius}
                cx={radius}
                cy={radius}
                className="transition-all duration-500"
            />
            {/* texto central (opcional) */}
            <text x="50%" y="50%" textAnchor="middle" dy=".3em" className="fill-zinc-700 text-md font-title">
                {percentage}%
            </text>
        </svg>
    );
};
