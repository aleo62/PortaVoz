import { useToast } from "@/contexts/ToastContext";
import { copyToClipboard } from "@/utils/functions/copyToClipboard";
import { Dropdown, DropdownProps } from "@components/ui/Dropdown";
import { PostDropItems, PostDropOwnerItems } from "@constants/drop";
import { useState } from "react";
import { SpinnerCircular } from "spinners-react";

type PostDropProps = DropdownProps & {
    postId: string;
    isOwner: boolean;
    onDeletePost: () => void;
};

export const PostDrop = ({
    isOpen,
    orientation,
    onClose,
    postId,
    isOwner,
    onDeletePost,
}: PostDropProps) => {
    const [isDeleting, setIsDeleting] = useState(false);
    const { successToast } = useToast();

    const handleCopyLink = () => {
        copyToClipboard(
            `${window.location.protocol}//${window.location.hostname}/post/${postId}`,
            "Link copiado",
            successToast,
        );
    };

    const handleDelete = () => {
        onDeletePost();
        setIsDeleting(true);
    };

    return (
        <Dropdown isOpen={isOpen} orientation={orientation} onClose={onClose}>
            <Dropdown.Block>
                {PostDropItems.map((item, index) => (
                    <Dropdown.Item
                        key={index}
                        Icon={item.Icon}
                        label={item.label}
                        path={item.path}
                        onClick={index === 0 ? handleCopyLink : undefined}
                        alert={item?.alert}
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
                            onClick={index === 0 ? handleDelete : undefined}
                            alert={item?.alert}
                        >
                            {isDeleting && index === 0 && (
                                <SpinnerCircular
                                    size={10}
                                    thickness={180}
                                    speed={100}
                                    color="#FF0000"
                                    secondaryColor="rgba(0, 0, 0, 0)"
                                    className="ml-auto"
                                />
                            )}
                        </Dropdown.Item>
                    ))}
                </Dropdown.Block>
            )}
        </Dropdown>
    );
};
