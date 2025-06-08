import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    text?: string;
    Icon?: React.ElementType;
    path?: string;
    small?: boolean;
};

export const ButtonPrimary = ({
    text,
    small,
    path,
    className,
    Icon,
    ...rest
}: ButtonProps) => {
    return (
        <a href={path}>
            <button
                className={`button btn-primary ${small ? "small" : ""} ${className}`}
                {...rest}
            >
                <div className="inline-flex items-center justify-center gap-2 whitespace-nowrap">
                    <p>{text}</p>
                    {Icon && <Icon className="size-6 stroke-[2.2]" />}
                </div>
            </button>
        </a>
    );
};

export const ButtonSecondary = ({
    text,
    small,
    path,
    className,
    Icon,
    ...rest
}: ButtonProps) => {
    return (
        <a href={path}>
            <button
                className={`button btn-secondary ${small && "small"} ${className}`}
                {...rest}
            >
                <div className="flex items-center justify-center gap-2">
                    <p className="w-20">{text}</p>
                    {Icon && <Icon className="size-5.5 stroke-[2.5]" />}
                </div>
            </button>
        </a>
    );
};

export const ButtonOutlined = ({
    text,
    small,
    path,
    className,
    Icon,
    ...rest
}: ButtonProps) => {
    return (
        <a href={path}>
            <button
                className={`button btn-outlined ${small && "small"} ${className}`}
                {...rest}
            >
                <div className="flex items-center justify-center gap-2">
                    <p className="w-20">{text}</p>
                    {Icon && <Icon className="size-5.5 stroke-[2.5]" />}
                </div>
            </button>
        </a>
    );
};
