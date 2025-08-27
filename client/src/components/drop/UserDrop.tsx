import { IconLogout, IconPencil, IconUser } from "@tabler/icons-react";
import { DropdownTemplate, DropdownTemplateProps } from "../templates/DropdownTemplate";
import { useNavigate } from "react-router-dom";

export const UserDrop = ({ isOpen, orientation, onClose }: DropdownTemplateProps) => {
    const navigate = useNavigate();

    return (
        <DropdownTemplate isOpen={isOpen} orientation={orientation} onClose={onClose}>
            <nav className="divide-y-1 divide-zinc-100 dark:divide-zinc-700">
                <ul className="flex w-42 flex-col py-1 text-sm ">
                    <li>
                        <a
                            onClick={() => navigate("/profile")}
                            className="flex w-full items-center gap-2 rounded-lg cursor-pointer p-3 px-3 hover:bg-zinc-100 hover:text-zinc-800 dark:hover:bg-zinc-800 hover:dark:text-white"
                        >
                            <IconUser className="size-4.5" /> Acessar Perfil
                        </a>
                    </li>
                    <li>
                        <a
                            onClick={() => navigate("/editprofile")}
                            className="flex w-full items-center gap-2 rounded-lg cursor-pointer p-3 px-3 hover:bg-zinc-100 hover:text-zinc-800 dark:hover:bg-zinc-800 hover:dark:text-white"
                        >
                            <IconPencil className="size-4.5" /> Editar Perfil
                        </a>
                    </li>
                </ul>
                <ul className="flex w-42 flex-col py-1 text-sm">
                    <li>
                        <a
                            onClick={() => navigate("/auth/logout")}
                            className="flex w-full items-center gap-2 cursor-pointer rounded-lg p-3 px-3 text-red-700 hover:bg-red-200/50 hover:text-red-500 hover:dark:bg-red-600/30"
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
