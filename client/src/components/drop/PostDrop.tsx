import { IconAlertTriangle, IconLink, IconPencilCog, IconTrash } from "@tabler/icons-react";
import { useState } from "react";
import { ClipLoader as DeleteLoader } from "react-spinners";
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

    return (
        <>
            <DropdownTemplate
                isOpen={isOpen}
                onClose={onClose}
                orientation={orientation}
            >
                <nav className="divide-y-1 divide-zinc-100 dark:divide-zinc-700" onClick={onClose}>
                    <ul className="flex w-46 flex-col py-1 text-sm">
                        <li>
                            <a
                                className="flex w-full items-center gap-2 rounded-lg p-3 px-4 hover:bg-zinc-100 hover:text-zinc-800 dark:hover:bg-zinc-800 hover:dark:text-white"
                            >
                                <IconLink className="size-4.5" /> Copiar Link
                            </a>
                        </li>
                        <li>
                            <a
                                href="/profile"
                                className="flex w-full items-center gap-2 rounded-lg p-3 px-4 hover:bg-zinc-100 hover:text-zinc-800 dark:hover:bg-zinc-800 hover:dark:text-white"
                            >
                                <IconAlertTriangle className="size-4.5" /> Denunciar Post
                            </a>
                        </li>
                    </ul>
                    {isOwner && (
                        <ul className="flex w-46 flex-col py-1 text-sm">
                            <li>
                                <a
                                    href="/profile"
                                    className="flex w-full items-center gap-2 rounded-lg p-3 px-4 hover:bg-zinc-100 hover:text-zinc-800 dark:hover:bg-zinc-800 hover:dark:text-white"
                                >
                                    <IconPencilCog className="size-4.5" />
                                    Editar Post
                                </a>
                            </li>
                            <li>
                                <a
                                    className="flex w-full items-center gap-2 rounded-lg p-3 px-4 text-red-500 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                                    onClick={() => {
                                        onDeletePost();
                                        setIsDeleting(true);
                                    }}
                                >
                                    <IconTrash className="size-4.5" /> Deletar Post{" "}
                                    <DeleteLoader
                                        className={`ml-auto ${isDeleting ? "opacity-100" : "opacity-0"}`}
                                        color="#ed1307"
                                        size={18}
                                    />
                                </a>
                            </li>
                        </ul>
                    )}
                </nav>
            </DropdownTemplate>
        </>
    );
};
