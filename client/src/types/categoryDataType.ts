export type ReportCategoryData = {
    _id: string;
    title: string;
    desc: string;
    severity: 1 | 2 | 3 | 4 | 5;
    type: "post" | "comment" | "user";
    createdAt: string;
}