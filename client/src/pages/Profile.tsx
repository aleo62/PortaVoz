import { FeedPosts } from "@/components/features/post/FeedPosts";
import { ImageModal } from "@/components/modal/ImageModal";
import { useModal } from "@/contexts/ModalContext";
import { usePostsByUser } from "@/hooks/posts/usePostsByUser";
import { useUserById } from "@/hooks/user/useUserById";
import { PostData } from "@/utils/types/postDataType";
import { useParams } from "react-router-dom";
import { ProfileSkeleton } from "@/components/ui/ProfileSkeleton";
import { useStoreUser } from "@/stores/userStore";

export const Profile = () => {
    const { openModal } = useModal();
    const { user: userData } = useStoreUser();

    const { userId } = useParams();
    // const { data: follow, isLoading } = useFollow(userId!);
    const { data: user } = useUserById(userId || userData!._id);

    const {
        data: feedData,
        isLoading: feedLoading,
        fetchNextPage: fetchFeedNextPage,
        hasNextPage: feedHasNextPage,
    } = usePostsByUser(userId || userData!._id);

    const posts: PostData[] = (feedData?.pages.flatMap((page) => page.posts) as PostData[]) || [];

    // const { user: userData } = useStoreUser();

    // const createFollow = useCreateFollow();
    // const deleteFollow = useDeleteFollow();
    // const navigate = useNavigate();

    // const handleFollow = async () => {
    //     if (Boolean(follow?.following)) {
    //         follow.following = false;
    //         user.meta.counters.followers--;
    //         await deleteFollow.mutateAsync(userId!);
    //     } else {
    //         follow.following = true;
    //         user.meta.counters.followers++;
    //         await createFollow.mutateAsync(userId!);
    //     }
    // };

    // const getChatByUser = useChatByUsers();
    // const fetchChat = async () => {
    //     getChatByUser.mutateAsync({ otherUserId: userId! }).then((response) => {
    //         navigate(`/chat/${response.chatId}`);
    //     });
    // };

    if (feedLoading || !user || (userId && !userId)) {
        return <ProfileSkeleton />;
    }

    return (
        <>
            <main className="grid w-full grid-cols-1">
                <section className="mx-auto mt-5 mb-10 w-full max-w-7xl border-b-1 border-zinc-200 lg:px-1 dark:border-zinc-800">
                    <header className="relative pb-10">
                        <div className="0 h-40 w-full overflow-hidden rounded-3xl bg-zinc-300 md:h-85 dark:bg-zinc-800">
                            {user?.banner && (
                                <img
                                    src={user.banner}
                                    alt="Banner"
                                    className="h-full w-full object-cover"
                                />
                            )}

                            <figure className="">
                                <img
                                    src={user?.image}
                                    alt="Foto de perfil"
                                    className="ring-body-background absolute top-[25%] left-[50%] h-35 w-35 rounded-full object-cover ring-3 max-lg:translate-x-[-50%] lg:top-[45%] lg:left-15 lg:h-60 lg:w-60 dark:ring-zinc-900"
                                    onClick={() => openModal(<ImageModal image={user.image} />)}
                                />
                            </figure>
                        </div>
                    </header>

                    <main className="mb-10 grid w-full mt-5 lg:px-7">
                        
                        <div>
                            <div className="py-5">
                                <h1 className="font-title text-title text-3xl font-medium max-lg:text-center lg:text-5xl">
                                    {user.username}
                                </h1>

                                <p className="text-subtitle text-md mt-3 divide-x-1 divide-zinc-200 max-lg:text-center dark:divide-zinc-800">
                                    <span className="pr-3 font-medium">
                                        Seguidores: {user.meta.counters.followers}
                                    </span>

                                    <span className="pl-3 font-medium">
                                        Seguidores: {user.meta.counters.followers}
                                    </span>
                                </p>
                            </div>
                            <div className="dark:ring-zinc-80 rounded-xl p-5 ring-1 ring-zinc-200">
                                <h2 className="text-title text-xl lg:text-2xl">Sobre Mim</h2>
                                <p className="text-subtitle text-md mt-2 lg:text-lg">
                                    {user.about}
                                </p>
                            </div>
                        </div>
                    </main>
                </section>
                <FeedPosts
                    posts={posts}
                    feedLoading={feedLoading}
                    feedHasNextPage={feedHasNextPage}
                    fetchFeedNextPage={fetchFeedNextPage}
                />
            </main>
        </>
    );
};
