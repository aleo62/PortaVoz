type WidgetsProps = {
    children: React.ReactNode;
    onClick?: () => void;
};

export const Widgets = ({ children }: WidgetsProps) => {
    return (
        <div className="transition-[backgound, color] flex cursor-pointer items-center justify-center gap-2 rounded-md bg-white p-3 px-1 text-sm font-medium text-zinc-600 ring-1 ring-zinc-300 duration-200 hover:bg-gray-200/50 hover:text-zinc-700">
            {children}
        </div>
    );
};
