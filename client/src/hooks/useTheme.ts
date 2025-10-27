import { useEffect, useState } from "react";

export const useTheme = () => {
    const [isDarkTheme, setIsDarkTheme] = useState(localStorage.theme === "dark");

    useEffect(() => {
        localStorage.theme = isDarkTheme ? "dark" : "light";
        verifyTheme();
    }, [isDarkTheme]);

    const verifyTheme = () => {
        document.documentElement.classList.toggle(
            "dark",
            localStorage.theme === "dark" ||
                (!("theme" in localStorage) &&
                    window.matchMedia("(prefers-color-scheme: dark)").matches),
        );
    };

    return { isDarkTheme, setIsDarkTheme, verifyTheme };
};
