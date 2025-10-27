import { InputProps } from "@/utils/types/inputDataType";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import clsx from "clsx";
import { useState } from "react";

export const Input = ({ Icon, phone, type, className, ...rest }: InputProps) => {
    const [newType, setNewType] = useState(type);
    const isPassword = type === "password";

    const baseClassName = clsx(
        "flex w-full items-center rounded-xl text-[15px] font-normal",
        "transition-[box-shadow,color] duration-300 focus-within:ring-2  focus-within:ring-accent/50 focus-within:outline-none",
        "bg-zinc-100 text-zinc-900 ring-[.7px] ring-zinc-300 placeholder-zinc-500 focus:outline-non",
        "dark:bg-zinc-800 dark:text-white dark:ring-zinc-700",
        className,
    );

    if (isPassword) {
        const IconEyePassword = newType === "password" ? IconEye : IconEyeOff;

        return (
            <div className={baseClassName + " pr-3"}>
                {Icon && <Icon className="mr-2 h-5 w-5 text-zinc-400" />}
                <input
                    type={newType}
                    className="flex-1 bg-transparent pl-3 py-4 placeholder-zinc-400 focus:outline-none"
                    {...rest}
                />
                <button
                    type="button"
                    onClick={() =>
                        setNewType((prev) => (prev === "password" ? "text" : "password"))
                    }
                >
                    <IconEyePassword className="h-5 w-5 text-zinc-400" />
                </button>
            </div>
        );
    }

    return (
        <div className={baseClassName}>
            {Icon && <Icon className="mr-2 h-5 w-5 text-zinc-400" />}
            <input
                type={type}
                className="flex-1 bg-transparent py-4 px-3 placeholder-zinc-400 focus:outline-none"
                {...rest}
            />
        </div>
    );
};
