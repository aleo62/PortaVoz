import { InputHTMLAttributes } from "react";

export const CodeInput = ({ ...rest }: InputHTMLAttributes<HTMLInputElement>) => {
    return (
        <input
            type="text"
            className="text-title focus:ring-accent w-full rounded-lg bg-zinc-100 py-4 text-center text-xl ring-[.7px] ring-zinc-300 outline-0 focus:ring-2 md:text-3xl dark:bg-zinc-800"
            {...rest}
        />
    );
};
