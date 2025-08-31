import { useIsMobile } from "@/utils/isMobile";
import { IconMenu, IconX } from "@tabler/icons-react";
import { NavItems } from "@utils/data";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HeaderDrop } from "../drop/HeaderDrop";

export const Navbar = () => {
    const isMobile = useIsMobile();
    const navigate = useNavigate();
    const [navOpen, setNavOpen] = useState(false);
    return isMobile ? (
        <>
            <button
                className="bg-accent relative flex h-9 w-9 items-center justify-center rounded-lg text-white ring-1 ring-zinc-200 dark:ring-zinc-700"
                onClick={() => setNavOpen((prev) => !prev)}
            >
                {navOpen ? <IconX /> : <IconMenu />}
            </button>
            <HeaderDrop isOpen={navOpen} orientation="top" onClose={() => setNavOpen(!navOpen)} />
        </>
    ) : (
        <nav>
            <ul className="text-title flex items-center justify-center gap-10">
                {NavItems.map((item) => (
                    <li>
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
    );
};
