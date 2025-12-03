import { SettingsPages } from "@/constants/settings";
import { useModal } from "@/contexts/ModalContext";
import { ModalProvider } from "@/contexts/ModalProvider";

export const SettingsContent = ({
    title,
    active,
}: {
    title: string;
    active: keyof typeof SettingsPages | "";
}) => {
    const Component = active ? SettingsPages[active] : null;

    return (
        Component && (
            <section className="flex h-full flex-col overflow-hidden">
                <header className="flex items-center justify-between border-b-1 border-zinc-200 p-3 dark:border-zinc-800">
                    <h2 className="text-title font-title text-2xl"> {title}</h2>
                    <ModalProvider.Close />
                </header>
                <main className="w-full flex-1 overflow-y-auto rounded-xl bg-white p-3 dark:bg-zinc-900">
                    <Component />
                </main>
            </section>
        )
    );
};
