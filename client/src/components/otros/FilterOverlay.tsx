import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { RadioButton } from "../general/RadioButton";

type FilterOverlayProps = {
    isContainerOpen: boolean;
    orientation: "top" | "bottom";
    onClose: () => void;
    toggleRef: React.RefObject<HTMLDivElement>;
};

export const FilterOverlay = ({
    isContainerOpen,
    orientation,
    onClose,
    toggleRef,
}: FilterOverlayProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [selected, setSelected] = useState("opcao1");

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                (containerRef.current && !containerRef.current.contains(event.target as Node)) ||
                (toggleRef.current && !toggleRef.current.contains(event.target as Node))
            ) {
                onClose();
            }
        };
        if (isContainerOpen) document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isContainerOpen, onClose]);

    return (
        <AnimatePresence>
            {isContainerOpen && (
                <motion.div
                    ref={containerRef}
                    initial={{
                        opacity: 0,
                        scale: 0.95,
                        y: orientation === "top" ? -20 : 20,
                    }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                        y: 0,
                    }}
                    exit={{
                        opacity: 0,
                        scale: 0.95,
                        y: orientation === "top" ? -20 : 20,
                    }}
                    transition={{ duration: 0.15 }}
                    className={`text-subtitle absolute w-fit bg-white p-2 dark:bg-zinc-900 ${orientation}-[110%] right-0 z-10 grid gap-2 rounded-lg p-1 font-normal ring-1 ring-zinc-200 dark:ring-zinc-700`}
                >
                    <nav className="divide-y-1 divide-zinc-100 dark:divide-zinc-700">
                        <ul className="text-title flex flex-col py-1 text-sm">
                            <RadioButton
                                name="example"
                                value="opcao1"
                                label="Opção Azul"
                                checked={selected === "opcao1"}
                                onChange={setSelected}
                                checkedColor="bg-blue-500"
                                borderColor="border-blue-400"
                                size="w-6 h-6"
                            />
                        </ul>
                        <ul className="text-title flex flex-col py-1 text-sm">
                            <RadioButton
                                name="example"
                                value="opcao2"
                                label="Opção Azul"
                                checked={selected === "opcao2"}
                                onChange={setSelected}
                                checkedColor="bg-blue-500"
                                borderColor="border-blue-400"
                                size="w-6 h-6"
                            />
                        </ul>
                        <ul className="text-title flex flex-col py-1 text-sm">
                            <RadioButton
                                name="example"
                                value="opcao3"
                                label="Opção Azul"
                                checked={selected === "opcao3"}
                                onChange={setSelected}
                                checkedColor="bg-blue-500"
                                borderColor="border-blue-400"
                                size="w-6 h-6"
                            />
                        </ul>
                    </nav>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
