import { HeaderSidebar } from "@/components/sidebar/HeaderSidebar";
import { useUser } from "@/contexts/UserContext";
import { UserData } from "@/utils/types/userDataType";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const Profile = () => {
    const { publicId } = useParams();
    const { fetchUser, userData, isFetchingUser } = useUser();
    const [user, setUser] = useState<UserData | null>(null);

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

    return (
        <>
            <div className="w-full">
                <HeaderSidebar></HeaderSidebar>
                <section className="mx-auto w-full max-w-4xl rounded-3xl bg-white p-2 pb-5 shadow-[0px_4px_55px_-19px_rgba(0,_0,_0,_0.1)] dark:bg-zinc-900">
                    <header>
                        <div className="text-title relative h-full w-full">
                            {publicId && isFetchingUser ? (
                                <>
                                    {/* Banner placeholder */}
                                    <div className="h-40 w-full animate-pulse rounded-2xl bg-stone-300 md:h-60 dark:bg-zinc-800"></div>

                                    {/* Imagem de perfil placeholder */}
                                    <div className="absolute top-[50%] left-5 h-40 w-40 animate-pulse rounded-full bg-stone-300 ring-3 ring-white dark:bg-zinc-800 dark:ring-zinc-900"></div>
                                </>
                            ) : (
                                <>
                                    {user?.banner ? (
                                        <img
                                            src={user.banner}
                                            alt="Banner"
                                            className="h-40 w-full rounded-2xl object-cover md:h-60"
                                        />
                                    ) : (
                                        <div className="h-40 w-full rounded-2xl bg-stone-300 md:h-60 dark:bg-zinc-800"></div>
                                    )}

                                    <img
                                        src={user?.image}
                                        alt="Foto de perfil"
                                        className="absolute top-[50%] left-5 h-27 w-27 rounded-full object-cover ring-3 ring-white lg:h-40 lg:w-40 dark:ring-zinc-900"
                                    />
                                </>
                            )}
                        </div>

                        <div className="text-title mt-12 flex w-full flex-col justify-between gap-3 px-2 lg:mt-15 lg:flex-row lg:items-center lg:px-8">
                            <div>
                                <h2 className="text-2xl font-semibold capitalize lg:text-3xl">
                                    {user?.fName}
                                </h2>
                                <p className="text-subtitle text-md">
                                    {user?.fName} {user?.lName}
                                </p>
                            </div>

                            <div className="flex items-center gap-3 text-sm">
                                <p>Seguidores: {user?.followers}</p>
                                <p>Seguindo: {user?.following}</p>
                            </div>
                        </div>
                    </header>
                </section>
            </div>
        </>
    );
};
