import { HeaderSidebar } from "@/components/sidebar/HeaderSidebar";
import { SidebarProfile } from "@/components/sidebar/SidebarProfile";
import { useIsMobile } from "@/hooks/useIsMobile";
import { ViewDanger } from "@/sections/EditProfile/ViewDanger";
import { ViewProfile } from "@/sections/EditProfile/ViewProfile";
import { ViewSecurity } from "@/sections/EditProfile/ViewSecurity";
import { JSX, useState } from "react";

export const EditProfile = () => {
    const [activeItem, setActiveItem] = useState(0);
    const isMobile = useIsMobile();
    let ShowView: JSX.Element = <ViewProfile />;

    switch (activeItem) {
        case 0:
            ShowView = <ViewProfile />;
            break;
        case 1:
            ShowView = <ViewSecurity />;
            break;
        case 2:
            ShowView = <ViewDanger />;
            break;
    }

    return (
        <>
            <div className="relative w-full">
                {!isMobile && <HeaderSidebar />}

                <div className="flex justify-center gap-5 max-lg:flex-col">
                    <SidebarProfile activeItem={activeItem} setActiveItem={setActiveItem} />
                    <section className="flex w-full max-w-4xl items-start justify-center">
                        {ShowView}
                    </section>
                </div>
            </div>
        </>
    );
};
