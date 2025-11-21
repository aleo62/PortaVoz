import { IconLoader, IconX } from "@tabler/icons-react";
import { motion } from "framer-motion";

export type PreviewImage = {
    url: string;
    name: string;
    size: number;
    isLoading: boolean;
};

export const File = ({
    image,
    onDeleteFile,
}: {
    image: PreviewImage;
    onDeleteFile: () => void;
}) => {
    const size =
        Math.round(image.size / 1024) > 1024
            ? `${Math.round(image.size / 1024 / 1024)} MB`
            : `${Math.round(image.size / 1024)} KB`;

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="relative flex w-full items-center gap-3 rounded-xl p-3 ring-1 ring-zinc-200 dark:ring-zinc-800"
        >
            <img src={image.url} alt="" className="h-20 w-20 rounded-md object-cover" />
            <div>
                <h3 className="text-title w-[70%] truncate text-lg">{image.name}</h3>
                <p className="text-subtitle text-sm">{size}</p>
            </div>
            <button
                type="button"
                onClick={onDeleteFile}
                className="absolute top-2 right-2 rounded-full p-1 text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800"
            >
                <IconX className="size-3" />
            </button>
            {image.isLoading && (
                <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-white/75 backdrop-blur-sm dark:bg-zinc-950/60">
                    <IconLoader className="text-primary size-6 animate-spin" />
                </div>
            )}
        </motion.div>
    );
};
