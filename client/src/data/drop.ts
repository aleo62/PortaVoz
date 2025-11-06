import { DropdownItemProps } from "@/components/ui/Dropdown";
import {
    IconAlertTriangle,
    IconLink,
    IconLogout,
    IconPencil,
    IconPencilCog,
    IconTrash,
    IconUser,
} from "@tabler/icons-react";

export const UserDropItems: DropdownItemProps[] = [
    { label: "Acessar Perfil", Icon: IconUser, path: "Profile" },
    { label: "Editar Perfil", Icon: IconPencil, path: "EditProfile" },
];

export const UserDropAuthItems: DropdownItemProps[] = [
    { label: "Sair", Icon: IconLogout, path: "Logout", alert: true },
];

export const PostDropItems: DropdownItemProps[] = [
    { label: "Copiar Link", Icon: IconLink },
    { label: "Denunciar Post", Icon: IconAlertTriangle, path: "Profile" },
];

export const PostDropOwnerItems: DropdownItemProps[] = [
    { label: "Deletar Post", Icon: IconTrash, alert: true },
];

export const CommentDropItems: DropdownItemProps[] = [
    { label: "Denunciar", Icon: IconAlertTriangle, path: "Profile" },
];

export const CommentDropOwnerItems: DropdownItemProps[] = [
    { label: "Editar", Icon: IconPencilCog, path: "Profile" },
    { label: "Deletar", Icon: IconTrash, alert: true },
];
