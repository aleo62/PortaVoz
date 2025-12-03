type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = ({ className, ...rest }: TextAreaProps) => {
    return (
        <>
            <textarea
                name=""
                className={`focus:ring-accent dark:bg-zinc-80 focus:text-accent transition-[box-shadow, color] w-full resize-none rounded-lg border-none bg-zinc-100 px-4 py-4 text-[15px] font-normal text-zinc-700 placeholder-zinc-400 ring-1 ring-zinc-300 duration-300 focus:ring-2 focus:outline-none disabled:bg-zinc-100  dark:bg-zinc-800 dark:text-white dark:ring-zinc-700 dark:disabled:bg-zinc-800 ${className}`}
                id=""
                {...rest}
            ></textarea>
        </>
    );
};
