import { ReactNode } from "react";
import { Header } from "../features/landing/LandingHeader";

export const LandingLayout = ({ children }: { children: ReactNode }) => {
    return (
        <>
            <Header />
            {children}
        </>
    );
};
