import { HeaderSidebar } from "@/components/sidebar/HeaderSidebar";
import { ProfileSkeleton } from "@/components/ui/ProfileSkeleton";
import { useUser } from "@/contexts/UserContext";
import { useChatByUsers } from "@/hooks/chat/useChatByUsers";
import { useCreateFollow } from "@/hooks/user/useCreateFollow";
import { useDeleteFollow } from "@/hooks/user/useDeleteFollow";
import { useFollow } from "@/hooks/user/useFollow";
import { useUserById } from "@/hooks/user/useUser";
import { IconMessage2 } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const Profile = () => {
    const { userId } = useParams();
    const { data, isLoading } = useFollow(userId!);

    const { userDecoded } = useUser();
    const { data: user } = useUserById(userId!);

    const createFollow = useCreateFollow();
    const deleteFollow = useDeleteFollow();
    const [isFollowing, setIsFollowing] = useState(false);
    const [followers, setFollowers] = useState(0);
    const navigate = useNavigate();
    const getChatByUser = useChatByUsers();

    useEffect(() => {
        setFollowers(user?.meta.counters.followers!);
    }, [user]);

    useEffect(() => {
        if (!isLoading) setIsFollowing(Boolean(data?.following));
    }, [data, isLoading]);

    const handleFollow = async () => {
        setIsFollowing(!isFollowing);
        if (isFollowing) {
            setFollowers(followers! - 1);
            await deleteFollow.mutateAsync(userId!);
        } else {
            setFollowers(followers! + 1);
            await createFollow.mutateAsync(userId!);
        }
    };

    const fetchChat = async () => {
        getChatByUser.mutateAsync({ otherUserId: userId! }).then((response) => {
            navigate(`/chat/${response.chatId}`);
        });
    };

    if (isLoading || !user || (userId && !userId)) {
        return <ProfileSkeleton />;
    }

    return (
        <div className="w-full">
            <HeaderSidebar linkBack />

            <section className="mx-auto w-full max-w-4xl rounded-2xl bg-white pb-12 shadow-[0px_4px_55px_-19px_rgba(0,_0,_0,_0.1)] lg:rounded-3xl lg:p-2 lg:pb-14 dark:bg-zinc-900">
                <header>
                    <div className="text-title relative h-full w-full">
                        {user?.banner ? (
                            <img
                                src={user.banner}
                                alt="Banner"
                                className="h-40 w-full rounded-t-2xl object-cover md:h-60 lg:rounded-2xl"
                            />
                        ) : (
                            <div className="h-40 w-full rounded-t-2xl bg-stone-300 md:h-60 lg:rounded-2xl dark:bg-zinc-800"></div>
                        )}

                        <img
                            src={user?.image}
                            alt="Foto de perfil"
                            className="absolute top-[50%] left-[50%] h-30 w-30 rounded-full object-cover ring-3 ring-white max-lg:translate-x-[-50%] lg:left-5 lg:h-40 lg:w-40 dark:ring-zinc-900"
                        />
                    </div>

                    <div className="text-title mt-14 mb-4 flex w-full flex-col justify-between gap-3 px-2 text-center lg:mt-15 lg:flex-row lg:items-center lg:px-8 lg:text-start">
                        <div>
                            <h2 className="text-2xl font-semibold lg:text-3xl">
                                {user?.username ?? user?.fName}
                            </h2>
                            <p className="text-subtitle text-md">
                                {user?.fName} {user?.lName}
                            </p>
                        </div>

                        <div className="flex w-fit items-center gap-2 text-white max-lg:mx-auto">
                            {userId && userDecoded?.uid !== user._id ? (
                                <>
                                    <button
                                        onClick={() => handleFollow()}
                                        className={`p-2 px-5 ${isFollowing ? "text-accent bg-transparent" : "bg-accent"} ring-accent rounded-full text-sm ring-1 transition-all`}
                                    >
                                        {isFollowing ? "Seguindo" : "Seguir"}
                                    </button>
                                    <button
                                        className="text-title rounded-full p-3 ring-1 ring-zinc-300 hover:bg-zinc-100 dark:ring-zinc-700 hover:dark:bg-zinc-800"
                                        onClick={() => fetchChat()}
                                    >
                                        <IconMessage2 className="size-5" />
                                    </button>
                                </>
                            ) : (
                                <button
                                    onClick={() => navigate("/edit-profile")}
                                    className={`bg-accent ring-accent rounded-full p-2 px-5 text-sm ring-1 transition-all`}
                                >
                                    Editar Perfil
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="text-title mb-5 flex items-center justify-center divide-x-1 divide-zinc-300 px-2 text-sm font-semibold lg:justify-start lg:px-8 dark:divide-zinc-700">
                        <p className="pr-4">Seguidores {followers}</p>
                        <p className="pl-4">Seguindo {user?.meta.counters.following}</p>
                    </div>

                    <div className="mt-12 px-5 lg:px-8">
                        <h2 className="text-title mb-3 text-xl font-medium">Sobre Mim</h2>
                        <p className="text-subtitle text-xs lg:text-sm">
                            {user?.about ? user?.about : "Nada dito ainda :/"}
                        </p>
                    </div>
                </header>
            </section>
        </div>
    );
};
