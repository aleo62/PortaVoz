import { useModal } from "@/contexts/ModalContext";
import { useUserById } from "@/hooks/user/useUserById";
import { useStoreUser } from "@/stores/userStore";
import { ProfileSkeleton } from "@components/ui/ProfileSkeleton";
import { useParams } from "react-router-dom";

export const Profile = () => {
    const { openModal } = useModal();
    const { user: userData } = useStoreUser();
    const { userId } = useParams();

    const requestId = userId || userData?._id;

    const { data: user, isLoading: userLoading } = useUserById(requestId);
    // const {
    //     data: feedData,
    //     isLoading: feedLoading,
    //     fetchNextPage: fetchFeedNextPage,
    //     hasNextPage: feedHasNextPage,
    // } = usePostsByUser(requestId!);

    // const posts: UserPostData[] =
    //     (feedData?.pages.flatMap((page) => page.posts) as UserPostData[]) || [];

    // const createFollow = useCreateFollow();
    // const deleteFollow = useDeleteFollow();
    // const navigate = useNavigate();

    // const handleFollow = async () => {
    //     if (Boolean(user.isFollowing)) {
    //         user.isFollowing = false;
    //         user.meta.counters.followers--;
    //         await deleteFollow.mutateAsync(userId!);
    //     } else {
    //         user.isFollowing = true;
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

    if (userLoading || !user || (userId && !userId)) {
        return <ProfileSkeleton />;
    }

    return (
        <>
            <header className="max-xxl:px-1 relative mx-auto mt-5 h-40 w-full max-w-7xl md:h-75">
                <figure className="relative mx-auto h-full w-full rounded-3xl bg-zinc-300 shadow-md dark:bg-zinc-800">
                    {user?.banner && (
                        <img
                            src={user.banner}
                            alt="Banner"
                            className="h-full w-full rounded-3xl object-cover"
                        />
                    )}
                </figure>
                <figure className="absolute top-[112%] left-15 translate-y-[-50%]">
                    <img
                        src={user?.image}
                        alt="Foto de perfil"
                        className="border-body-background h-35 w-35 cursor-pointer rounded-full border-3 object-cover shadow-md lg:h-55 lg:w-55 dark:ring-zinc-900"
                        onClick={() => openModal("image", { image: user.image })}
                    />
                </figure>
            </header>

            <main className="mx-auto mt-4 grid w-full max-w-6xl grid-cols-[250px_1fr] space-y-5">
                <div className="col-start-2 col-end-3">
                    <h1 className="font-title text-title text-2xl max-lg:text-center lg:text-6xl">
                        {user.username}
                    </h1>
                    <p className="text-subtitle text-lg max-lg:text-center lg:text-xl">
                        {user.fName} {user.lName}
                    </p>
                    {/* <div className="text-subtitle text-md mt-4 flex w-full items-center gap-3 font-medium">
                        <p>{user.meta.counters.followers} Seguidores</p>
                        <p>{user.meta.counters.following} Seguindo</p>
                        <p>
                            {user.meta.counters.totalReports || 0} Postage
                            {user.meta.counters.totalReports != 1 ? "ns" : "m"}
                        </p>
                    </div> */}

                    {/* <p className="text-title mt-4">{user.about}</p> */}
                </div>
            </main>
        </>
    );
};
