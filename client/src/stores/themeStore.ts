import { create } from "zustand";
import { persist } from "zustand/middleware";

type ThemePreference = "system" | "dark" | "light";
type Theme = "dark" | "light";

interface ThemeState {
    preference: ThemePreference;
    theme: Theme;
    setPreference: (preference: ThemePreference) => void;
}

const getSystemTheme = (): Theme => {
    if (typeof window === "undefined") return "light";
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

const resolveTheme = (preference: ThemePreference): Theme => {
    if (preference === "system") {
        return getSystemTheme();
    }
    return preference;
};

export const useThemeStore = create<ThemeState>()(
    persist(
        (set) => ({
            preference: "system",
            theme: getSystemTheme(),

            setPreference: (preference) => {
                const theme = resolveTheme(preference);
                set({ preference, theme });

                document.documentElement.classList.toggle("dark", theme === "dark");
            },
        }),
        {
            name: "theme-storage",
            partialize: (state) => ({ preference: state.preference }),
        },
    ),
);
