import React from "react";

type SettingsBlockProps = {
    title: string;
    description?: string;
    children?: React.ReactNode;
    className?: string;
    titleClassName?: string;
};

export const SettingsBlock = ({
    title,
    description,
    children,
    className = "ring-zinc-200 dark:ring-zinc-800",
    titleClassName = "text-title",
}: SettingsBlockProps) => {
    return (
        <div className={`rounded-xl p-5 ring-1 ${className}`}>
            <div className="space-y-1">
                <h3 className={`text-lg font-medium ${titleClassName}`}>{title}</h3>
                {description && <p className="text-subtitle text-sm">{description}</p>}
            </div>
            {children}
        </div>
    );
};
