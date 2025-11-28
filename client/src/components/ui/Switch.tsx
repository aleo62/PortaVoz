import { motion } from "framer-motion";

type SwitchProps = {
    checked: boolean;
    onChange: (checked: boolean) => void;
};

export const Switch = ({ checked, onChange }: SwitchProps) => {
    return (
        <div
            onClick={() => onChange(!checked)}
            className={`flex h-6 w-11 cursor-pointer rounded-full p-1 transition-colors ${
                checked ? "bg-accent" : "bg-zinc-200 dark:bg-zinc-700"
            }`}
        >
            <motion.div
                layout
                transition={{ type: "spring", stiffness: 700, damping: 30 }}
                className={`h-4 w-4 rounded-full bg-white shadow-sm`}
                animate={{ x: checked ? 20 : 0 }}
            />
        </div>
    );
};
