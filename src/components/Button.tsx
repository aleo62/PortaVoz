import React from "react";

type ButtonProps = {
    children: React.ReactNode;
    small?: boolean;
    onClick?: () => void;
};

export const ButtonPrimary = ({ children, onClick, small }: ButtonProps) => {
    return (
        <button
            className={
                "button btn-primary" +
                (small ? " small" : "")
            }
            onClick={() => onClick?.()}
        >
            {children}
        </button>
    );
};

export const ButtonSecondary = ({ children, onClick, small }: ButtonProps) => {
    return (
        <button
            className={
                "button btn-secondary" +
                (small ? " small" : "")
            }
            onClick={() => onClick?.()}
        >
            {children}
        </button>
    );
};
