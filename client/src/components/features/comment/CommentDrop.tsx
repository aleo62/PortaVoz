import { CommentDropItems, CommentDropOwnerItems } from "@/data/drop";
import { useState } from "react";
import { SpinnerCircular } from "spinners-react";
import { Dropdown, DropdownProps } from "@components/ui/Dropdown";

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
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = () => {
        onDeleteComment();
        setIsDeleting(true);
    };

    return (
        <Dropdown isOpen={isOpen} orientation={orientation} onClose={onClose}>
            <Dropdown.Block>
                {CommentDropItems.map((item, index) => (
                    <Dropdown.Item
                        key={index}
                        Icon={item.Icon}
                        label={item.label}
                        path={item.path}
                        alert={item?.alert}
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
                            path={item.path}
                            onClick={index === 1 ? handleDelete : undefined}
                            alert={item?.alert}
                        >
                            {isDeleting && index === 1 && (
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
