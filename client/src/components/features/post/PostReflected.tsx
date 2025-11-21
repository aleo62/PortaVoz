import { PostData } from "@/types/postDataType";
import { IconArrowBigUp, IconMessageDots } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

export const PostReflected = ({ post }: { post: PostData }) => {
    const navigate = useNavigate();

    return (
        <article
            onClick={() => navigate(`/post/${post._id}`)}
            className="flex w-full cursor-pointer items-center justify-between gap-4 rounded-xl p-1"
        >
            <div className="">
                <h3 className="lg:text-md text-title font-title mb-0.5 truncate text-[1.01rem] max-w-25">
                    {post.title}
                </h3>
                <p className="text-subtitle line-clamp-2 max-w-45 text-xs">{post.desc}</p>

                <div className="text-subtitle mt-4 flex items-center gap-3 text-xs">
                    <span className="flex items-center gap-1">
                        <IconArrowBigUp className="size-4.5" /> {post.upvotesCount}
                    </span>
                    <span className="flex items-center gap-1">
                        <IconMessageDots className="size-4.5" /> {post.commentsCount}
                    </span>
                </div>
            </div>

            <img
                src={post.images?.[0] as string}
                className="h-25 w-25 rounded-xl object-cover lg:h-25 lg:w-25"
                alt=""
            />
        </article>
    );
};
