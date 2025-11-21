import { Dropdown, DropdownProps } from "@components/ui/Dropdown";
import { UserDropAuthItems, UserDropItems } from "@constants/drop";

export const SidebarUserDrop = ({ isOpen, orientation, onClose }: DropdownProps) => {
    return (
        <Dropdown isOpen={isOpen} orientation={orientation} onClose={onClose}>
            <Dropdown.Block>
                {UserDropItems.map((item) => (
                    <Dropdown.Item
                        Icon={item.Icon}
                        label={item.label}
                        path={item.path}
                        alert={item?.alert}
                    />
                ))}
            </Dropdown.Block>
            <Dropdown.Block>
                {UserDropAuthItems.map((item, index) => (
                    <Dropdown.Item
                        key={index}
                        Icon={item.Icon}
                        label={item.label}
                        path={item.path}
                        alert={item?.alert}
                    />
                ))}
            </Dropdown.Block>
        </Dropdown>
    );
};
