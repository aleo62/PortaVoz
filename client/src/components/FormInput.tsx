import { InputProps } from "@/utils/types/inputType";
import { Input } from "./Input";

type FormInputProps = {
  label: string;
  className?: string;
  inputProps?: InputProps;
  labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
};

export const FormInput = ({
    className,
    label,
    inputProps,
    labelProps
}: FormInputProps) => {
    return (
        <div className={className}>
            <label {...labelProps} className="label">
                {label}
            </label>
            <Input {...inputProps} />
        </div>
    );
};
