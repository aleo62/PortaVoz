import { usePostById } from "@/hooks/posts/usePostById";
import { PostData } from "@/types/postDataType";
import { PostHeader } from "@components/features/post/PostHeader";
import { PostLocationInfo } from "@components/features/post/PostLocationInfo";
import { PostMain } from "@components/features/post/PostMain";
import { useParams } from "react-router-dom";

export const PostView = () => {
    const { postId } = useParams();
    const { data, isLoading, isError } = usePostById(postId!, true);

    if (isLoading) return <div>Carregando...</div>;
    if (isError || !data?.post) return <div>Erro ao carregar post</div>;

    const post = data.post as PostData;

    return (
        <>
            <article className="w-full max-w-xl">
                <PostHeader post={post} viewMode />

                <PostMain post={post} viewMode />
            </article>
            <div className="mt-5 ml-4 w-full max-w-lg">
                <PostLocationInfo
                    latitude={post.location.latitude}
                    longitude={post.location.longitude}
                    address={post.address}
                />
            </div>
        </>
    );
};
