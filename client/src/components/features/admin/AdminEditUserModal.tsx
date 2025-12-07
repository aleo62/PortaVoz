import { Button } from "@/components/ui/Button";
import { ModalDefaultProps, useModal } from "@/contexts/ModalContext";
import { ModalProvider } from "@/contexts/ModalProvider";
import { usePromoteUser } from "@/hooks/user/usePromoteUser";
import { useUpdateUser } from "@/hooks/user/useUpdateUser";
import { UserData } from "@/types/userDataType";
import { IconAdjustments, IconPhoto, IconShieldLock, IconUser } from "@tabler/icons-react";
import { useState } from "react";
import { AdminEditUserAdvanced } from "./components/AdminEditUserAdvanced";
import { AdminEditUserImages } from "./components/AdminEditUserImages";
import { AdminEditUserPersonal } from "./components/AdminEditUserPersonal";
import { AdminEditUserRoles } from "./components/AdminEditUserRoles";

interface AdminEditUserModalProps extends ModalDefaultProps {
    user: UserData;
}

export const AdminEditUserModal = ({ user, zIndex }: AdminEditUserModalProps) => {
    const { closeModal } = useModal();
    const [activeTab, setActiveTab] = useState<"personal" | "images" | "advanced" | "roles">(
        "personal",
    );
    const { mutate: updateUser, isPending } = useUpdateUser();
    const { mutate: promoteUser, isPending: isPromoting } = usePromoteUser();

    const [formData, setFormData] = useState({
        fName: user.fName,
        lName: user.lName,
        username: user.username,
        about: user.about || "",
        remainingReports: user.meta.limits.remainingReports,
        totalReports: user.meta.limits.totalReports,
    });

    const [images, setImages] = useState<{ image: File | null; banner: File | null }>({
        image: null,
        banner: null,
    });

    const handleUpdate = () => {
        const data = new FormData();
        if (activeTab === "personal") {
            data.append("fName", formData.fName);
            data.append("lName", formData.lName);
            data.append("username", formData.username);
            data.append("about", formData.about);
        } else if (activeTab === "images") {
            if (images.image) data.append("image", images.image);
            if (images.banner) data.append("banner", images.banner);
        } else if (activeTab === "advanced") {
            data.append(
                "limits",
                JSON.stringify({
                    remainingReports: formData.remainingReports,
                    totalReports: formData.totalReports,
                    reportsResetAt: user.meta.limits.reportsResetAt,
                }),
            );
        }

        updateUser(
            { userData: data, userId: user._id },
            {
                onSuccess: () => {
                    alert("User updated successfully!");
                    closeModal();
                },
            },
        );
    };

    const handlePromote = (role: "admin" | "moderator", action: "promote" | "demote") => {
        const actionText = action === "promote" ? "promote" : "demote";
        const preposition = action === "promote" ? "to" : "from";
        if (confirm(`Are you sure you want to ${actionText} this user ${preposition} ${role}?`)) {
            promoteUser({ userId: user._id, role, action });
        }
    };

    const tabs = [
        { id: "personal", label: "Personal Info", icon: IconUser },
        { id: "images", label: "Images", icon: IconPhoto },
        { id: "advanced", label: "Advanced", icon: IconAdjustments },
        { id: "roles", label: "Roles", icon: IconShieldLock },
    ];

    return (
        <div
            className="my-auto flex h-[80%] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-xl dark:bg-zinc-900"
            style={{ zIndex }}
            onClick={(e) => e.stopPropagation()}
        >
            <div className="flex items-center justify-between border-b border-zinc-200 p-4 dark:border-zinc-800">
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                    Edit User
                </h2>
                <ModalProvider.Close />
            </div>

            <div className="flex flex-1 flex-col md:flex-row">
                <aside className="w-full border-b border-zinc-200 bg-zinc-50 p-2 md:w-48 md:border-r md:border-b-0 dark:border-zinc-800 dark:bg-zinc-900/50">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                                activeTab === tab.id
                                    ? "bg-white text-zinc-900 shadow-sm dark:bg-zinc-800 dark:text-zinc-100"
                                    : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
                            }`}
                        >
                            <tab.icon size={18} />
                            {tab.label}
                        </button>
                    ))}
                </aside>

                <main className="flex-1 p-6">
                    {activeTab === "personal" && (
                        <AdminEditUserPersonal formData={formData} setFormData={setFormData} />
                    )}

                    {activeTab === "images" && (
                        <AdminEditUserImages images={images} setImages={setImages} user={user} />
                    )}

                    {activeTab === "advanced" && (
                        <AdminEditUserAdvanced formData={formData} setFormData={setFormData} />
                    )}

                    {activeTab === "roles" && (
                        <AdminEditUserRoles
                            handlePromote={handlePromote}
                            isPromoting={isPromoting}
                            user={user}
                        />
                    )}
                </main>
            </div>

            {activeTab !== "roles" && (
                <div className="flex justify-end gap-2 border-t border-zinc-200 p-4 dark:border-zinc-800">
                    <Button onClick={closeModal} text="Cancel" styleType="outlined" size="small" />
                    <Button
                        onClick={handleUpdate}
                        isLoading={isPending}
                        text="Save Changes"
                        size="small"
                    />
                </div>
            )}
        </div>
    );
};
