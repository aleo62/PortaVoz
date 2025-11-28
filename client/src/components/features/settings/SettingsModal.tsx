import { motion } from "framer-motion";

import { SettingsItems, SettingsPages } from "@/constants/settings";
import { ModalDefaultProps } from "@/contexts/ModalContext";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useState } from "react";
import { SettingsContent } from "./SettingsContent";
import { SettingsSidebar } from "./SettingsSidebar";

export const SettingsModal = ({ zIndex }: ModalDefaultProps) => {
    const [active, setActive] = useState(useIsMobile() ? "" : "profile");

    return (
        <>
            <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                transition={{ duration: 0.1 }}
                className="grid h-full w-full max-w-7xl overflow-hidden bg-white ring-1 ring-zinc-200 lg:grid-cols-[1fr_7fr] lg:rounded-2xl dark:bg-zinc-900 dark:ring-zinc-800"
                style={{ zIndex }}
            >
                <SettingsSidebar active={active!} setActive={setActive} />
                <SettingsContent
                    title={SettingsItems.find((item) => item.key === active)?.label || ""}
                    active={active as keyof typeof SettingsPages | ""}
                />
            </motion.div>
        </>
    );
};
