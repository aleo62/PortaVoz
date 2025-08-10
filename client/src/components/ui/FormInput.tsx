import { InputProps } from "@/utils/types/inputType";
import { Input } from "./Input";
import { Textarea } from "./Textarea";

type FormInputProps = {
    label: string;
    className?: string;
    inputProps?: InputProps;
    textAreaProps?: React.TextareaHTMLAttributes<HTMLTextAreaElement>;
    labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
    textArea?: boolean;
};

export const FormInput = ({
    className,
    label,
    inputProps,
    labelProps,
    textArea,
    textAreaProps,
}: FormInputProps) => {
    return (
        <div className={className}>
            <label {...labelProps} className="label">
                {label}
            </label>
            {textArea ? <Textarea {...textAreaProps} /> : <Input {...inputProps} />}
        </div>
    );
};
