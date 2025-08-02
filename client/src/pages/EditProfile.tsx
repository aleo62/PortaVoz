import { SidebarProfile } from "@/components/sidebar/SidebarProfile";
import { ViewDanger } from "@/sections/EditProfile/ViewDanger";
import { ViewProfile } from "@/sections/EditProfile/ViewProfile";
import { ViewSecurity } from "@/sections/EditProfile/ViewSecurity";
import { JSX, useState } from "react";

export const EditProfile = () => {
    const [activeItem, setActiveItem] = useState(0);
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
            <SidebarProfile activeItem={activeItem} setActiveItem={setActiveItem} />
            <section className="flex w-fit max-w-4xl items-start justify-center">
                {ShowView}
            </section>
        </>
    );
};
