import { portaVozLogo } from "@/constants/system";
import { useThemeStore } from "@/stores/themeStore";
import { useStoreUser } from "@/stores/userStore";
import { LandingHeaderNavbar } from "@components/features/landing/LandingHeaderNavbar";
import { Button } from "@components/ui/Button";
import { IconLogin, IconTrendingUp } from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";

export const Header = () => {
    const { user } = useStoreUser();
    const [hidden, setHidden] = useState(false);
    const lastScrollY = useRef(0);
    const { theme } = useThemeStore();

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > lastScrollY.current) {
                setHidden(true);
            } else {
                setHidden(false);
            }

            lastScrollY.current = currentScrollY;
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <header
                className={`header fixed top-0 left-0 z-40 flex h-fit w-full items-center transition-[translate] duration-300 ${hidden ? "-translate-y-[290%]" : "translate-y-0"} `}
            >
                <div className="mx-auto flex w-full justify-between px-4 py-2 lg:grid lg:grid-cols-[1fr_4fr] lg:gap-4 lg:px-8">
                    <h1 className="font-title flex items-center font-bold">
                        <a href="/" className="logo">
                            <img src={portaVozLogo(theme === "dark")} width={90} alt="PortaVoz" />
                        </a>
                    </h1>

                    <div className="flex flex-row-reverse items-center justify-center lg:grid lg:grid-cols-[3fr_1fr]">
                        <LandingHeaderNavbar />
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
            </header>
        </>
    );
};
