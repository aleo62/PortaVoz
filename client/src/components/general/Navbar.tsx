import { NavItems } from "@utils/data";

type NavbarProps = {
    navOpen?: boolean;
};

/**
 * The main navbar component, containing the links to the sections.
 * The links are conditionally rendered based on the `navOpen` prop.
 * The component is responsive and will be hidden on mobile devices when `navOpen` is false.
 *
 * @param {NavbarProps} props - The component props.
 * @param {boolean} [props.navOpen=false] - Whether or not to show the navbar.
 * @returns {JSX.Element} - The navbar component.
 */
export const Navbar = ({ navOpen }: NavbarProps) => {
    return (
        <nav className={"navbar" + (navOpen ? " active" : "")}>
            {NavItems.map(({ label }, key) => (
                <a className={"nav-link"} href="" key={key}>
                    {label}
                </a>
            ))}

            <a href="" className="nav-link menu-btn">
                Entrar
            </a>
        </nav>
    );
};
