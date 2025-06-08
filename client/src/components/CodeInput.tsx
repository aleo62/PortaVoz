type CodeInputProps = {
    value: string;
    onChange: (value: string) => void;
    onBackspace: () => void;
    id: string;
};

export const CodeInput = ({ value, id, onChange, onBackspace }: CodeInputProps) => {
    return (
        <input
            type="text"
            className="text-title focus:ring-accent max-w-18 rounded-lg bg-white py-4 text-center text-3xl ring-1 ring-zinc-300 outline-0 focus:ring-2 md:py-3 md:text-5xl"
            value={value}
            onFocus={(e) => e.target.select()}
            onChange={(e) => {
                const val = e.target.value.replace(/\D/g, "");
                onChange(val);
            }}
            onKeyDown={(e) => {
                if (e.key === "Backspace" && value === "") {
                    onBackspace();
                }
            }}
            id={id}
            autoComplete="off"
        />
    );
};
