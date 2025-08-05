import { Button } from "@/components/general/Button";
import { Navbar } from "@/components/general/Navbar";
import { SearchOverlay } from "@/components/general/SearchOverlay";
import logo from "@assets/images/logo/logo-light.png";
import {
    IconChevronDown,
    IconLanguage,
    IconLogin,
    IconSearch,
    IconTrendingUp,
    IconX,
    IconMenu2 as Menu,
} from "@tabler/icons-react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { AnimatePresence, motion } from "framer-motion";
import hotkeys from "hotkeys-js";
import { useEffect, useState } from "react";

export const Header = ({ search = true }: { search?: boolean }) => {
    const [navOpen, setNavOpen] = useState(false);

    const [hidden, setHidden] = useState(false);
    const [outside, setOutside] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);

    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isLanguageOpen, setIsLanguageOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        /**
         * Handles the window scroll event.
         * Checks if the user is scrolling up or down and sets the state accordingly.
         * Also sets the outside state if the user is scrolling down.
         */
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setOutside(true);
            } else {
                setOutside(false);
            }

            if (window.scrollY > lastScrollY) {
                setHidden(true);
            } else {
                setHidden(false);
            }

            setLastScrollY(window.scrollY);
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    useEffect(() => {
        hotkeys("esc", () => setIsSearchOpen(false));
        hotkeys("esc", () => setIsLanguageOpen(false));

        return () => hotkeys.unbind("esc");
    }, []);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setIsLoggedIn(!!user);
        });

        return () => unsubscribe();
    }, []);

    return (
        <>
            <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

            <header
                className={`header fixed top-0 left-0 z-40 flex h-fit w-full items-center transition-[translate] duration-300 ${hidden ? "-translate-y-[290%]" : "translate-y-0"} ${outside ? "bg-body-background shadow-[0px_4px_46px_-16px_rgba(0,_0,_0,_0.1)]" : "bg-transparent"}`}
            >
                <div className="mx-auto flex w-full max-w-screen-2xl justify-between px-4 py-2 lg:grid lg:grid-cols-[1fr_4fr] lg:gap-4 lg:px-8">
                    {/* LOGO */}
                    <h1 className="font-title flex items-center font-bold">
                        <a href="/" className="logo">
                            <img src={logo} width={80} alt="PortaVoz" />
                        </a>
                    </h1>

                    {/* NAVBAR */}
                    <div className="flex flex-row-reverse items-center justify-center lg:grid lg:grid-cols-[3fr_1fr]">
                        <div className="relative pl-3 lg:justify-self-center lg:pl-0">
                            {/* TOOGLE MENU */}
                            <button
                                className="nav-button"
                                onClick={() => setNavOpen((prev) => !prev)}
                            >
                                {navOpen ? <IconX /> : <Menu />}
                            </button>

                            <Navbar navOpen={navOpen} />
                        </div>

                        {/* BUTTONS AND SEARCH/LANGUAGE */}
                        <div className="flex items-center justify-end">
                            <div className="relative flex items-center gap-4 border-r-2 border-zinc-200 pr-4 dark:border-zinc-700">
                                {search && (
                                    <>
                                        <button
                                            className="text-title hover:text-zinc-900"
                                            onClick={() => setIsSearchOpen(true)}
                                        >
                                            <IconSearch className="" />
                                        </button>
                                    </>
                                )}

                                <button
                                    className="text-title flex items-center justify-center hover:text-zinc-900"
                                    onClick={() => setIsLanguageOpen((prev) => !prev)}
                                >
                                    <IconLanguage className="" />
                                    <IconChevronDown width={15} />
                                </button>

                                <AnimatePresence>
                                    {isLanguageOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            transition={{ duration: 0.15 }}
                                            className="bg-body-background text-subtitle absolute top-10 right-0 z-10 grid w-fit origin-top gap-2 rounded-lg p-4 font-medium inset-ring-2 inset-ring-zinc-300/20"
                                        >
                                            <div className="bg-accent w-45 cursor-pointer rounded-lg p-2 text-white">
                                                Português - BR
                                            </div>
                                            <div className="w-45 cursor-pointer rounded-lg p-2">
                                                English - USA
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            <div className="flex items-center gap-2 pl-4 max-lg:hidden md:justify-self-end">
                                {isLoggedIn ? (
                                    <>
                                        <Button
                                            styleType="primary"
                                            small={true}
                                            text="Começar"
                                            Icon={IconTrendingUp}
                                            path="/login"
                                        />
                                    </>
                                ) : (
                                    <>
                                        <Button
                                            styleType="secondary"
                                            small={true}
                                            text="Cadastrar"
                                            path="/register"
                                        />
                                        <Button
                                            styleType="primary"
                                            small={true}
                                            text="Entrar"
                                            Icon={IconLogin}
                                            path="/login"
                                        />
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
};
