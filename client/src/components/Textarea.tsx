type textareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> ;

export const Textarea = ({ className, ...rest }: textareaProps) => {
    return (
        <>
            <textarea
                name=""
                className={`focus:ring-accent disabled:bg-zinc-100 focus:text-accent transition-[box-shadow, color] w-full rounded-lg border-none bg-white px-3 py-[.85rem] text-[15px] font-medium text-zinc-700 placeholder-zinc-400 ring-1 ring-zinc-300 duration-300 focus:ring-2 focus:outline-none ${className}`}
                id=""
                {...rest}
            ></textarea>
        </>
    );
};
