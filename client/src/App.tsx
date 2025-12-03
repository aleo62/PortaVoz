import { BrowserRouter as Router } from "react-router-dom";
import { Providers } from "./app/Providers";
import { AppRoutes } from "./app/Routes";
import { useInitTheme } from "./hooks/useInitTheme";
import { useInitUser } from "./hooks/useInitUser";

function App() {
    useInitUser();
    useInitTheme();
    return (
        <Router>
            <Providers>
                <AppRoutes />
            </Providers>
        </Router>
    );
}

export default App;
