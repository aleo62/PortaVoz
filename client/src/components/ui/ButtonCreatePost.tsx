import { Server } from "@/api/Server";
import { RoutesPath } from "@/app/Routes";
import { useStoreUser } from "@/stores/userStore";
import { IconPlus } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

export const ButtonCreatePost = () => {
    const { user } = useStoreUser();
    const navigate = useNavigate();

    const verifyRemainReports = async () => {
        const data = await Server.getRemainingReports(user?._id!);
        if (data.canReport) navigate(RoutesPath("CreatePost")!);
    };

    return (
        <button
            className="bg-accent fixed right-10 bottom-10 z-100 flex h-12 w-12 items-center justify-center rounded-full text-white hover:shadow-2xl shadow-accent transition-all hover:scale-105"
            onClick={() => verifyRemainReports()}
        >
            <IconPlus size={25} />
        </button>
    );
};
