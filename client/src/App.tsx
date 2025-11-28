import { useTheme } from "@/hooks/useTheme";
import { BrowserRouter as Router } from "react-router-dom";
import { Providers } from "./app/Providers";
import { AppRoutes } from "./app/Routes";
import { useInitUser } from "./hooks/useInitUser";

function App() {
    const { verifyTheme } = useTheme();

    useInitUser();
    verifyTheme();
    return (
        <Router>
            <Providers>
                <AppRoutes />
            </Providers>
        </Router>
    );
}

export default App;
