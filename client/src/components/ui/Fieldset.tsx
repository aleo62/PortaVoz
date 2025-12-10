import { IconCircleCheck, IconCircleX } from "@tabler/icons-react";
import { ElementType, ReactNode } from "react";

type FieldsetProps = {
    children: ReactNode;
    title: string;
    Icon: ElementType;
    ok?: boolean;
};

export const Fieldset = ({ children, title, Icon, ok }: FieldsetProps) => {
    return (
        <div className="rounded-2xl ring-1 ring-zinc-200 dark:ring-zinc-800">
            <header className="font-title text-subtitle flex items-center justify-between p-3 text-lg lg:px-5 lg:text-2xl  ">
                <h2 className="flex items-center gap-3 text-title">
                    <Icon className="size-5.5" /> {title}
                </h2>
                {!ok ? (
                    <IconCircleX className="text-red-500" />
                ) : (
                    <IconCircleCheck className="text-green-500" />
                )}
            </header>

            {children}
        </div>
    );
};
