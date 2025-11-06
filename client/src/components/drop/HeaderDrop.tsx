import { RoutesPath } from "@/app/Routes";
import { NavItems } from "@/data/data";
import { useStoreUser } from "@/stores/userStore";
import { IconArrowRight } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/Button";
import { Dropdown, DropdownProps } from "../ui/Dropdown";

export const HeaderDrop = ({ isOpen, orientation, onClose }: DropdownProps) => {
    const navigate = useNavigate();
    const { user } = useStoreUser();

    return (
        <Dropdown isOpen={isOpen} orientation={orientation} onClose={onClose}>
            <Dropdown.Block>
                {NavItems.map((item, index) => (
                    <Dropdown.Item
                        key={index}
                        label={item.label}
                        onClick={() => navigate(item.href)}
                    />
                ))}
            </Dropdown.Block>
            <Dropdown.Block>
                <li className="px-3 py-2">
                    <Button
                        styleType="primary"
                        text={!!user ? "Começar" : "Entrar"}
                        onClick={() => navigate(RoutesPath("Login")!)}
                        Icon={IconArrowRight}
                        size="small"
                    />
                </li>
            </Dropdown.Block>
        </Dropdown>
    );
};
