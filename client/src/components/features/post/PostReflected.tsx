import { PostData } from "@/types/postDataType";
import { IconArrowBigUp, IconMessage } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

export const PostReflected = ({ post }: { post: PostData }) => {
    const navigate = useNavigate();

    return (
        <article
            onClick={() => navigate(`/post/${post._id}`)}
            className="relative w-full h-45 max-w-75 cursor-pointer overflow-hidden rounded-xl"
        >
            <img
                src={post.images?.[0] as string}
                className="absolute inset-0 h-full w-full object-cover"
                alt=""
            />
            <div className="absolute inset-0 flex h-full flex-col justify-end gap-1 group bg-gradient-to-b from-transparent to-black/50 to-100% p-4 px-3 text-white transition-all duration-300 hover:to-65%">
                <h3 className="font-title">{post.title}</h3>
                <p className="text-xs">{post.desc}</p>
                <div className="gap-2 mt-2 h-0 overflow-hidden flex group-hover:h-6 transition-all duration-300">
                    <span className="flex items-center gap-2 text-xs">
                        <IconArrowBigUp className="size-5" /> {post.upvotesCount}
                    </span>
                    <span className="flex items-center gap-2 text-xs">
                        <IconMessage className="size-5" /> {post.commentsCount}
                    </span>
                </div>
            </div>
        </article>
    );
};
