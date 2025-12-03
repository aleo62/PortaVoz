import { NavItems } from "@/constants/home";
import { IconMenu, IconX } from "@tabler/icons-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LandingHeaderMenu } from "./LandingHeaderMenu";

export const LandingHeaderNavbar = () => {
    const navigate = useNavigate();
    const [navOpen, setNavOpen] = useState(false);

    return (
        <>
            <LandingHeaderMenu isOpen={navOpen} onClose={() => setNavOpen(!navOpen)} />
            <button
                className="bg-accent flex h-9 w-9 items-center justify-center rounded-lg text-white ring-1 ring-zinc-200 lg:hidden dark:ring-zinc-700"
                onClick={() => setNavOpen((prev) => !prev)}
            >
                {navOpen ? <IconX /> : <IconMenu />}
            </button>

            <nav>
                <ul className="text-title flex items-center justify-center gap-10 pl-3 max-lg:hidden lg:pl-0">
                    {NavItems.map((item) => (
                        <li key={item.label}>
                            <a
                                className="hover:dark:text-subtitle text-md cursor-pointer font-medium hover:text-zinc-900"
                                onClick={() => navigate(item.href)}
                            >
                                {item.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </>
    );
};
