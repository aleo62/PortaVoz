import { dropdownActions } from "@/actions/dropdownActions";
import { Modals } from "@/contexts/ModalContext";
import { Dropdown, DropdownItemProps, DropdownProps } from "@components/ui/Dropdown";
import { UserDropAuthItems, UserDropItems } from "@constants/drop";
import { useNavigate } from "react-router-dom";

export const SidebarUserDrop = ({
    isOpen,
    orientation,
    onClose,
    openModal,
}: DropdownProps & { openModal: (modalKey: keyof typeof Modals, context?: any) => void }) => {
    const navigate = useNavigate();

    const handleItemClick = (item: DropdownItemProps) => {
        const action = dropdownActions[item.action];

        if (!action) return;

        action({
            navigate,
            openModal,
            context: {},
        });
    };

    return (
        <Dropdown isOpen={isOpen} orientation={orientation} onClose={onClose}>
            <Dropdown.Block>
                {UserDropItems.map((item) => (
                    <Dropdown.Item
                        key={item.action}
                        Icon={item.Icon}
                        label={item.label}
                        action={item.action}
                        alert={item?.alert}
                        onClick={() => handleItemClick(item)}
                    />
                ))}
            </Dropdown.Block>
            <Dropdown.Block>
                {UserDropAuthItems.map((item) => (
                    <Dropdown.Item
                        key={item.action}
                        Icon={item.Icon}
                        label={item.label}
                        action={item.action}
                        alert={item?.alert}
                        onClick={() => handleItemClick(item)}
                    />
                ))}
            </Dropdown.Block>
        </Dropdown>
    );
};
