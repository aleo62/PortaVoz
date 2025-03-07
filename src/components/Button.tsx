import React from "react";

type ButtonProps = {
    children: React.ReactNode;
    edge?: boolean;
    onClick: () => void;
    mobile?: boolean;
};

export const Button = ({ children, edge, onClick, mobile }: ButtonProps) => {
    return (
        <button
            className={
                "button" +
                (edge ? " edge" : "") +
                (mobile ? " mobile" : "")
            }
            onClick={() => onClick()}
        >
            {children}
        </button>
    );
};
