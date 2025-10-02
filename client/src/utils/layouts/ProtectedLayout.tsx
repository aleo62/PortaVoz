import { useUser } from "@/contexts/UserContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

type ProtectedLayoutProps = {
  children: React.ReactNode;
  onlyGuest?: boolean;
  onlyAdmin?: boolean;
};

export const ProtectedLayout = ({ children, onlyGuest, onlyAdmin }: ProtectedLayoutProps) => {
  const { userDecoded } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (onlyGuest && userDecoded) {
      navigate("/feed");
    }

    if (!onlyGuest && !userDecoded) {
      navigate("/auth/login");
    }

    if (onlyAdmin && userDecoded && !userDecoded.claims?.admin) {
      navigate("/");
    }
  }, [userDecoded, onlyGuest, onlyAdmin, navigate]);

  return <>{children}</>;
};
