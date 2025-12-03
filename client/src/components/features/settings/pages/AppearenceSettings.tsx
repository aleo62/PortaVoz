import { useThemeStore } from "@/stores/themeStore";
import { SettingsBlock } from "../components/SettingsBlock";

export const AppearenceSettings = () => {
    const { preference, setPreference } = useThemeStore();

    const themes = [
        {
            key: "system",
            label: "Sistema",
            image: "https://res.cloudinary.com/di5bma0gm/image/upload/v1764531796/Group_15_ivrloa.png",
        },
        {
            key: "light",
            label: "Claro",
            image: "https://res.cloudinary.com/di5bma0gm/image/upload/v1764531768/Group_14_vbtbkr.png",
        },
        {
            key: "dark",
            label: "Escuro",
            image: "https://res.cloudinary.com/di5bma0gm/image/upload/v1764531753/Group_13_nkvnd5.png",
        },
    ] as const;

    return (
        <SettingsBlock
            title="Tema do Dispositivo"
            description="Selecione o tema do seu dispositivo."
        >
            <div className="mt-6 flex flex-wrap items-center justify-between">
                {themes.map((item) => (
                    <button
                        key={item.key}
                        onClick={() => setPreference(item.key)}
                        className={`group relative flex flex-col items-center gap-2 rounded-xl border-2 p-1 transition-all ${
                            preference === item.key
                                ? "bg-zinc-100 dark:bg-zinc-800"
                                : "ring-1 ring-zinc-200 hover:bg-zinc-100 dark:ring-zinc-800 dark:hover:bg-zinc-800"
                        }`}
                    >
                        <div className="xxl:h-48 h-45 rounded-xl bg-zinc-200 dark:bg-zinc-800">
                            <img
                                src={item.image}
                                alt={item.label}
                                className={`h-full rounded-xl transition-all ${
                                    preference !== item.key && "group-hover:scale-101"
                                }`}
                            />
                        </div>
                        <span
                            className={`my-2 text-sm ${
                                preference === item.key ? "text-subtitle" : "text-title"
                            }`}
                        >
                            {item.label}
                        </span>
                    </button>
                ))}
            </div>
        </SettingsBlock>
    );
};
