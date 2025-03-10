type InputProps = {
    type: string,
    placeholder: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input = ({ type, placeholder, onChange }: InputProps) => {
    return (
        <input
            type={type}
            className="w-full mt-1 px-3 bg-gray-200/60 py-3 border-none rounded-lg focus:outline-none"
            placeholder={placeholder}
            onChange={onChange}
        />
    );
};
