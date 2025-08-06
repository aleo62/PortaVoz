import { useUser } from "@/contexts/UserContext";
import { useParams } from "react-router-dom";

export const Profile = () => {
    const { publicId } = useParams();
    const { userData } = useUser();
    
    return <div>{publicId ? publicId : `Você: ${userData?._publicId}` }</div>;
};
