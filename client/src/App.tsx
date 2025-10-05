import { useEffect } from "react";

import { useTheme } from "@/hooks/useTheme";

import { useAutoLogout } from "@/hooks/useLogoutTime";
import { Providers } from "./app/Providers";
import { AppRoutes } from "./app/Routes";
function App() {
    const { verifyTheme } = useTheme();

    useAutoLogout();
    verifyTheme();

    useEffect(() => {
        const message = () => {
            console.log("%cE aí curioso!", "font-weight: bold ;font-size: 20px");
            console.log(
                "%cSe liga, esse é o nosso repositorio: https://github.com/aleo62/Portavoz",
                "font-weight: bold ;font-size: 12px",
            );
        };
        message();
    }, []);

    return (
        <Providers>
            <AppRoutes />
        </Providers>
    );
}

export default App;
