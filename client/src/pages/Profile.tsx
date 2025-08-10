import { HeaderSidebar } from "@/components/sidebar/HeaderSidebar";
import { useUser } from "@/contexts/UserContext";
import { UserData } from "@/utils/types/userDataType";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const Profile = () => {
    const { publicId } = useParams();
    const { fetchUser, userData } = useUser();
    const [user, setUser] = useState<UserData | null>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            let data;
            if (publicId) {
                data = await fetchUser(publicId);
                console.log(await fetchUser(publicId));
            } else {
                data = userData;
            }
            setUser(data as UserData);
        };

        fetchUserData();
    }, [publicId, fetchUser, userData]);

    return (
        <>
            <div className="w-full">
                <HeaderSidebar></HeaderSidebar>
                <section className="w-full max-w-4xl rounded-3xl mx-auto bg-white p-2 pb-5 shadow-[0px_4px_55px_-19px_rgba(0,_0,_0,_0.1)] dark:bg-zinc-900">
                    <header>
                        <div className="relative h-full w-full">
                            {user?.banner ? (
                                <img
                                    src={user?.banner}
                                    alt="Banner"
                                    className="h-40 w-full rounded-2xl object-cover md:h-60"
                                />
                            ) : (
                                <div className="h-40 w-full rounded-2xl bg-stone-300 md:h-60 dark:bg-zinc-800"></div>
                            )}
                            <img
                                src={user?.image}
                                alt=""
                                className="absolute top-[50%] left-5 h-40 w-40 rounded-full ring-3 ring-white dark:ring-zinc-900"
                            />
                        </div>

                        <div className="text-title mt-15 flex w-full items-center justify-between px-8">
                            <div>
                                <h2 className="text-3xl font-semibold capitalize">{user?.fName}</h2>
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
