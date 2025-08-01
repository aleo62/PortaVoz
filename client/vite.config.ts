import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), , tailwindcss()],
    resolve: {
        alias: {
            "@tabler/icons-react": "@tabler/icons-react/dist/esm/icons/index.mjs",
            "@": path.resolve(__dirname, "./src"),
            "@utils": path.resolve(__dirname, "./src/utils"),
            "@components": path.resolve(__dirname, "./src/components"),
            "@assets": path.resolve(__dirname, "./src/assets"),
            "@pages": path.resolve(__dirname, "./src/pages"),
            "@contexts": path.resolve(__dirname, "./src/contexts"),
            "@api": path.resolve(__dirname, "./src/api"),
            "@hooks": path.resolve(__dirname, "./src/hooks"),
        },
    },
});
