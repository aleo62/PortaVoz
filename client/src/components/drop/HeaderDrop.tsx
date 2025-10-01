import { useUserById } from "@/hooks/user/useUser";
import { NavItems } from "@/utils/data";
import { IconArrowRight } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { DropdownTemplate, DropdownTemplateProps } from "../templates/DropdownTemplate";
import { Button } from "../ui/Button";

export const HeaderDrop = ({ isOpen, orientation, onClose }: DropdownTemplateProps) => {
    const navigate = useNavigate();
    const { data: user } = useUserById();
    return (
        <DropdownTemplate isOpen={isOpen} onClose={onClose} orientation={orientation}>
            <nav className="divide-y-1 divide-zinc-100 p-1 dark:divide-zinc-700">
                <ul className="text-title flex w-40 flex-col py-3 pt-2 text-sm">
                    {NavItems.map((item) => (
                        <li>
                            <a
                                className="flex w-full items-center gap-2 rounded-lg p-3 px-4 hover:bg-zinc-100 hover:text-zinc-800 dark:hover:bg-zinc-800 hover:dark:text-white"
                                onClick={() => navigate(item.href)}
                            >
                                {item.label}
                            </a>
                        </li>
                    ))}
                </ul>
                <ul className="text-title flex w-40 flex-col px-3 py-3 pt-2 text-sm">
                    <Button
                        styleType="primary"
                        text={!!user ? "Começar" : "Entrar"}
                        onClick={() => navigate("/auth/login")}
                        Icon={IconArrowRight}
                        small
                    />
                </ul>
            </nav>
        </DropdownTemplate>
    );
};
