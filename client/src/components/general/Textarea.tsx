type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = ({ className, ...rest }: TextAreaProps) => {
    return (
        <>
            <textarea
                name=""
                className={`focus:ring-accent focus:text-accent transition-[box-shadow, color] w-full rounded-lg border-none bg-white px-3 py-[.85rem] text-[15px] font-medium text-zinc-700 placeholder-zinc-400 ring-1 ring-zinc-300 duration-300 focus:ring-2 focus:outline-none disabled:bg-zinc-100 dark:bg-zinc-900 dark:text-white  dark:ring-zinc-700 dark:disabled:bg-zinc-800 ${className}`}
                id=""
                {...rest}
            ></textarea>
        </>
    );
};
