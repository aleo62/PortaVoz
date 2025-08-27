import { IconAlertTriangle, IconPencilCog, IconTrash } from "@tabler/icons-react";
import { useState } from "react";
import { DropdownTemplate, DropdownTemplateProps } from "../templates/DropdownTemplate";

type CommentDropProps = DropdownTemplateProps & {
    isOwner: boolean;
    onDeleteComment: () => void;
};

export const CommentDrop = ({
    isOpen,
    orientation,
    onClose,
    isOwner,
    onDeleteComment,
}: CommentDropProps) => {
    const [isDeleting, setIsDeleting] = useState(false);

    return (
        <>
            <DropdownTemplate 
                isOpen={isOpen}
                orientation={orientation}
                onClose={onClose}
            >
                <nav className="divide-y-1 divide-zinc-100 dark:divide-zinc-700">
                    <ul className="flex w-46 flex-col py-1 text-sm">
                        <li>
                            <a
                                href="/profile"
                                className="flex w-full items-center gap-2 rounded-lg p-3 px-4 hover:bg-zinc-100 hover:text-zinc-800 dark:hover:bg-zinc-800 hover:dark:text-white"
                            >
                                <IconAlertTriangle className="size-4.5" /> Denunciar
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
                                    Editar
                                </a>
                            </li>
                            <li>
                                <a
                                    className="flex w-full items-center gap-2 rounded-lg p-3 px-4 text-red-500 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                                    onClick={() => {
                                        onDeleteComment();
                                        setIsDeleting(true);
                                    }}
                                >
                                    <IconTrash className="size-4.5" /> Deletar
                                    
                                </a>
                            </li>
                        </ul>
                    )}
                </nav>
            </DropdownTemplate>
        </>
    );
};
