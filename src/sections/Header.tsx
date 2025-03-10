import logo from "../assets/images/logo/logo-light.png";
import { IconMenu2 as Menu } from "@tabler/icons-react";
import { IconX } from "@tabler/icons-react";
import { ButtonPrimary, ButtonSecondary } from "../components/Button";
import { Navbar } from "../components/Navbar";
import { useEffect, useState } from "react";

export const Header = () => {
    const [navOpen, setNavOpen] = useState(false);

    const [hidden, setHidden] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setHidden(window.scrollY > lastScrollY);
            setLastScrollY(window.scrollY);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    return (
        <header className={`h-20 w-full flex items-center fixed left-0 top-0 z-40 transition-transform duration-300 ${hidden ? "-translate-y-full" : "translate-y-0"}`} >
            <div className="lg:grid lg:grid-cols-[1fr_3fr_1fr] lg:gap-4 w-full flex justify-between px-4 lg:px-8">
                {/*
                 ** LOGO **
                 */}
                <h1 className="">
                    <a href="/" className="logo">
                        <img
                            src={logo}
                            alt="PortaVoz"
                            width={100}
                            className="object-contain"
                        />
                    </a>
                </h1>

                {/*
                 ** NAVBAR **
                 */}
                <div className="relative lg:justify-self-center">
                    {/* TOOGLE MENU */}
                    <button
                        className="nav-button"
                        onClick={() => setNavOpen((prev) => !prev)}
                    >
                        {navOpen ? <IconX /> : <Menu />}
                    </button>

                    <Navbar navOpen={navOpen} />
                </div>

                {/*
                 ** BUTTONS **
                 */}

                <div className="max-lg:hidden md:justify-self-end flex items-center gap-2">
                    <ButtonSecondary small={true} path="/login">Cadastro</ButtonSecondary>
                    <ButtonPrimary small={true} path="/login">Entrar</ButtonPrimary>
                </div>
            </div>
        </header>
    );
};
