import { UserData } from "@/utils/types/userDataType";
import { useNavigate } from "react-router-dom";

export const UserPreview = ({ user }: { user: UserData }) => {
    const navigate = useNavigate();

    return (
        <div className="w-full flex items-center gap-5 cursor-pointer" onClick={() => navigate(`/profile/${user._id}`)}>
            <img src={user.image} alt="Imagem do user" className="w-15" />
            <div className="leading-4.5">
                <h3>{user.username}</h3>
                <small>
                    {user.fName} {user.lName}
                </small>
            </div>
        </div>
    );
};
