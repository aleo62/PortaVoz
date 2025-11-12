// import { useModal } from "@/contexts/ModalContext";
// import { SidebarConfig } from "@/data/data";
// import { useIsMobile } from "@/hooks/useIsMobile";
// import { useStoreUser } from "@/stores/userStore";
// import { NotificationModal } from "@components/features/notification/NotificationModal";
// import { IconSelector } from "@tabler/icons-react";
// import { useState } from "react";
// import { SidebarHeaderDrop } from "./SidebarHeaderDrop";

import { IconSearch } from "@tabler/icons-react";

export const HeaderOptions = () => {
    // const isMobile = useIsMobile();
    // const userData = useStoreUser((state) => state.user);
    // const [activeUserDrop, setActiveUserDrop] = useState(false);
    // const { openModal } = useModal();

    return (
        <div className="ml-auto flex items-center lg:gap-3 ">
            <div className="bg-body-background w-[300px] flex items-center gap-1 rounded-xl px-3 py-2 ">
                <IconSearch className="size-5 mr-2"/>
                <input placeholder="Pesquisar" className="outline-none border-none text-sm"></input>
            </div>

            {/* <div className="relative flex items-center px-2.5">
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
                        className="h-full w-full object-cover"
                    />
                </figure>
                <div onClick={() => setActiveUserDrop(!activeUserDrop)}>
                    <IconSelector className={`text-subtitle size-4.5`} />
                    <SidebarHeaderDrop
                        isOpen={activeUserDrop}
                        orientation="top"
                        onClose={() => setActiveUserDrop(false)}
                    />
                </div>
            </div>

            {SidebarConfig.map(({ icon: Icon }, key) => (
                <button
                    className="text-title relative cursor-pointer p-2 bg-white rounded-full ring-1 ring-zinc-300"
                    onClick={() => openModal(<NotificationModal />)}
                    key={key}
                >
                    <Icon className="size-6 fill-zinc-200 dark:fill-zinc-800" />
                    {userData?.meta.counters.unreadNotifications! > 0 && (
                        <span className="ring-body-background absolute top-[-2px] left-[-5px] flex h-4.5 w-4.5 items-center justify-center rounded-full bg-red-500 text-[.7rem] text-white ring-2 content-['']">
                            {userData?.meta.counters.unreadNotifications}
                        </span>
                    )}
                </button>
            ))} */}
        </div>
    );
};
