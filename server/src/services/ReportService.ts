import Report from "@/models/Report.model";

export type ReportListType = "all" | "post" | "comment" | "user";
export const getReportsService = async (type: ReportListType, page: number, limit: number) => {
    let findFilter = {};
    if (type !== "all") findFilter = { reportedItemType: type };

    const reports = await Report.find(findFilter).populate("user", "username image").populate("category", "title severity");
    const count = await Report.countDocuments(findFilter);
    return { reports, count };
};
