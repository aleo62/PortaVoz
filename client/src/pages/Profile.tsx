import { useModal } from "@/contexts/ModalContext";
import { usePostsByUser } from "@/hooks/posts/usePostsByUser";
import { useCreateFollow } from "@/hooks/user/useCreateFollow";
import { useDeleteFollow } from "@/hooks/user/useDeleteFollow";
import { useUserById } from "@/hooks/user/useUserById";
import { useStoreUser } from "@/stores/userStore";
import { UserPostData } from "@/types/postDataType";
import { FeedPosts } from "@components/features/post/FeedPosts";
import { ImageModal } from "@components/modal/ImageModal";
import { Button } from "@components/ui/Button";
import { ProfileSkeleton } from "@components/ui/ProfileSkeleton";
import { IconMessage2 } from "@tabler/icons-react";
import { useParams } from "react-router-dom";

export const Profile = () => {
    const { openModal } = useModal();
    const { user: userData } = useStoreUser();
    const { userId } = useParams();

    const requestId = userId || userData?._id;

    const { data: user, isLoading: userLoading } = useUserById(requestId);
    const {
        data: feedData,
        isLoading: feedLoading,
        fetchNextPage: fetchFeedNextPage,
        hasNextPage: feedHasNextPage,
    } = usePostsByUser(requestId!);

    const posts: UserPostData[] =
        (feedData?.pages.flatMap((page) => page.posts) as UserPostData[]) || [];

    const createFollow = useCreateFollow();
    const deleteFollow = useDeleteFollow();
    // const navigate = useNavigate();

    const handleFollow = async () => {
        if (Boolean(user.isFollowing)) {
            user.isFollowing = false;
            user.meta.counters.followers--;
            await deleteFollow.mutateAsync(userId!);
        } else {
            user.isFollowing = true;
            user.meta.counters.followers++;
            await createFollow.mutateAsync(userId!);
        }
    };

    // const getChatByUser = useChatByUsers();
    // const fetchChat = async () => {
    //     getChatByUser.mutateAsync({ otherUserId: userId! }).then((response) => {
    //         navigate(`/chat/${response.chatId}`);
    //     });
    // };

    if (feedLoading || userLoading || !user || (userId && !userId)) {
        return <ProfileSkeleton />;
    }

    return (
        <>
            <main className="grid w-full grid-cols-1">
                <section className="mx-auto mt-5 mb-10 w-full max-w-5xl border-b-1 border-zinc-200 lg:px-1 dark:border-zinc-800">
                    <header className="relative pb-10">
                        <div className="h-40 w-full overflow-hidden rounded-3xl bg-zinc-300 md:h-75 dark:bg-zinc-800">
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
                                    className="ring-body-background absolute top-[25%] left-[50%] h-35 w-35 rounded-full object-cover ring-3 max-lg:translate-x-[-50%] lg:top-[45%] lg:left-15 lg:h-50 lg:w-50 dark:ring-zinc-900"
                                    onClick={() => openModal(<ImageModal image={user.image} />)}
                                />
                            </figure>
                        </div>
                    </header>

                    <main className="mt-5 mb-10 grid w-full">
                        <div>
                            <div className="flex items-center justify-between gap-5 py-5">
                                <h1 className="font-title text-title text-2xl font-medium max-lg:text-center lg:text-5xl">
                                    {user.username}
                                </h1>

                                <p className="text-subtitle mt-3 space-x-3 text-lg font-medium max-lg:text-center">
                                    <span>{user.meta.counters.followers} Seguidores</span>
                                    <span>{user.meta.counters.following} Seguindo</span>
                                    <span>
                                        {user.meta.counters.totalReports || 0} Postage
                                        {user.meta.counters.totalReports != 1 ? "ns" : "m"}
                                    </span>
                                </p>
                            </div>

                            <div className="flex items-center justify-between gap-5 py-5">
                                <p className="text-subtitle text-md mt-5">{user.about}</p>
                                {userId !== userData!._id && (
                                    <span className="flex items-center gap-2">
                                        <Button
                                            text={user.isFollowing ? "Seguindo" : "Seguir"}
                                            onClick={() => handleFollow()}
                                            styleType={user.isFollowing ? "outlined" : "primary"}
                                        />
                                        <Button Icon={IconMessage2} styleType="outlined" />
                                    </span>
                                )}
                            </div>
                        </div>

                        <div></div>
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
