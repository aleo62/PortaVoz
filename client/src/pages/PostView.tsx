import { HeaderPost } from "@/components/ui/HeaderPost";
import { MainPost } from "@/components/ui/MainPost";
import { PostMap } from "@/components/ui/PostMap";
import { usePostById } from "@/hooks/posts/usePostById";
import { PostData } from "@/utils/types/postDataType";
import { useParams } from "react-router-dom";

export const PostView = () => {
    const { postId } = useParams();
    const { data, isLoading, isError } = usePostById(postId!, true);

    if (isLoading) return <div>Carregando...</div>;
    if (isError || !data?.post) return <div>Erro ao carregar post</div>;

    const post = data.post as PostData;

    return (
        <>
            <article className="mx-auto flex w-full flex-col justify-center rounded-xl max-lg:items-center lg:flex-row lg:gap-4">
                <div className="w-full max-w-xl">
                    <HeaderPost post={post} viewMode />

                    <MainPost post={post} viewMode />
                </div>

                <div className={`w-full space-y-5 transition-all lg:max-w-md`}>
                    <h3 className="text-title font-title mb-2 text-lg font-medium">Endereço</h3>

                    <p className="border-l-2 border-zinc-400/70 dark:border-zinc-700/70 pl-2 text-sm text-zinc-800 dark:text-zinc-200">
                        {post.address}
                    </p>

                    <h3 className="text-title font-title mb-2 text-lg font-medium">Localização</h3>

                    {post.location.latitude != null && post.location.longitude != null && (
                        <PostMap
                            latitude={Number(post.location.latitude)}
                            longitude={Number(post.location.longitude)}
                        />
                    )}
                </div>
            </article>
        </>
    );
};
