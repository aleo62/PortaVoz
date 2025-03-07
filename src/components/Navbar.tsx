type NavbarProps = {
    navOpen: boolean;
}

export const Navbar = ({ navOpen }: NavbarProps) => {
    const items = [
        { label: "Início" },
        { label: "Denúncias" },
        { label: "Sobre" },
        { label: "FAQ" },
    ];

    return (
        <nav className={'navbar' + (navOpen ? ' active' : '')}>
            {items.map(({ label }, key) => (
                <a className="nav-link" href="" key={key}>
                    {label}
                </a>
            ))}
        </nav>
    );
};
