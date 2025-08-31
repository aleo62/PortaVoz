import { HeaderSidebar } from "@/components/sidebar/HeaderSidebar";
import { ProfileSkeleton } from "@/components/ui/ProfileSkeleton";
import { useUser } from "@/contexts/UserContext";
import { useCreateFollow } from "@/hooks/user/useCreateFollow";
import { useDeleteFollow } from "@/hooks/user/useDeleteFollow";
import { useFollow } from "@/hooks/user/useFollow";
import { UserData } from "@/utils/types/userDataType";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const Profile = () => {
    const { publicId } = useParams();
    const { data, isLoading } = useFollow(publicId!);
    const { fetchUser, userData } = useUser();
    const createFollow = useCreateFollow();
    const deleteFollow = useDeleteFollow();

    const [user, setUser] = useState<UserData | null>(null);
    const [isFollowing, setIsFollowing] = useState(false);
    const [followers, setFollowers] = useState(0);
    const navigate = useNavigate();

    // Puxando dados do usuário
    useEffect(() => {
        const fetchUserData = async () => {
            let data;
            if (publicId && publicId !== userData?._publicId) {
                data = await fetchUser(publicId);
            } else {
                data = userData;
            }
            setUser(data as UserData);
        };

        fetchUserData();
    }, [publicId, userData]);

    // Setando o número de seguidores
    useEffect(() => {
        setFollowers(user?.meta.counters.followers!);
    }, [user]);

    // Verificando se está seguindo
    useEffect(() => {
        if (!isLoading) setIsFollowing(Boolean(data?.following));
    }, [data, isLoading]);

    // Handle seguir
    const handleFollow = async () => {
        setIsFollowing(!isFollowing);
        if (isFollowing) {
            setFollowers(followers! - 1);
            await deleteFollow.mutateAsync(publicId!);
        } else {
            setFollowers(followers! + 1);
            await createFollow.mutateAsync(publicId!);
        }
    };

    if (isLoading || !user || (publicId && !publicId)) {
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

                        <div className="text-white">
                            {publicId || publicId === userData?._publicId ? (
                                <button
                                    onClick={() => handleFollow()}
                                    className={`p-2 px-5 ${isFollowing ? "text-accent bg-transparent" : "bg-accent"} ring-accent rounded-full text-sm ring-1 transition-all`}
                                >
                                    {isFollowing ? "Seguindo" : "Seguir"}
                                </button>
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
