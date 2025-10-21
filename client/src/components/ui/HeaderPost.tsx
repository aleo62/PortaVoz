import { useDeletePost } from "@/hooks/posts/useDeletePost";
import { useStoreUser } from "@/stores/userStore";
import { formatDate } from "@/utils/functions/formatDate";
import { PostData } from "@/utils/types/postDataType";
import { IconDotsVertical } from "@tabler/icons-react";
import { Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import { PostDrop } from "../drop/PostDrop";

export const HeaderPost = ({
    post,
    optionsDropOpen,
    setOptionsDropOpen,
    viewMode,
}: {
    post: PostData;
    optionsDropOpen: boolean;
    setOptionsDropOpen: Dispatch<SetStateAction<boolean>>;
    viewMode?: boolean;
}) => {
    const navigate = useNavigate();
    const { user } = useStoreUser();
    const deletePost = useDeletePost();

    const handleDeletePost = async () => {
        await deletePost.mutate(post._id);
    };

    return (
        <header
            className={`relative flex items-center gap-3 ${viewMode ? "py-5 px-2" : "p-3 py-5 lg:px-5 lg:py-6"}`}
        >
            <div
                onClick={() => navigate(`/profile/${post.user._id}`)}
                className="flex cursor-pointer items-center gap-3"
            >
                <img
                    src={post.user.image}
                    alt={post.user.username}
                    className="h-11 w-11 rounded-full object-cover lg:h-13 lg:w-13"
                />

                <div className="leading-5.5">
                    <p className="text-md text-title font-medium lg:text-lg">
                        {post.user.username}
                    </p>
                    <p className="text-subtitle text-xs lg:text-[.8rem]">
                        {formatDate(post.createdAt)}
                    </p>
                </div>
            </div>

            <div
                className="relative ml-auto w-fit cursor-pointer"
                onClick={() =>
                    optionsDropOpen ? setOptionsDropOpen(false) : setOptionsDropOpen(true)
                }
            >
                <IconDotsVertical className="text-subtitle size-4" />
                <PostDrop
                    isOpen={optionsDropOpen}
                    orientation="top"
                    onClose={() => {
                        setOptionsDropOpen(false);
                    }}
                    isOwner={post.user._id == user?._id || !!user?.claims!.admin}
                    onDeletePost={() => handleDeletePost()}
                />
            </div>
        </header>
    );
};
