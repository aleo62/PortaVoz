import { NavItems } from "@utils/data";

import { IconSearch } from "@tabler/icons-react";

type NavbarProps = {
    navOpen: boolean;
};

export const Navbar = ({ navOpen }: NavbarProps) => {
    return (
        <nav className={"navbar" + (navOpen ? " active" : "")}>
            {NavItems.map(({ label, className }, key) => (
                <a className={"nav-link " + className} href="" key={key}>
                    {label}
                </a>
            ))}

            <a href="" className="hidden lg:block text-subtitle">
                <IconSearch className=""/>    
            </a>
        </nav>
    );
};
