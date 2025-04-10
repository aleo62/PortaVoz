import logo from "@assets/images/logo/logo-light.png";
export const Footer = () => {
    return (
        <footer className="bg-secondary w-full">
            <div className="mx-auto flex w-full max-w-screen-2xl justify-between px-4 lg:grid lg:grid-cols-[1fr_3fr] lg:gap-4 lg:px-8">
                <img src={logo} alt="" />
            </div>
        </footer>
    );
};
