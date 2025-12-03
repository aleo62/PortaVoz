import { ReportCategoryData } from "./categoryDataType";

export interface ReportData{
    _id: string;
    category: Pick<ReportCategoryData, "_id" | "title" | "severity">;
    user: string;
    reportedItemType: "post" | "user" | "comment";
    reportedItemId: string;
    desc: string;
    status: "pending" | "reviewed" | "resolved" | "dismissed";
}

export interface RequestReportData{
    category: string;
    reportedItemType: "post" | "user" | "comment";
    reportedItemId: string;
    desc: string;
}
