import { RoutesPath } from "@/app/Routes";
import { NavItems } from "@/constants/home";
import { portaVozLogo } from "@/constants/system";
import { useThemeStore } from "@/stores/themeStore";
import { useStoreUser } from "@/stores/userStore";
import { Button } from "@components/ui/Button";
import { IconArrowRight, IconChevronRight, IconX } from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";

export const LandingHeaderMenu = ({
    isOpen,
    onClose,
}: {
    isOpen: boolean;
    onClose: () => void;
}) => {
    const navigate = useNavigate();
    const { user } = useStoreUser();
    const { theme } = useThemeStore();

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed top-0 left-0 z-50 flex h-screen w-screen flex-col bg-white/90 backdrop-blur-[2px] dark:bg-zinc-900/90"
                >
                    <h1 className="p-5">
                        <img
                            src={portaVozLogo(theme === "dark", true)}
                            alt="PortaVoz"
                            className="w-10"
                        />
                    </h1>
                    <IconX
                        onClick={onClose}
                        className="text-title absolute top-5 right-5 cursor-pointer"
                    />

                    <motion.ul
                        initial={{ translateY: -20 }}
                        animate={{ translateY: 0 }}
                        exit={{ translateY: -20 }}
                        transition={{ duration: 0.5 }}
                        className="text-title mx-auto flex w-full max-w-xs flex-col justify-center"
                    >
                        {NavItems.map((item, index) => (
                            <li
                                key={index}
                                className="flex w-full items-center justify-between py-5 text-xl"
                                onClick={() => navigate(item.href)}
                            >
                                {item.label}
                                <IconChevronRight />
                            </li>
                        ))}
                        <li className="mt-5">
                            <Button
                                styleType="primary"
                                text={!!user ? "Começar" : "Entrar"}
                                onClick={() => navigate(RoutesPath("Login")!)}
                                Icon={IconArrowRight}
                                size="small"
                            />
                        </li>
                    </motion.ul>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body,
    );
};
