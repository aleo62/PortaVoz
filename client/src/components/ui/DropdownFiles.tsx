import { IconFileUpload } from "@tabler/icons-react";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

export const DropdownFiles = ({ onUpload }: { onUpload: (file: File) => void }) => {
    const [isDragging, setIsDragging] = useState(false);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        setIsDragging(false);
        acceptedFiles.forEach((file: File) => {
            onUpload(file);
        });
    }, []);
    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    return (
        <div
            className={`${isDragging ? "border-accent" : "border-zinc-300 dark:border-zinc-700"} bg-body-background flex cursor-pointer flex-col items-center rounded-2xl border-2 border-dashed p-5 py-20 text-zinc-600 transition-all dark:bg-zinc-800 dark:text-zinc-400`}
            {...getRootProps()}
            onDragEnter={() => setIsDragging(true)}
            onDragLeave={() => setIsDragging(false)}
        >
            <input {...getInputProps()} accept=".png" />
            <IconFileUpload className="size-20 stroke-[1.5]" />
            <p className="text-center">Envie a imagem</p>
            <p className="text-center">Clique aqui para selecionar ou arraste o arquivo</p>
        </div>
    );
};
