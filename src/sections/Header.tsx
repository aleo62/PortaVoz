import logo from "../assets/images/logo/logo-light.png";
import { IconMenu2 as Menu } from "@tabler/icons-react";
import { IconX } from "@tabler/icons-react";
import { ButtonPrimary, ButtonSecondary } from "../components/Button";
import { Navbar } from "../components/Navbar";
import { useState } from "react";

export const Header = () => {
    const [navOpen, setNavOpen] = useState(false);

    return (
        <header className="h-20 w-full flex items-center fixed left-0 top-0">
            <div className="max-w-screen-2xl w-full mx-auto px-6 flex justify-between items-center md:px-8 md:grid md:grid-cols-3">
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
                <div className="relative md:justify-self-center">
                    {/* TOOGLE MENU */}
                    <button className="nav-button" onClick={ () => setNavOpen(prev => !prev) }>
                        {navOpen ? <IconX /> : <Menu />}
                    </button>

                    <Navbar navOpen={navOpen} />
                </div>

                {/*
                 ** BUTTONS **
                 */}

                <div className="max-md:hidden md:justify-self-end flex items-center gap-2">
                    <ButtonSecondary small={true}>
                        Cadastrar-se
                    </ButtonSecondary>
                    <ButtonPrimary small={true}>
                        Entrar
                    </ButtonPrimary>
                </div>
            </div>
        </header>
    );
};
