import { SeverityClassNames } from "@/data/data";

export const Severity = ({ severity }: { severity: string }) => {
    return (
        <span
            className={`rounded-xl p-2 px-3 text-[.85rem] font-medium inset-ring-2 ${SeverityClassNames[severity]}`}
        >
            {severity}
        </span>
    );
};
