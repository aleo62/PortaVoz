import { SidebarProfileItems } from "@/utils/data";
import { useIsMobile } from "@/utils/isMobile";
import { SidebarProfileItem } from "./SidebarProfileItem";

export const SidebarProfile = ({
    activeItem,
    setActiveItem,
}: {
    activeItem: number;
    setActiveItem: (key: number) => void;
}) => {
    const isMobile = useIsMobile();

    const positionClasses = isMobile
        ? ["before:left-0", "before:left-1/3", "before:left-2/3"]
        : ["lg:before:top-0", "lg:before:top-1/3", "lg:before:top-2/3"];

    return (
        <nav className="scrollbar-thin sticky z-10 top-0 rounded-xl ring-1 ring-zinc-200 dark:ring-zinc-700 scrollbar-thumb-zinc-300 scrollbar-track-transparent h-fit w-full overflow-x-auto bg-white p-2 lg:w-full lg:max-w-60 dark:bg-zinc-900">
            <ul
                className={`${positionClasses[activeItem]} before:bg-accent relative z-10 flex w-max flex-nowrap gap-1 shadow-[0px_4px_59px_-28px_rgba(0,_0,_0,_0.1)] before:absolute before:z-[-1] before:h-11 before:w-40 before:rounded-md before:transition-all before:content-[''] lg:w-full lg:flex-col lg:before:w-full`}
            >
                {SidebarProfileItems.map(({ label, icon }, key) => (
                    <SidebarProfileItem
                        key={key}
                        label={label}
                        Icon={icon}
                        onClick={() => setActiveItem(key)}
                        isActive={activeItem === key}
                    />
                ))}
            </ul>
        </nav>
    );
};
