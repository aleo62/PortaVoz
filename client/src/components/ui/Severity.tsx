import { SeverityClassNames } from "@/utils/data";

export const Severity = ({ severity }: { severity: string }) => {

    return <span className={`p-2 px-3 text-[.85rem] rounded-xl inset-ring-2 font-medium ${SeverityClassNames[severity]}`}>{severity}</span>;
};
