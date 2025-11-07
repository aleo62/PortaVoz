import { SearchModal } from "@/components/modal/SearchModal";
import { Button } from "@/components/ui/Button";
import { Navbar } from "@/components/ui/Navbar";
import { portaVozLogo } from "@/data/data";
import { useTheme } from "@/hooks/useTheme";
import { useStoreUser } from "@/stores/userStore";
import { IconLogin, IconMoon, IconSun, IconTrendingUp } from "@tabler/icons-react";
import { useEffect, useState } from "react";

export const Header = () => {
    const { user } = useStoreUser();
    const [hidden, setHidden] = useState(false);
    const [outside, setOutside] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);
    const { isDarkTheme, setIsDarkTheme } = useTheme();

    useEffect(() => {
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

    return (
        <>
            

            <header
                className={`header fixed top-0 left-0 z-40 flex h-fit w-full items-center transition-[translate] duration-300 ${hidden ? "-translate-y-[290%]" : "translate-y-0"} ${outside ? "bg-body-background shadow-[0px_4px_46px_-16px_rgba(0,_0,_0,_0.1)]" : "bg-transparent"}`}
            >
                <div className="mx-auto flex w-full max-w-screen-2xl justify-between px-4 py-2 lg:grid lg:grid-cols-[1fr_4fr] lg:gap-4 lg:px-8">
                    <h1 className="font-title flex items-center font-bold">
                        <a href="/" className="logo">
                            <img src={portaVozLogo(isDarkTheme)} width={90} alt="PortaVoz" />
                        </a>
                    </h1>

                    <div className="flex flex-row-reverse items-center justify-center lg:grid lg:grid-cols-[3fr_1fr]">
                        <div className="relative pl-3 max-lg:flex max-lg:items-center lg:pl-0">
                            <Navbar />
                        </div>

                        <div className="flex items-center justify-end">
                            <div className="relative flex items-center gap-4 border-r-2 border-zinc-200 pr-4 dark:border-zinc-700">
                                <button
                                    className="text-title hover:dark:text-subtitle hover:text-zinc-900"
                                    onClick={() => setIsDarkTheme(!isDarkTheme)}
                                >
                                    {isDarkTheme ? (
                                        <IconSun className="" />
                                    ) : (
                                        <IconMoon className="" />
                                    )}
                                </button>
                            </div>

                            <div className="flex items-center gap-2 pl-4 max-lg:hidden md:justify-self-end">
                                {!user ? (
                                    <>
                                        <Button
                                            styleType="secondary"
                                            size="small"
                                            text="Cadastrar"
                                            path="/auth/register"
                                        />
                                        <Button
                                            styleType="primary"
                                            size="small"
                                            text="Entrar"
                                            Icon={IconLogin}
                                            path="/auth/login"
                                        />
                                    </>
                                ) : (
                                    <>
                                        <Button
                                            styleType="primary"
                                            size="small"
                                            text="Começar"
                                            Icon={IconTrendingUp}
                                            path="/auth/login"
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
