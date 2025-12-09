import { PostData } from "@/types/postDataType";
import { limitText } from "@/utils/functions/limitText";
import { IconArrowBigUp, IconMessage } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

export const PostReflected = ({ post }: { post: PostData }) => {
    const navigate = useNavigate();

    return (
        <article
            onClick={() => navigate(`/post/${post._id}`)}
            className="relative h-45 w-full max-w-75 cursor-pointer overflow-hidden rounded-xl"
        >
            <img
                src={post.images?.[0] as string}
                className="absolute inset-0 h-full w-full object-cover"
                alt=""
            />
            <div className="group absolute inset-0 flex h-full flex-col justify-end gap-1 bg-gradient-to-b from-transparent to-black/50 to-100% p-4 px-3 text-white transition-all duration-300 hover:to-65%">
                <h3 className="font-title">{post.title}</h3>
                <p className="text-xs">{limitText(post.desc, 70)}</p>
                <div className="mt-2 flex h-0 gap-2 overflow-hidden transition-all duration-300 group-hover:h-6">
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
