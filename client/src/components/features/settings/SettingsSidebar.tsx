import { SettingsItems } from "@/constants/settings";
import { ModalProvider } from "@/contexts/ModalProvider";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useStoreUser } from "@/stores/userStore";
import { IconChevronRight, IconSearch } from "@tabler/icons-react";
import { SettingsSidebarItem } from "./components/SettingsSidebarItem";

export const SettingsSidebar = ({
    active,
    setActive,
}: {
    active: string;
    setActive: (key: string) => void;
}) => {
    const { user } = useStoreUser();

    return (
        <aside
            className={`bg-body-background h-full w-full border-r-1 border-zinc-200 px-2 py-4 dark:border-zinc-800 ${active && "max-lg:hidden"}`}
        >
            {useIsMobile() && <ModalProvider.Close />}

            <div className="flex items-center gap-2 rounded-xl bg-white p-2 ring-1 ring-zinc-200 dark:bg-zinc-900 dark:ring-zinc-800">
                <img className="size-11 rounded-full object-cover" src={user?.image} alt="" />
                <div className="flex-1">
                    <h2 className="text-title text-md">{user?.username}</h2>
                    <p className="text-subtitle w-30 truncate text-xs">{user?.email}</p>
                </div>
                <div className="text-subtitle flex items-center">
                    <IconChevronRight className="size-5" />
                </div>
            </div>
            <div className="mt-3 flex w-full items-center gap-1 rounded-xl bg-white px-3 shadow-2xs ring-1 ring-zinc-200 dark:bg-zinc-900 dark:ring-zinc-800">
                <IconSearch className="text-title mr-2 size-4.5" />
                <input
                    type="text"
                    className="text-subtitle flex-1 border-none py-3 text-sm outline-none"
                    placeholder="Pesquise algum item"
                />
            </div>

            <nav className="mt-4 border-t-1 border-zinc-200 pt-4 dark:border-zinc-800">
                <ul>
                    {SettingsItems.map((item) => (
                        <SettingsSidebarItem
                            key={item.key}
                            item={item}
                            onClick={setActive}
                            isActive={item.key === active}
                        />
                    ))}
                </ul>
            </nav>
        </aside>
    );
};
