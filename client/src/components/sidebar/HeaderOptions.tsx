import { useModal } from "@/contexts/ModalContext";
import { SidebarConfig } from "@/data/data";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useStoreUser } from "@/stores/userStore";
import { IconSelector } from "@tabler/icons-react";
import { useState } from "react";
import { UserDrop } from "../drop/UserDrop";
import { NotificationModal } from "../modal/NotificationModal";

export const HeaderOptions = () => {
    const isMobile = useIsMobile();
    const userData = useStoreUser((state) => state.user);
    const [activeUserDrop, setActiveUserDrop] = useState(false);
    const { openModal } = useModal();

    return (
        <div className="ml-auto flex w-fit items-center lg:gap-3">
            <div className="relative flex items-center px-2.5">
                <div
                    className={`${!isMobile && "mr-2"} hidden h-fit flex-col items-end overflow-hidden transition-all lg:flex`}
                >
                    <h4 className="text-title text-md mr-2 w-fit font-medium">
                        {userData?.username ?? userData?.fName}
                    </h4>
                    <span className="text-subtitle block max-w-[6rem] truncate text-[.8rem]">
                        {userData?.email}
                    </span>
                </div>

                <figure className="tansiton-[box-shadow] mx-auto h-10 w-10 cursor-pointer overflow-clip rounded-xl shadow-md duration-300 hover:shadow-lg">
                    <img
                        src={userData?.image as string}
 
                        alt=""
                        className="object-cover w-full h-full"
                    />
                </figure>
                <div onClick={() => setActiveUserDrop(!activeUserDrop)}>
                    <IconSelector className={`text-subtitle size-4.5`} />
                    <UserDrop
                        isOpen={activeUserDrop}
                        orientation="top"
                        onClose={() => setActiveUserDrop(false)}
                    />
                </div>
            </div>

            {SidebarConfig.map(({ icon: Icon }, key) => (
                <a
                    className="text-title relative"
                    onClick={() => openModal(<NotificationModal />)}
                    key={key}
                >
                    <Icon className="size-6 fill-zinc-200 dark:fill-zinc-800" />
                    {userData?.meta.counters.unreadNotifications! > 0 && (
                        <span className="ring-body-background absolute top-[-2px] left-[-5px] flex h-3.5 w-3.5 items-center justify-center rounded-full bg-red-500 text-[.7rem] text-white ring-2 content-['']">
                            {userData?.meta.counters.unreadNotifications}
                        </span>
                    )}
                </a>
            ))}
        </div>
    );
};
