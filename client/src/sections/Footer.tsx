import { NavItems } from "@/data/data";
import logo from "@assets/images/logo/logo-light.png";
import { IconSearch } from "@tabler/icons-react";
export const Footer = () => {
    return (
        <footer className="w-full bg-white">
            <div className="mx-auto w-full max-w-screen-2xl px-4 lg:px-10">
                <div className="flex flex-col gap-10 py-15 lg:grid lg:grid-cols-[0.3fr_2fr_2fr] lg:items-center lg:gap-4">
                    <figure>
                        <img src={logo} alt="" width={100} />
                    </figure>

                    <nav className="flex flex-col gap-10 md:flex-row lg:ml-4">
                        {NavItems.map(({ label }, key) => (
                            <a
                                className="text-subtitle hover:text-title font-semibold uppercase"
                                href=""
                                key={key}
                            >
                                {label}
                            </a>
                        ))}
                    </nav>

                    <div className="grid items-center lg:justify-end">
                        <div className="flex h-fit w-full max-w-100 items-center justify-between rounded-md pr-4 ring-1 ring-zinc-200">
                            <input
                                type="text"
                                className="max-w-90 py-3 pl-4 outline-0"
                                placeholder="Pesquisar..."
                            />
                            <IconSearch className="size-5" />
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-center border-t border-zinc-300 py-9">
                    <p className="bg-zinc-300/50 px-2 py-2 text-sm font-medium text-zinc-700">
                        © 2025 PortaVoz, por uma <span className="font-semibold">Piracicaba</span>{" "}
                        melhor. Todos Direitos Reservados
                    </p>
                </div>
            </div>
        </footer>
    );
};
