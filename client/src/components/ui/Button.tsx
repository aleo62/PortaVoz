import { useNavigate } from "react-router-dom";
import { SpinnerCircular } from "spinners-react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    text?: string;
    Icon?: React.ElementType;
    path?: string;
    size?: "small" | "medium" | "large";
    styleType?: "primary" | "secondary" | "outlined";
    iconLeft?: boolean;
    isLoading?: boolean;
};

const baseClass =
    "button flex items-center justify-center whitespace-nowrap gap-2 rounded-xl transition-all duration-150 active:scale-95 disabled:opacity-60 overflow-hidden";

const sizeClasses = {
    small: "h-[45px] text-[14px] px-[20px]",
    medium: "lg:h-[49px] lg:text-[15px] px-[24px] text-[14px] h-[45px]",
    large: "h-[56px] text-[20px] px-[32px]",
};

const styleTypeClass = {
    primary:
        "bg-accent text-white  hover:translate-y-[-2px] ring-2 shadow-[inset_0px_0px_6px_2px_rgba(255,_255,_255,_0.1)] ring-blue-700/80",
    secondary: "bg-secondary text-accent dark:text-stone-200 hover:bg-secondary-lighter",
    outlined:
        "ring-[.8px] ring-zinc-300 shadow-sm text-zinc-600 dark:ring-zinc-600 dark:text-zinc-300 hover:bg-zinc-800/5 dark:hover:bg-zinc-200/10",
};

export const Button = ({
    text,
    size = "medium",
    path,
    className = "",
    Icon,
    styleType = "primary",
    iconLeft,
    isLoading = false,
    ...rest
}: ButtonProps) => {
    const finalClass = [baseClass, sizeClasses[size], styleTypeClass[styleType], className].join(
        " ",
    );

    const navigate = useNavigate();
    return (
        <button
            className={`${finalClass} ${iconLeft && "flex-row-reverse"}`}
            {...rest}
            disabled={isLoading || rest.disabled}
            onClick={path ? () => navigate(path) : rest.onClick}
        >
            {isLoading ? (
                <SpinnerCircular size={20} thickness={180} speed={100} />
            ) : (
                <>
                    {text}
                    {Icon && (
                        <Icon
                            className={`${size === "small" ? "size-5" : "size-6"} ${
                                styleType === "outlined" ? "stroke-[1.5]" : "stroke-[2.2]"
                            }`}
                        />
                    )}
                </>
            )}
        </button>
    );
};
