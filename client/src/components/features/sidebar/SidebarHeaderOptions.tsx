// import { useModal } from "@/contexts/ModalContext";
// import { SidebarConfig } from "@/data/data";
// import { useIsMobile } from "@/hooks/useIsMobile";
// import { useStoreUser } from "@/stores/userStore";
// import { NotificationModal } from "@components/features/notification/NotificationModal";
// import { IconSelector } from "@tabler/icons-react";
// import { useState } from "react";
// import { SidebarHeaderDrop } from "./SidebarHeaderDrop";

import { RiSearch2Line } from "@remixicon/react";

export const HeaderOptions = () => {
    return (
        <div className="ml-auto flex items-center lg:gap-3">
            <div className="bg-body-background flex w-[300px] items-center gap-1 rounded-xl px-3 py-2.5 ring-1 ring-zinc-200 dark:ring-zinc-800">
                <RiSearch2Line className="mr-2 size-5" />
                <input
                    placeholder="Encontre Algo"
                    className="border-none text-sm outline-none"
                ></input>
            </div>
        </div>
    );
};
