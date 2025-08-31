import { useToast } from "@/contexts/ToastContext";
import { copyToClipboard } from "@/utils/copyClipboard";
import { IconAlertTriangle, IconLink, IconTrash } from "@tabler/icons-react";
import { useState } from "react";
import { SpinnerCircular } from "spinners-react";
import { DropdownTemplate, DropdownTemplateProps } from "../templates/DropdownTemplate";

type PostDropProps = DropdownTemplateProps & {
    isOwner: boolean;
    onDeletePost: () => void;
};

export const PostDrop = ({
    isOpen,
    orientation,
    onClose,
    isOwner,
    onDeletePost,
}: PostDropProps) => {
    const [isDeleting, setIsDeleting] = useState(false);
    const { successToast } = useToast();

    return (
        <>
            <DropdownTemplate isOpen={isOpen} onClose={onClose} orientation={orientation}>
                <nav className="divide-y-1 divide-zinc-100 dark:divide-zinc-700" onClick={onClose}>
                    <ul className="flex w-46 flex-col py-1 text-sm">
                        <li>
                            <a
                                onClick={() =>
                                    copyToClipboard(
                                        `${window.location.protocol}//${window.location.hostname}/post/P_DijdTdthJmoqVHImPn`,
                                        "Link copiado",
                                        successToast,
                                    )
                                }
                                className="flex w-full items-center gap-2 rounded-lg p-3 px-4 font-medium hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 hover:dark:text-white"
                            >
                                <IconLink className="size-4.5" /> Copiar Link
                            </a>
                        </li>
                        <li>
                            <a
                                href="/profile"
                                className="flex w-full items-center gap-2 rounded-lg p-3 px-4 font-medium hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 hover:dark:text-white"
                            >
                                <IconAlertTriangle className="size-4.5" /> Denunciar Post
                            </a>
                        </li>
                    </ul>
                    {isOwner && (
                        <ul className="flex w-46 flex-col py-1 text-sm">
                            <li>
                                <a
                                    className="flex w-full items-center gap-2 rounded-lg p-3 px-4 font-medium text-red-500 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                                    onClick={() => {
                                        onDeletePost();
                                        setIsDeleting(true);
                                    }}
                                >
                                    <IconTrash className="size-4.5" /> Deletar Post
                                    {isDeleting && (
                                        <SpinnerCircular
                                            size={10}
                                            thickness={180}
                                            speed={100}
                                            color="#FF0000"
                                            secondaryColor="rgba(0, 0, 0, 0)"
                                            className="ml-auto"
                                        />
                                    )}
                                </a>
                            </li>
                        </ul>
                    )}
                </nav>
            </DropdownTemplate>
        </>
    );
};
