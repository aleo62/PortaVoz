type RadioButtonProps = {
  name: string;
  value: string;
  label: string;
  checked: boolean;
  onChange: (value: string) => void;
  size?: string; // Ex: "w-5 h-5"
  checkedColor?: string; // Ex: "bg-blue-500"
  uncheckedColor?: string; // Ex: "bg-white"
  borderColor?: string; // Ex: "border-gray-400"
  labelClassName?: string;
};

export function RadioButton({
  name,
  value,
  label,
  checked,
  onChange,

}: RadioButtonProps) {
  return (
    <label className="flex items-center gap-2 cursor-pointer select-none">
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        className="hidden"
      />
      <span
        className={`rounded-full ring-1 ${ checked ? "ring-accent" : "ring-zinc-400"} w-5 h-5 flex items-center justify-center`}
      >
        {checked && (
          <span
            className={`block w-3 h-3 bg-accent rounded-full`}
          />
        )}
      </span>
      <span>{label}</span>
    </label>
  );
}
