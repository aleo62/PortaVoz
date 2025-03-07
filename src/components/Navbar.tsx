type NavbarProps = {
    navOpen: boolean;
}

export const Navbar = ({ navOpen }: NavbarProps) => {
    const items = [
        { label: "Início" },
        { label: "Denúncias" },
        { label: "Sobre" },
        { label: "FAQ" },
        { label: "Entrar", className: "menu-btn" },
    ];

    return (
        <nav className={'navbar' + (navOpen ? ' active' : '')}>
            {items.map(({ label, className }, key) => (
                <a className={"nav-link " + className} href="" key={key}>
                    {label}
                </a>
            ))}
        </nav>
    );
};
