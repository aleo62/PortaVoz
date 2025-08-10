import { IconX } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { useState } from "react";

export const AlertCPF = () => {
    const [hasSeenCpfWarning, setHasSeenCpfWarning] = useState(
        localStorage.getItem("cpfWarning") === "true" ? true : false,
    );

    return (
        <motion.div
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={`fixed top-0 left-0 z-100 flex h-full w-full items-center justify-center bg-white/50 backdrop-blur-3xl dark:bg-zinc-950/50 ${hasSeenCpfWarning ? "hidden" : ""}`}
        >
            <div
                onClick={() => {setHasSeenCpfWarning(true), localStorage.setItem("cpfWarning", "true")}}
                className="absolute top-3 right-3 cursor-pointer rounded-full bg-zinc-100 p-2 ring-1 ring-zinc-300 dark:bg-zinc-950"
            >
                <IconX size={20} />
            </div>
            <div>
                Percebemos que você não tem CPF cadastrado, por favor, cadastre para continuar.
            </div>
        </motion.div>
    );
};
