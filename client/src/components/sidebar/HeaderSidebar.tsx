import { useUser } from "@/contexts/UserContext";
import { SidebarConfig } from "@/utils/data";
import { useIsMobile } from "@/utils/isMobile";
import { IconPlus, IconSelector } from "@tabler/icons-react";
import { ReactNode, useState } from "react";
import { UserDrop } from "../drop/UserDrop";
import { Button } from "../ui/Button";

export const HeaderSidebar = ({ children }: { children?: ReactNode }) => {
    const { userData } = useUser();
    const isMobile = useIsMobile();

    const [activeUserDrop, setActiveUserDrop] = useState(false);
    return (
        <header className="mb-3 flex w-full items-center gap-6 lg:gap-3 bg-transparent py-3 lg:px-6">
            {children}

            <div className="ml-auto flex items-center lg:gap-3">
                {SidebarConfig.map(({ icon: Icon, href }, key) => (
                    <a className="text-title" href={href}>
                        <Icon key={key} className="size-6 fill-zinc-200 dark:fill-zinc-800" />
                    </a>
                ))}

                <div className="relative flex items-center px-2.5">
                    <div
                        className={`${!isMobile && "mr-2"} hidden h-fit flex-col items-center justify-end overflow-hidden transition-all lg:flex`}
                    >
                        <h4 className="text-title text-md w-fit font-medium">{userData?.fName}</h4>
                        <span className="text-subtitle block max-w-[6rem] truncate text-[.8rem]">
                            {userData?.email}
                        </span>
                    </div>

                    <a href="/profile" className="mr-1">
                        <figure className="tansiton-[box-shadow] mx-auto h-10 w-10 cursor-pointer overflow-clip rounded-xl shadow-md duration-300 hover:shadow-lg">
                            <img src={userData?.image} width={100} alt="" />
                        </figure>
                    </a>
                    <div onClick={() => setActiveUserDrop(!activeUserDrop)}>
                        <IconSelector className={`text-subtitle size-4.5`} />
                        <UserDrop
                            isOpen={activeUserDrop}
                            orientation="top"
                            onClose={() => setActiveUserDrop(false)}
                        />
                    </div>
                </div>

                {!isMobile && <Button Icon={IconPlus} text="Criar" small />}
            </div>
        </header>
    );
};
