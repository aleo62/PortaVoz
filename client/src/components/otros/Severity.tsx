import { SeverityClassNames } from "@/utils/data";

export const Severity = ({ severity }: { severity: string }) => {

    return <span className={`text-subtitle p-2 text-sm font-normal ${SeverityClassNames[severity]}`}>{severity}</span>;
};
