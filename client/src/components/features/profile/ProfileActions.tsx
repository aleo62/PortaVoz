import { Button } from "@/components/ui/Button";
import { Dropdown } from "@/components/ui/Dropdown";
import { useDropdownActions } from "@/hooks/useDropdownActions";
import { IconDots, IconFlag, IconMessage, IconUserMinus, IconUserPlus } from "@tabler/icons-react";
import { useState } from "react";

type ProfileActionsProps = {
    userId: string;
    isFollowing: boolean;
    onFollow: () => void;
    onUnfollow: () => void;
    onChat: () => void;
};

export const ProfileActions = ({
    userId,
    isFollowing,
    onFollow,
    onUnfollow,
    onChat,
}: ProfileActionsProps) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const { handleAction } = useDropdownActions();

    const handleReport = () => {
        handleAction("report", {
            id: userId,
            type: "user",
        });
        setDropdownOpen(false);
    };

    return (
        <div className="flex items-center gap-3">
            <Button
                text={isFollowing ? "Deixar de seguir" : "Seguir"}
                Icon={isFollowing ? IconUserMinus : IconUserPlus}
                styleType={isFollowing ? "outlined" : "primary"}
                size="small"
                onClick={isFollowing ? onUnfollow : onFollow}
            />
            <Button Icon={IconMessage} styleType="outlined" size="small" onClick={onChat} />
            <div className="relative">
                <Button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    Icon={IconDots}
                    size="small"
                    styleType="outlined"
                />
                <Dropdown
                    isOpen={dropdownOpen}
                    orientation="top"
                    onClose={() => setDropdownOpen(false)}
                >
                    <Dropdown.Block>
                        <Dropdown.Item label="Denunciar" Icon={IconFlag} onClick={handleReport} />
                    </Dropdown.Block>
                </Dropdown>
            </div>
        </div>
    );
};
