type InputProps = {
    type: string;
    placeholder: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Input = ({ type, placeholder, onChange }: InputProps) => {
    return (
        <input
            type={type}
            className="mt-1 w-full rounded-lg border-none bg-gray-200/60 px-3 py-3 focus:outline-none"
            placeholder={placeholder}
            onChange={onChange}
        />
    );
};
