import logo from '../assets/images/logo/logo-light.png';
import { IconMenu2 as Menu } from '@tabler/icons-react';
import { IconX } from '@tabler/icons-react';
import { ButtonPrimary, ButtonSecondary } from '../components/Button';
import { Navbar } from '../components/Navbar';
import { useEffect, useState } from 'react';

export const Header = () => {
    const [navOpen, setNavOpen] = useState(false);

    const [hidden, setHidden] = useState(false);
    const [outside, setOutside] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);

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

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    return (
        <header
            className={`fixed top-0 left-0 z-40 flex h-20 w-full items-center transition-all duration-300 ${hidden ? '-translate-y-full' : 'translate-y-0'} ${outside ? 'bg-gradient-to-b from-white/60 to-white/0' : 'bg-transparent'}`}
        >
            <div className="flex w-full justify-between px-4 lg:grid lg:grid-cols-[1fr_3fr_1fr] lg:gap-4 lg:px-8">
                {/*
                 ** LOGO **
                 */}
                <h1 className="flex items-center">
                    <a href="/" className="logo">
                        <img src={logo} alt="PortaVoz" width={90} className="object-contain" />
                    </a>
                </h1>

                {/*
                 ** NAVBAR **
                 */}
                <div className="relative lg:justify-self-center">
                    {/* TOOGLE MENU */}
                    <button className="nav-button" onClick={() => setNavOpen((prev) => !prev)}>
                        {navOpen ? <IconX /> : <Menu />}
                    </button>

                    <Navbar navOpen={navOpen} />
                </div>

                {/*
                 ** BUTTONS **
                 */}

                <div className="flex items-center gap-2 max-lg:hidden md:justify-self-end">
                    <ButtonSecondary small={true} path="/register">
                        Cadastro
                    </ButtonSecondary>
                    <ButtonPrimary small={true} path="/login">
                        Entrar
                    </ButtonPrimary>
                </div>
            </div>
        </header>
    );
};
