import { RoutesPath } from "@/app/Routes";
import { IconChevronLeft } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

export const LinkBack = ({ href }: { href: string }) => {
    const navigate = useNavigate();
    return (
        <a
            className="text-title flex cursor-pointer items-center gap-2 rounded-full p-1 text-sm hover:bg-zinc-200/70 dark:bg-zinc-700/40 hover:dark:bg-zinc-700/60"
            onClick={() => navigate(RoutesPath(href)!)}
        >
            <IconChevronLeft className="size-5 stroke-[1.5px]" />
        </a>
    );
};
