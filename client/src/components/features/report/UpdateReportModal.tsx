import { useUpdateReport } from "@/hooks/report/useUpdateReport";
import { ReportData } from "@/types/reportDataType";
import { useState } from "react";

interface UpdateReportModalProps {
    report: ReportData;
    closeModal: () => void;
    zIndex: number;
}

const STATUS_OPTIONS = [
    {
        value: "pending",
        label: "Pending",
        color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500",
    },
    {
        value: "reviewed",
        label: "Reviewed",
        color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-500",
    },
    {
        value: "resolved",
        label: "Resolved",
        color: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-500",
    },
    {
        value: "dismissed",
        label: "Dismissed",
        color: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-500",
    },
] as const;

export const UpdateReportModal = ({ report, closeModal, zIndex }: UpdateReportModalProps) => {
    const [selectedStatus, setSelectedStatus] = useState(report.status);
    const { mutate: updateReport, isPending } = useUpdateReport();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (selectedStatus === report.status) {
            closeModal();
            return;
        }

        updateReport(
            { reportId: report._id, status: selectedStatus },
            {
                onSuccess: () => {
                    closeModal();
                },
            },
        );
    };

    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-black/50"
            style={{ zIndex }}
            onClick={closeModal}
        >
            <div
                className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl dark:bg-zinc-900"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="mb-6 text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                    Update Report Status
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-3">
                        {STATUS_OPTIONS.map((option) => (
                            <label
                                key={option.value}
                                className={`flex cursor-pointer items-center gap-3 rounded-lg border-2 p-4 transition-all ${
                                    selectedStatus === option.value
                                        ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                                        : "border-zinc-200 hover:border-zinc-300 dark:border-zinc-800 dark:hover:border-zinc-700"
                                }`}
                            >
                                <input
                                    type="radio"
                                    name="status"
                                    value={option.value}
                                    checked={selectedStatus === option.value}
                                    onChange={(e) =>
                                        setSelectedStatus(e.target.value as ReportData["status"])
                                    }
                                    className="h-4 w-4 text-blue-500"
                                />
                                <span
                                    className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${option.color}`}
                                >
                                    {option.label}
                                </span>
                            </label>
                        ))}
                    </div>

                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={closeModal}
                            className="flex-1 rounded-lg bg-zinc-100 px-4 py-2 font-medium text-zinc-700 transition-colors hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
                            disabled={isPending}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 rounded-lg bg-blue-500 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-600 disabled:opacity-50"
                            disabled={isPending}
                        >
                            {isPending ? "Updating..." : "Update Status"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
