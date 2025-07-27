import { useUser } from "@/contexts/UserContext";
export const Dashboard = () => {
    const { userDecoded } = useUser();
    console.log(userDecoded?.token);

    return <div>Dashboard</div>;
};
