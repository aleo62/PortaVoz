import { NavItems } from '../utils/data';

type NavbarProps = {
    navOpen: boolean;
};

export const Navbar = ({ navOpen }: NavbarProps) => {
    return (
        <nav className={'navbar' + (navOpen ? ' active' : '')}>
            {NavItems.map(({ label, className }, key) => (
                <a className={'nav-link ' + className} href="" key={key}>
                    {label}
                </a>
            ))}
        </nav>
    );
};
