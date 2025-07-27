console.warn = () => {};

import App from "@/App.tsx";
import "@/index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "react-toastify/dist/ReactToastify.css";

const root = createRoot(document.getElementById("root")!);

window.addEventListener("load", () => {
    root.render(
        <StrictMode>
            <App />
        </StrictMode>,
    );
});
