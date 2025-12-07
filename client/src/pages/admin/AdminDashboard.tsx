import { AdminHeader } from "@/components/features/admin/AdminHeader";
import { AdminReports } from "@/components/features/admin/AdminReports";
import { AdminSidebar } from "@/components/features/admin/AdminSidebar";
import { AdminUsers } from "@/components/features/admin/AdminUsers";
import { useParams } from "react-router-dom";

export const AdminDashboard = () => {
    const { adminTab } = useParams();
    const AdminTabs = {
        users: {
            title: "Gerenciar Usuários",
            description: "Gerencie os usuários do sistema",
            AdminComponent: AdminUsers,
        },
        reports: {
            title: "Gerenciar Relatórios",
            description: "Gerencie os relatórios do sistema",
            AdminComponent: AdminReports,
        },
    };

    const AdminTab = AdminTabs[(adminTab as keyof typeof AdminTabs) || "users"].AdminComponent;
    return (
        <>
            <AdminSidebar />
            <main className="flex-1 space-y-7 px-1 py-3 lg:py-5 lg:px-10 h-full">
                <AdminHeader
                    title={AdminTabs[(adminTab as keyof typeof AdminTabs) || "users"].title}
                    description={
                        AdminTabs[(adminTab as keyof typeof AdminTabs) || "users"].description
                    }
                />
                <AdminTab />
            </main>
        </>
    );
};
