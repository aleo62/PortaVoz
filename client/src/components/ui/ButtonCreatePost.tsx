import { Server } from "@/api/Server";
import { useStoreUser } from "@/stores/userStore";
import { IconPlus } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

export const ButtonCreatePost = () => {
    const { user } = useStoreUser();
    const navigate = useNavigate();

    const verifyRemainReports = async () => {
        const data = await Server.getRemainingReports(user?._id!, user?.token!);
        if (data.canReport) navigate("/create-post");
    };

    return (
        <button
            className="bg-accent fixed right-10 bottom-10 z-100 flex h-12 w-12 items-center justify-center rounded-full text-white"
            onClick={() => verifyRemainReports()}
        >
            <IconPlus size={25} />
        </button>
    );
};
