import { Dispatch, SetStateAction } from "react";

type FormData = {
    fName: string;
    lName: string;
    username: string;
    about: string;
    remainingReports: number;
    totalReports: number;
};

interface AdminEditUserAdvancedProps {
    formData: FormData;
    setFormData: Dispatch<SetStateAction<FormData>>;
}

export const AdminEditUserAdvanced = ({ formData, setFormData }: AdminEditUserAdvancedProps) => {
    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    Remaining Reports
                </label>
                <input
                    type="number"
                    value={formData.remainingReports}
                    onChange={(e) =>
                        setFormData({ ...formData, remainingReports: Number(e.target.value) })
                    }
                    className="w-full rounded-lg border border-zinc-200 bg-transparent px-3 py-2 text-sm outline-none focus:border-zinc-400 dark:border-zinc-800 dark:text-zinc-100"
                />
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    Total Reports
                </label>
                <input
                    type="number"
                    value={formData.totalReports}
                    onChange={(e) =>
                        setFormData({ ...formData, totalReports: Number(e.target.value) })
                    }
                    className="w-full rounded-lg border border-zinc-200 bg-transparent px-3 py-2 text-sm outline-none focus:border-zinc-400 dark:border-zinc-800 dark:text-zinc-100"
                />
            </div>
            <div className="rounded-lg bg-yellow-50 p-4 text-sm text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-500">
                <p className="font-medium">Warning</p>
                <p>Changing these limits can affect the user's ability to report content.</p>
            </div>
        </div>
    );
};
