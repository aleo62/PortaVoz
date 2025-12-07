import { useDropdownActions } from "@/hooks/useDropdownActions";
import { Dropdown, DropdownItemProps, DropdownProps } from "@components/ui/Dropdown";
import { IconFlag, IconLogin, IconTrash } from "@tabler/icons-react";

type CommunityDropProps = DropdownProps & {
    communityId: string;
    isOwner: boolean;
    onDeleteCommunity: () => void;
    onJoinCommunity?: () => void;
};

const CommunityDropItems: DropdownItemProps[] = [
    { label: "Reportar", action: "report", Icon: IconFlag },
];

const CommunityDropOwnerItems: DropdownItemProps[] = [
    { label: "Deletar", action: "deletePost", Icon: IconTrash, alert: true },
];

export const CommunityDrop = ({
    isOpen,
    orientation,
    onClose,
    isOwner,
    communityId,
    onDeleteCommunity,
    onJoinCommunity,
}: CommunityDropProps) => {
    const { handleAction } = useDropdownActions();

    const handleItemClick = (item: DropdownItemProps) => {
        if (!item.action) return;

        if (item.action === "deletePost" && isOwner) {
            onDeleteCommunity();
        } else {
            handleAction(item.action, {
                id: communityId,
                type: "community",
            });
        }
        onClose();
    };

    return (
        <Dropdown isOpen={isOpen} orientation={orientation} onClose={onClose}>
            <Dropdown.Block>
                {CommunityDropItems.map((item, index) => (
                    <Dropdown.Item
                        key={index}
                        Icon={item.Icon}
                        label={item.label}
                        alert={item?.alert}
                        action={item.action}
                        onClick={() => handleItemClick(item)}
                    />
                ))}
                {onJoinCommunity && (
                    <Dropdown.Item
                        Icon={IconLogin}
                        label="Entrar"
                        onClick={() => {
                            onJoinCommunity();
                            onClose();
                        }}
                    />
                )}
            </Dropdown.Block>
            {isOwner && (
                <Dropdown.Block>
                    {CommunityDropOwnerItems.map((item, index) => (
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
