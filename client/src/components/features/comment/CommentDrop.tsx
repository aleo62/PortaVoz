import { dropdownActions } from "@/actions/dropdownActions";
import { useModal } from "@/contexts/ModalContext";
import { Dropdown, DropdownItemProps, DropdownProps } from "@components/ui/Dropdown";
import { CommentDropItems, CommentDropOwnerItems } from "@constants/drop";

type CommentDropProps = DropdownProps & {
    isOwner: boolean;
    onDeleteComment: () => void;
};

export const CommentDrop = ({
    isOpen,
    orientation,
    onClose,
    isOwner,
    onDeleteComment,
}: CommentDropProps) => {
    const { openModal } = useModal();

    const handleItemClick = (item: DropdownItemProps) => {
        const action = dropdownActions[item.action!];

        if (!action) return;

        action({
            openModal,
            context: {
                type: "comment",
                onDelete: isOwner ? onDeleteComment : undefined,
            },
        });
    };

    return (
        <Dropdown isOpen={isOpen} orientation={orientation} onClose={onClose}>
            <Dropdown.Block>
                {CommentDropItems.map((item, index) => (
                    <Dropdown.Item
                        key={index}
                        Icon={item.Icon}
                        label={item.label}
                        onClick={() => handleItemClick(item)}
                        alert={item?.alert}
                        action={item.action}
                    />
                ))}
            </Dropdown.Block>
            {isOwner && (
                <Dropdown.Block>
                    {CommentDropOwnerItems.map((item, index) => (
                        <Dropdown.Item
                            key={index}
                            Icon={item.Icon}
                            label={item.label}
                            onClick={() => handleItemClick(item)}
                            alert={item?.alert}
                            action={item.action}
                        />
                    ))}
                </Dropdown.Block>
            )}
        </Dropdown>
    );
};
