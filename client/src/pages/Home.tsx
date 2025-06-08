import { Footer } from "../sections/Footer";
import { Header } from "../sections/Header";
import { Hero } from "../sections/Home/Hero";
import { Info } from "../sections/Home/Info";
import { Objective } from "../sections/Home/Objective";
import { Testimonal } from "../sections/Home/Testimonal";
import { getAuth } from "firebase/auth";

export const Home = () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
        console.log("Usuário autenticado:", user.email);
    }

    return (
        <>
            <Header />
            <Hero />
            <Info />
            <Objective />
            <Testimonal />
            <Footer />
        </>
    );
};
