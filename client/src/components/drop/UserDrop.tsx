import { IconLogout, IconPencil, IconUser } from "@tabler/icons-react";
import { DropdownTemplate, DropdownTemplateProps } from "../templates/DropdownTemplate";

export const UserDrop = ({ isOpen, orientation, onClose }: DropdownTemplateProps) => {
    return (
        <DropdownTemplate isOpen={isOpen} orientation={orientation} onClose={onClose}>
            <nav className="divide-y-1 divide-zinc-100 dark:divide-zinc-700">
                <ul className="flex w-42 flex-col py-1 text-sm">
                    <li>
                        <a
                            href="/profile"
                            className="flex w-full items-center gap-2 rounded-lg p-3 px-4 hover:bg-zinc-100 hover:text-zinc-800 dark:hover:bg-zinc-800 hover:dark:text-white"
                        >
                            <IconUser className="size-4.5" /> Acessar Perfil
                        </a>
                    </li>
                    <li>
                        <a
                            href="/editprofile"
                            className="flex w-full items-center gap-2 rounded-lg p-3 px-4 hover:bg-zinc-100 hover:text-zinc-800 dark:hover:bg-zinc-800 hover:dark:text-white"
                        >
                            <IconPencil className="size-4.5" /> Editar Perfil
                        </a>
                    </li>
                </ul>
                <ul className="flex w-42 flex-col py-1 text-sm">
                    <li>
                        <a
                            href="/logout"
                            className="flex w-full items-center gap-2 rounded-lg p-3 px-4 text-red-700 hover:bg-zinc-100 hover:text-red-500 dark:hover:bg-zinc-800"
                        >
                            <IconLogout className="size-4.5" />
                            Sair
                        </a>
                    </li>
                </ul>
            </nav>
        </DropdownTemplate>
    );
};
