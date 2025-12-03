import { useEffect } from "react";
import { useThemeStore } from "../stores/themeStore";


export const useInitTheme = () => {
    const { preference, setPreference } = useThemeStore();

    useEffect(() => {
        setPreference(preference);
    }, []);
};
