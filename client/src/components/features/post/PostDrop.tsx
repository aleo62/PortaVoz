import { useDropdownActions } from "@/hooks/useDropdownActions";
import { Dropdown, DropdownItemProps, DropdownProps } from "@components/ui/Dropdown";
import { PostDropItems, PostDropOwnerItems } from "@constants/drop";

type PostDropProps = DropdownProps & {
    postId: string;
    isOwner: boolean;
    onDeletePost: () => void;
};

export const PostDrop = ({
    isOpen,
    orientation,
    onClose,
    isOwner,
    postId,
    onDeletePost,
}: PostDropProps) => {
    const { handleAction } = useDropdownActions();

    const handleItemClick = (item: DropdownItemProps) => {
        if (!item.action) return;

        handleAction(item.action, {
            id: postId,
            type: "post",
            onDelete: isOwner ? onDeletePost : undefined,
        });
    };

    return (
        <Dropdown isOpen={isOpen} orientation={orientation} onClose={onClose}>
            <Dropdown.Block>
                {PostDropItems.map((item, index) => (
                    <Dropdown.Item
                        key={index}
                        Icon={item.Icon}
                        label={item.label}
                        alert={item?.alert}
                        action={item.action}
                        onClick={() => handleItemClick(item)}
                    />
                ))}
            </Dropdown.Block>
            {isOwner && (
                <Dropdown.Block>
                    {PostDropOwnerItems.map((item, index) => (
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
            )}
        </Dropdown>
    );
};
