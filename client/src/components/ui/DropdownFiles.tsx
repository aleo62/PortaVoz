import { useToast } from "@/contexts/ToastContext";
import { IconFileUpload } from "@tabler/icons-react";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

export const DropdownFiles = ({ onUpload }: { onUpload: (file: File) => void }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [error, setError] = useState(false);
    const { errorToast } = useToast();

    const onDrop = useCallback((acceptedFiles: File[]) => {
        setIsDragging(false);

        const allowed = ["image/png", "image/jpeg", "image/jpg"];
        const file = acceptedFiles[0];

        if (!file) return;

        if (!allowed.includes(file.type)) {
            setError(true);
            errorToast("Formato de arquivo inválido: " + file.type)
            setTimeout(() => setError(false), 500);
            return;
        }

        onUpload(file);
    }, [onUpload]);

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    return (
        <div
            {...getRootProps()}
            className={`
                bg-body-background flex cursor-pointer flex-col items-center rounded-2xl border-2 border-dashed p-5 py-20
                transition-all dark:bg-zinc-800
                ${error ? "border-red-500" : isDragging ? "border-accent" : "border-zinc-300 dark:border-zinc-700"}
            `}
            onDragEnter={() => setIsDragging(true)}
            onDragLeave={() => setIsDragging(false)}
        >
            <input {...getInputProps()} accept=".png,.jpg,.jpeg" />
            <IconFileUpload className="size-20 stroke-[1.5] text-title" />
            <p className="text-center text-title">Envie o arquivo</p>
            <p className="text-center text-title">Clique aqui para selecionar ou arraste o arquivo e solte</p>
        </div>
    );
};
