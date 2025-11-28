import { SettingsPages } from "@/constants/settings";

export const SettingsSidebarItem = ({
    item,
    onClick,
    isActive,
}: {
    item: any;
    onClick: (key: keyof typeof SettingsPages) => void;
    isActive: boolean;
}) => {
    return (
        <li key={item.key}>
            <button
                className={`text-subtitle flex w-full items-center gap-2 rounded-xl p-3 px-2 transition ${isActive ? "text-title bg-zinc-200 dark:bg-zinc-800" : "hover:text-title hover:bg-zinc-100 dark:hover:bg-zinc-900"}`}
                onClick={() => onClick(item.key)}
            >
                <item.Icon className="size-5" />
                <span className="text-sm">{item.label}</span>
            </button>
        </li>
    );
};
