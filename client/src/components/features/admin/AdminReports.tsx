import { useModal } from "@/contexts/ModalContext";
import { useDeleteReport } from "@/hooks/report/useDeleteReport";
import { useReports } from "@/hooks/report/useReports";
import { ReportData } from "@/types/reportDataType";
import { IconAlertCircle, IconEdit, IconTrash } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

export const AdminReports = () => {
    const { data: reportsData, isLoading } = useReports();
    const { mutate: deleteReport } = useDeleteReport();
    const { openModal } = useModal();
    const navigate = useNavigate();
    const reports = (reportsData?.pages.flatMap((page) => page.reports) || []) as ReportData[];

    const handleDelete = (reportId: string) => {
        if (confirm("Are you sure you want to delete this report?")) {
            deleteReport(reportId);
        }
    };

    const handleEdit = (report: ReportData) => {
        openModal("updateReportStatus", { report });
    };

    const handleClick = (report: ReportData) => {
        switch (report.reportedItemType) {
            case "post":
                navigate(`/post/${report.reportedItemId}`);
                break;
            case "user":
                navigate(`/profile/${report.reportedItemId}`);
                break;
        }
    };

    return (
        <div className="flex-1 overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
            {/* Desktop Table View */}
            <div className="hidden md:block">
                <table className="w-full text-left text-sm">
                    <thead className="bg-zinc-50 text-zinc-500 dark:bg-zinc-800/50 dark:text-zinc-400">
                        <tr>
                            <th className="px-4 py-3 font-medium">Type</th>
                            <th className="px-4 py-3 font-medium">Description</th>
                            <th className="px-4 py-3 font-medium">Category</th>
                            <th className="px-4 py-3 font-medium">Status</th>
                            <th className="px-4 py-3 font-medium">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                        {isLoading ? (
                            <tr>
                                <td colSpan={5} className="p-4 text-center text-zinc-500">
                                    Loading...
                                </td>
                            </tr>
                        ) : reports.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="p-4 text-center text-zinc-500">
                                    No reports found
                                </td>
                            </tr>
                        ) : (
                            reports.map((report) => (
                                <tr
                                    key={report._id}
                                    className="group cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                                    onClick={() => handleClick(report)}
                                >
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-2">
                                            <IconAlertCircle size={18} className="text-red-500" />
                                            <span className="font-medium text-zinc-900 dark:text-zinc-100">
                                                {report.reportedItemType}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">
                                        {report.desc}
                                    </td>
                                    <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">
                                        {report.category.title}
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className="inline-flex items-center rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500">
                                            {report.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleEdit(report);
                                                }}
                                                className="rounded-lg p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                                                title="Edit report status"
                                            >
                                                <IconEdit size={18} />
                                            </button>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDelete(report._id);
                                                }}
                                                className="rounded-lg p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                                                title="Delete report"
                                            >
                                                <IconTrash size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Mobile Card View */}
            <div className="flex flex-col divide-y divide-zinc-200 md:hidden dark:divide-zinc-800">
                {isLoading ? (
                    <div className="p-4 text-center text-zinc-500">Loading...</div>
                ) : reports.length === 0 ? (
                    <div className="p-4 text-center text-zinc-500">No reports found</div>
                ) : (
                    reports.map((report) => (
                        <div
                            key={report._id}
                            className="flex flex-col gap-3 p-4 active:bg-zinc-50 dark:active:bg-zinc-800/50"
                            onClick={() => handleClick(report)}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <IconAlertCircle size={18} className="text-red-500" />
                                    <span className="font-medium text-zinc-900 dark:text-zinc-100">
                                        {report.reportedItemType}
                                    </span>
                                </div>
                                <span className="inline-flex items-center rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500">
                                    {report.status}
                                </span>
                            </div>

                            <div className="text-sm text-zinc-600 dark:text-zinc-400">
                                {report.desc}
                            </div>

                            <div className="text-xs text-zinc-500">
                                Category: {report.category.title}
                            </div>

                            <div className="flex items-center gap-2 pt-2">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleEdit(report);
                                    }}
                                    className="flex items-center gap-2 rounded-lg bg-blue-50 px-3 py-2 text-sm font-medium text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
                                >
                                    <IconEdit size={16} />
                                    Edit Status
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDelete(report._id);
                                    }}
                                    className="flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600 dark:bg-red-900/20 dark:text-red-400"
                                >
                                    <IconTrash size={16} />
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};
