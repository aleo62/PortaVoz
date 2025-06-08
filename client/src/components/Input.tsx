import { InputProps } from "@/utils/types/inputType";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import { useState } from "react";

export const Input = ({ Icon, phone, type, ...rest }: InputProps) => {
    const [newType, setNewType] = useState(type);

    const IconEyePassword = newType === "password" ? IconEye : IconEyeOff;

    if (type === "password") {
        return (
            <div className="focus-within:ring-accent focus-within:text-accent flex w-full items-center rounded-lg border-none bg-white px-3 py-[.85rem] text-[15px] font-medium text-zinc-700 ring-1 ring-zinc-300 transition-[box-shadow,color] duration-300 focus-within:ring-2">
                <input
                    type={newType}
                    className="flex-1 placeholder-zinc-400 focus:outline-none"
                    {...rest}
                />
                <button
                    type="button"
                    onClick={() =>
                        setNewType((prev) => (prev === "password" ? "text" : "password"))
                    }
                >
                    <IconEyePassword className="h-5 w-5" />
                </button>
            </div>
        );
    } else if (phone) {
        return (
            <div className="focus-within:ring-accent focus-within:text-accent flex w-full items-center rounded-lg border-none bg-white px-3 py-[.85rem] text-[15px] font-medium text-zinc-700 ring-1 ring-zinc-300 transition-[box-shadow,color] duration-300 focus-within:ring-2">
                <input
                    type={newType}
                    className="flex-1 placeholder-zinc-400 focus:outline-none"
                    {...rest}
                />
                <button
                    type="button"
                    onClick={() =>
                        setNewType((prev) => (prev === "password" ? "text" : "password"))
                    }
                >
                    <IconEyePassword className="h-5 w-5" />
                </button>
            </div>
        );
    } else {
        return (
            <input
                className="focus:ring-accent focus:text-accent transition-[box-shadow, color] w-full rounded-lg border-none bg-white px-3 py-[.85rem] text-[15px] font-medium text-zinc-700 placeholder-zinc-400 ring-1 ring-zinc-300 duration-300 focus:ring-2 focus:outline-none"
                {...rest}
            />
        );
    }
};
