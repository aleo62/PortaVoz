import { useDeletePost } from "@/hooks/posts/useDeletePost";
import loading from "@assets/images/loading.gif";
import { Report } from "@components/otros/Report";
import { usePosts } from "@hooks/posts/usePosts";
import { IconPlus } from "@tabler/icons-react";
import { PostData } from "@utils/types/postDataType";
import { useNavigate } from "react-router-dom";

export const Reports = () => {
    const navigate = useNavigate();
    const deletePost = useDeletePost();
    const { data, isLoading } = usePosts();

    const hadleDeletePost = async (id: string) => {
        await deletePost.mutate(id);
        data?.posts.filter((post: PostData) => post._id !== id);
    };

    if (isLoading) {
        return <img src={loading} alt="" />;
    }

    return (
        <>
            <section className="w-full space-y-3">
                {data?.posts.map((post: PostData) => (
                    <Report report={post} onDeletePost={async () => await hadleDeletePost(post._id)} key={post._id} />
                ))}
            </section>

            <button
                className="bg-accent absolute right-10 bottom-10 flex h-12 w-12 items-center justify-center rounded-full text-white"
                onClick={() => navigate("/createreport")}
            >
                <IconPlus size={25} />
            </button>
        </>
    );
};
