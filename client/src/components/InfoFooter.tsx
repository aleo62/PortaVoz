import { InfoFooterItems } from "@/utils/data";
import { IconChevronUp } from "@tabler/icons-react";

export const InfoFooter = () => {
    return (
        <footer className="mx-auto flex w-full max-w-screen-2xl flex-col items-center justify-center divide-y divide-zinc-300 px-4">
            <ul className="flex w-full flex-wrap items-center justify-center divide-x divide-zinc-300 pb-3 text-sm font-medium">
                {InfoFooterItems.map(({ label, href }, key) => (
                    <li key={key} className="px-3 first:pl-0 last:pr-0">
                        <a
                            className="text-zinc-600 transition-colors duration-200 hover:text-zinc-900"
                            href={href}
                            key={key}
                        >
                            {label}
                        </a>
                    </li>
                ))}
            </ul>

            <div className="flex w-full flex-wrap items-center justify-between gap-y-2 px-2 py-5 text-sm">
                <div className="text-subtitle">
                    &copy; {new Date().getFullYear()} PortaVoz, por uma{" "}
                    <span className="font-semibold">Piracicaba</span> melhor. Todos os direitos
                    reservados
                </div>

                <div className="text-title flex items-center justify-center gap-1 font-medium">
                    <p>Português - BR</p>
                    <IconChevronUp size={15} />
                </div>
            </div>
        </footer>
    );
};
