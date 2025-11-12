import { RoutesPath } from "@/app/Routes";
import { IconArrowLeft } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

export const LinkBack = ({ href }: { href: string }) => {
    const navigate = useNavigate();
    return (
        <a
            className="text-title flex cursor-pointer items-center gap-2 text-sm p-1.5 bg-zinc-200/40 dark:bg-zinc-700/40 rounded-full hover:dark:bg-zinc-700/60 hover:bg-zinc-200/70"
            onClick={() => navigate(RoutesPath(href)!)}
        >
            <IconArrowLeft className="size-6 stroke-[1.5px]" />
        </a>
    );
};
