export interface ReportData{
    _id: string;
    category: string;
    user: string;
    reportedItemType: "post" | "user" | "comment";
    reportedItemId: string;
    desc: string;
    status: "pending" | "reviewed" | "resolved" | "dismissed";
}

export interface RequestReportData{
    category: string;
    user: string;
    reportedItemType: "post" | "user" | "comment";
    reportedItemId: string;
    desc: string;
    status: "pending" | "reviewed" | "resolved" | "dismissed";
}
