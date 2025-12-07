import { Dispatch, SetStateAction } from "react";

type FormData = {
    fName: string;
    lName: string;
    username: string;
    about: string;
    remainingReports: number;
    totalReports: number;
};

interface AdminEditUserPersonalProps {
    formData: FormData;
    setFormData: Dispatch<SetStateAction<FormData>>;
}

export const AdminEditUserPersonal = ({ formData, setFormData }: AdminEditUserPersonalProps) => {
    return (
        <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                        First Name
                    </label>
                    <input
                        type="text"
                        value={formData.fName}
                        onChange={(e) => setFormData({ ...formData, fName: e.target.value })}
                        className="w-full rounded-lg border border-zinc-200 bg-transparent px-3 py-2 text-sm outline-none focus:border-zinc-400 dark:border-zinc-800 dark:text-zinc-100"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                        Last Name
                    </label>
                    <input
                        type="text"
                        value={formData.lName}
                        onChange={(e) => setFormData({ ...formData, lName: e.target.value })}
                        className="w-full rounded-lg border border-zinc-200 bg-transparent px-3 py-2 text-sm outline-none focus:border-zinc-400 dark:border-zinc-800 dark:text-zinc-100"
                    />
                </div>
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    Username
                </label>
                <input
                    type="text"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    className="w-full rounded-lg border border-zinc-200 bg-transparent px-3 py-2 text-sm outline-none focus:border-zinc-400 dark:border-zinc-800 dark:text-zinc-100"
                />
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    About
                </label>
                <textarea
                    value={formData.about}
                    onChange={(e) => setFormData({ ...formData, about: e.target.value })}
                    rows={4}
                    className="w-full rounded-lg border border-zinc-200 bg-transparent px-3 py-2 text-sm outline-none focus:border-zinc-400 dark:border-zinc-800 dark:text-zinc-100"
                />
            </div>
        </div>
    );
};
