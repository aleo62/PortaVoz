import { useState } from "react";
import { DropdownTemplate, DropdownTemplateProps } from "../templates/DropdownTemplate";
import { RadioButton } from "../ui/RadioButton";

export const FilterDrop = ({ isOpen, orientation, onClose }: DropdownTemplateProps) => {
    const [selected, setSelected] = useState("desc");

    return (
        <DropdownTemplate isOpen={isOpen} onClose={onClose} orientation={orientation}>
            <nav className="divide-y-1 divide-zinc-100 dark:divide-zinc-700 p-1">
                <ul className="text-title flex flex-col py-3 pt-2 text-sm w-30 gap-3">
                    <RadioButton
                        name="example"
                        value="desc"
                        label="Mais antigos"
                        checked={selected === "desc"}
                        onChange={setSelected}
                        checkedColor="bg-blue-500"
                        borderColor="border-blue-400"
                        size="w-5 h-5"
                    />
                    <RadioButton
                        name="example"
                        value="opcao2"
                        label="Opção Azul"
                        checked={selected === "opcao2"}
                        onChange={setSelected}
                        checkedColor="bg-blue-500"
                        borderColor="border-blue-400"
                        size="w-5 h-5"
                    />
                    <RadioButton
                        name="example"
                        value="opcao2"
                        label="Opção Azul"
                        checked={selected === "opcao2"}
                        onChange={setSelected}
                        checkedColor="bg-blue-500"
                        borderColor="border-blue-400"
                        size="w-5 h-5"
                    />
                </ul>
                <ul className="text-title flex flex-col py-1 text-sm">
                    
                </ul>
                
            </nav>
        </DropdownTemplate>
    );
};
