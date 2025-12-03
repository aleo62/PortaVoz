import { IconAlignBoxCenterTop, IconLayoutGrid, IconRepeat } from "@tabler/icons-react";

type ProfileTabsProps = {
    activeTab: "all" | "posts" | "reposts";
    onTabChange: (tab: "all" | "posts" | "reposts") => void;
};

export const ProfileTabs = ({ activeTab, onTabChange }: ProfileTabsProps) => {
    const tabs = [
        { key: "all" as const, Icon: IconLayoutGrid, label: "Todos" },
        { key: "posts" as const, Icon: IconAlignBoxCenterTop, label: "Posts" },
        { key: "reposts" as const, Icon: IconRepeat, label: "Reposts" },
    ];

    return (
        <div className="border-b border-zinc-200 dark:border-zinc-800 mb-8">
            <div className="mx-auto flex max-w-6xl items-center justify-center gap-0">
                {tabs.map((tab) => (
                    <button
                        key={tab.key}
                        onClick={() => onTabChange(tab.key)}
                        className={`flex flex-1 items-center justify-center gap-2 border-t-2 py-4 transition-all ${
                            activeTab === tab.key
                                ? "text-title"
                                : "text-zinc-400 dark:text-zinc-500 border-transparent hover:bg-zinc-50 dark:hover:bg-zinc-800/50 hover:text-title"
                        }`}
                    >
                        <tab.Icon className="size-5" />
                        <span className="text-sm font-medium max-lg:hidden">{tab.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};
