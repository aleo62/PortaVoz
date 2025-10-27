import { InputProps } from "@/utils/types/inputDataType";
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
            <label {...labelProps} className="text-[13px] font-medium text-zinc-500 mb-1">
                {label}
            </label>
            {textArea ? <Textarea {...textAreaProps} /> : <Input {...inputProps} />}
        </div>
    );
};
