import { useDropdownActions } from "@/hooks/useDropdownActions";
import { Dropdown, DropdownItemProps, DropdownProps } from "@components/ui/Dropdown";
import { UserDropAuthItems, UserDropItems } from "@constants/drop";

export const SidebarUserDrop = ({ isOpen, orientation, onClose }: DropdownProps) => {
    const { handleAction } = useDropdownActions();

    const handleItemClick = (item: DropdownItemProps) => {
        if (!item.action) return;

        handleAction(item.action, {});
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
