import { DropdownItemProps } from "@components/ui/Dropdown";
import {
    IconChecks,
    IconFlag,
    IconLayoutSidebarRightExpandFilled,
    IconMarkdown,
    IconSettings,
    IconTrash,
    IconUser,
} from "@tabler/icons-react";

export const UserDropItems: DropdownItemProps[] = [
    { label: "Perfil", Icon: IconUser, action: "profile" },
    { label: "Configurações", Icon: IconSettings, action: "settings" },
];
export const UserDropAuthItems: DropdownItemProps[] = [
    { label: "Sair", Icon: IconLayoutSidebarRightExpandFilled, alert: true, action: "logout" },
];

export const PostDropItems: DropdownItemProps[] = [
    { label: "Reportar", Icon: IconFlag, action: "report" },
];
export const PostDropOwnerItems: DropdownItemProps[] = [
    { label: "Deletar", Icon: IconTrash, alert: true, action: "deletePost" },
];

export const CommentDropItems: DropdownItemProps[] = [
    { label: "Reportar", Icon: IconFlag, action: "report" },
];
export const CommentDropOwnerItems: DropdownItemProps[] = [
    { label: "Deletar", Icon: IconTrash, alert: true, action: "deletePost" },
];

export const ChatDropItems: DropdownItemProps[] = [
    { label: "Marcar como lido", Icon: IconChecks, action: "readChat" },
    { label: "Deletar", Icon: IconTrash, alert: true, action: "deleteChat" },
];
