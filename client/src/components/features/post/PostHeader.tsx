import { useDeletePost } from "@/hooks/posts/useDeletePost";
import { useStoreUser } from "@/stores/userStore";
import { PostData } from "@/types/postDataType";
import { formatDate } from "@/utils/functions/formatDate";
import { IconDotsVertical } from "@tabler/icons-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PostDrop } from "./PostDrop";

type HeaderPostProps = { post: PostData; viewMode?: boolean };

export const PostHeader = ({ post, viewMode }: HeaderPostProps) => {
    const { user } = useStoreUser();
    const navigate = useNavigate();
    const [optionsDropOpen, setOptionsDropOpen] = useState(false);

    const deletePost = useDeletePost();
    const handleDeletePost = async () => {
        await deletePost.mutate(post._id);
    };

    return (
        <header
            className={`relative flex items-center gap-3 ${viewMode ? "px-2 py-5" : "p-3 py-5 lg:px-5 lg:py-6"}`}
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
                    postId={post._id}
                    isOwner={post.user._id == user?._id || !!user?.claims!.admin}
                    onDeletePost={() => handleDeletePost()}
                />
            </div>
        </header>
    );
};
