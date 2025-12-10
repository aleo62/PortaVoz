import { FeedPosts } from "@/components/features/post/FeedPosts";
import { ProfileActions } from "@/components/features/profile/ProfileActions";
import { ProfileTabs } from "@/components/features/profile/ProfileTabs";
import { Button } from "@/components/ui/Button";
import { useModal } from "@/contexts/ModalContext";
import { useChatByUsers } from "@/hooks/chat/useChatByUsers";
import { usePostsByUser } from "@/hooks/posts/usePostsByUser";
import { useCreateFollow } from "@/hooks/user/useCreateFollow";
import { useDeleteFollow } from "@/hooks/user/useDeleteFollow";
import { useUserById } from "@/hooks/user/useUserById";
import { useStoreUser } from "@/stores/userStore";
import { ProfileSkeleton } from "@components/ui/ProfileSkeleton";
import { IconSettings } from "@tabler/icons-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const Profile = () => {
    const { openModal } = useModal();
    const { user: userData } = useStoreUser();
    const { userId } = useParams();
    const navigate = useNavigate();

    const requestId = userId || userData?._id;
    const isOwnProfile = !userId || userId === userData?._id;
    const [activeTab, setActiveTab] = useState<"all" | "posts" | "reposts">("all");

    const { data: user, isLoading: userLoading } = useUserById(requestId);
    const {
        data: feedData,
        isLoading: feedLoading,
        fetchNextPage: fetchFeedNextPage,
        hasNextPage: feedHasNextPage,
    } = usePostsByUser(requestId!, activeTab!);

    const posts: any[] = feedData?.pages.flatMap((page) => page.posts) || [];

    const createFollow = useCreateFollow();
    const deleteFollow = useDeleteFollow();
    const createChat = useChatByUsers();

    const handleFollow = async () => {
        if (user?.isFollowing) {
            await deleteFollow.mutateAsync(requestId!);
        } else {
            await createFollow.mutateAsync(requestId!);
        }
    };

    const handleChat = async () => {
        const data = await createChat.mutateAsync({
            otherUserId: requestId!,
        });
        console.log(data);
        navigate(`/chat`, { state: { chatId: data.chatId } });
    };

    if (userLoading || !user) {
        return <ProfileSkeleton />;
    }

    return (
        <>
            <header className="relative mx-auto lg:mt-5 w-full max-w-7xl  md:h-75">
                <figure className="relative mx-auto aspect-3/1 lg:aspect-4/1 w-full lg:rounded-3xl bg-zinc-300 shadow-md  dark:bg-zinc-800">
                    {user?.banner && (
                        <img
                            src={user.banner}
                            alt="Banner"
                            className="h-full w-full lg:rounded-3xl object-cover"
                        />
                    )}
                </figure>
                <figure className="absolute top-[100%] max-lg:left-1/2 max-lg:-translate-x-1/2 lg:left-10 translate-y-[-50%] lg:top-[115%]">
                    <img
                        src={user?.image}
                        alt="Foto de perfil"
                        className="border-body-background h-35 w-35 cursor-pointer rounded-full border-3 object-cover shadow-md lg:h-55 lg:w-55 dark:ring-zinc-900"
                        onClick={() => openModal("image", { image: user.image })}
                    />
                </figure>
            </header>

            <main className="mx-auto mt-20 mb-10 w-full max-w-7xl px-4 lg:mt-8">
                <div className="flex justify-between gap-2  lg:ml-[270px] lg:items-center">
                    <div>
                        <h1 className="font-title text-title text-2xl lg:text-4xl">
                            {user.username}
                        </h1>
                        <p className="text-subtitle text-md lg:text-lg">
                            {user.fName} {user.lName}
                        </p>
                    </div>

                    <div className="flex-shrink-0">
                        {isOwnProfile ? (
                            <Button
                                text="Editar Perfil"
                                Icon={IconSettings}
                                styleType="outlined"
                                size="small"
                                onClick={() => openModal("settings", {})}
                            />
                        ) : (
                            <ProfileActions
                                userId={requestId!}
                                isFollowing={user.isFollowing || false}
                                onFollow={handleFollow}
                                onUnfollow={handleFollow}
                                onChat={handleChat}
                            />
                        )}
                    </div>
                </div>

                <div className="text-subtitle mt-4 flex items-center gap-6 text-sm font-medium lg:ml-[270px]">
                    <p>
                        <span className="text-title font-semibold">
                            {user.meta?.counters?.followers || 0}
                        </span>{" "}
                        Seguidores
                    </p>
                    <p>
                        <span className="text-title font-semibold">
                            {user.meta?.counters?.following || 0}
                        </span>{" "}
                        Seguindo
                    </p>
                    <p>
                        <span className="text-title font-semibold">
                            {user.meta?.counters?.postsCount || 0}
                        </span>{" "}
                        Posts
                    </p>
                </div>

                {user.about && (
                    <div className="mt-4 max-lg:text-sm lg:ml-[270px]">
                        <p className="text-subtitle">{user.about}</p>
                    </div>
                )}
            </main>

            <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />

            <div className="mx-auto w-full max-w-7xl ">
                <FeedPosts
                    posts={posts}
                    feedLoading={feedLoading}
                    feedHasNextPage={feedHasNextPage}
                    fetchFeedNextPage={fetchFeedNextPage}
                    grid
                />
            </div>
        </>
    );
};
