console.warn = () => {};

import App from "@/App.tsx";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "react-toastify/dist/ReactToastify.css";
import "leaflet/dist/leaflet.css";
import "@/index.css";

const root = createRoot(document.getElementById("root")!);

window.addEventListener("load", () => {
    root.render(
        <StrictMode>
            <App />
        </StrictMode>,
    );
});
