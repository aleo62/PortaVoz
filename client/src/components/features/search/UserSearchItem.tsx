import { UserData } from "@/utils/types/userDataType";
import { useNavigate } from "react-router-dom";

export const UserSearchItem = ({ user }: { user: UserData }) => {
    const navigate = useNavigate();

    return (
        <div
            className="flex w-full cursor-pointer items-center gap-5"
            onClick={() => navigate(`/profile/${user._id}`)}
        >
            <img src={user.image as string} alt="Imagem do user" className="w-15" />
            <div className="leading-4.5">
                <h3>{user.username}</h3>
                <small>
                    {user.fName} {user.lName}
                </small>
            </div>
        </div>
    );
};
