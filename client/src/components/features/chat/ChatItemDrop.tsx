import { Dropdown, DropdownItemProps, DropdownProps } from "@/components/ui/Dropdown";
import { ChatDropItems } from "@/constants/drop";
import { useDropdownActions } from "@/hooks/useDropdownActions";

type ChatItemDropProps = DropdownProps & {
    chatId: string;
    onDeleteChat: () => void;
    onReadChat: () => void;
};

export const ChatItemDrop = ({
    isOpen,
    orientation,
    onClose,
    chatId,
    onDeleteChat,
    onReadChat,
}: ChatItemDropProps) => {
    const { handleAction } = useDropdownActions();

    const handleItemClick = (item: DropdownItemProps) => {
        if (!item.action) return;

        handleAction(item.action, {
            id: chatId,
            onDelete: onDeleteChat,
            onRead: onReadChat
        });
    };

    return (
        <Dropdown isOpen={isOpen} orientation={orientation} onClose={onClose}>
            <Dropdown.Block>
                {ChatDropItems.map((item, index) => (
                    <Dropdown.Item
                        key={index}
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
