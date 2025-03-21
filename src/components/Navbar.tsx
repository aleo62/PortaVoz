type NavbarProps = {
    navOpen: boolean;
}

export const Navbar = ({ navOpen }: NavbarProps) => {
    const NavItems = [
        { label: "Início" },
        { label: "Denúncias" },
        { label: "Sobre" },
        { label: "FAQ" },
        { label: "Entrar", className: "menu-btn" },
    ];

    return (
        <nav className={'navbar' + (navOpen ? ' active' : '')}>
            {NavItems.map(({ label, className }, key) => (
                <a className={"nav-link " + className} href="" key={key}>
                    {label}
                </a>
            ))}
        </nav>
    );
};
