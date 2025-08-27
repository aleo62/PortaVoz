import React from "react";
import { SpinnerCircular } from "spinners-react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    text?: string;
    Icon?: React.ElementType;
    path?: string;
    small?: boolean;
    styleType?: "primary" | "secondary" | "outlined";
    iconLeft?: boolean;
    isLoading?: boolean;
};

const baseClass =
    "button flex items-center justify-center gap-2 overflow-hidden rounded-[.7rem] px-[2rem] py-[.700rem] font-medium tracking-wider transition-transform duration-200 active:scale-95 disabled:opacity-90 lg:px-[1.4rem] ";

const styleTypeClass = {
    primary:
        "bg-gradient-to-r from-primary/95 to-[#005ca2]/95 text-white shadow-[0px_4px_54px_0px_rgba(0,0,0,0.2)] transition-all duration-200 hover:from-[#3d69d8] hover:to-[#005ca2] hover:translate-y-[-3px]",
    secondary: "bg-secondary text-accent dark:text-stone-200 hover:bg-secondary-lighter",
    outlined: "bg-transparent text-accent ring-1 ring-accent hover:bg-accent/10",
};

export const Button = ({
    text,
    small,
    path,
    className = "",
    Icon,
    styleType = "primary",
    iconLeft,
    isLoading = false,
    ...rest
}: ButtonProps) => {
    const finalClass = [
        baseClass,
        styleTypeClass[styleType],
        small ? "text-[0.9rem] px-3 py-1" : "text-[14px] lg:text-[15px] md:text-[14px]",
        className,
    ]
        .filter(Boolean)
        .join(" ");

    const buttonContent = (
        <button className={finalClass} {...rest} disabled={isLoading || rest.disabled}>
            {isLoading ? (
                <SpinnerCircular
                    size={20}
                    thickness={180}
                    speed={100}
                    color="#ffffff"
                    secondaryColor="rgba(0, 0, 0, 0)"
                />
            ) : (
                <div
                    className={`${iconLeft && "flex-row-reverse"} inline-flex items-center justify-center gap-2 whitespace-nowrap`}
                >
                    <p>{text}</p>
                    {Icon && (
                        <Icon
                            className={` ${small ? "size-5.5" : "size-6"} ${
                                styleType === "outlined" ? "stroke-[1.5]" : "stroke-[2.2]"
                            } `}
                        />
                    )}
                </div>
            )}
        </button>
    );

    if (path) {
        return <a href={path}>{buttonContent}</a>;
    }
    return buttonContent;
};
