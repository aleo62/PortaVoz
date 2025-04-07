import React from 'react';

type ButtonProps = {
    children: React.ReactNode;
    small?: boolean;
    path?: string;
    onClick?: () => void;
};

export const ButtonPrimary = ({ children, onClick, small, path }: ButtonProps) => {
    return (
        <a href={path}>
            <button
                className={'button btn-primary ' + (small ? ' small' : '')}
                onClick={() => onClick?.()}
            >
                {children}
            </button>
        </a>
    );
};

export const ButtonSecondary = ({ children, onClick, small, path }: ButtonProps) => {
    return (
        <a href={path}>
            <button
                className={'button btn-secondary' + (small ? ' small' : '')}
                onClick={() => onClick?.()}
            >
                {children}
            </button>
        </a>
    );
};
