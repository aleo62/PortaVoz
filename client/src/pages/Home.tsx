import { Footer } from "../sections/Footer";
import { Header } from "../sections/Header";
import { Hero } from "../sections/Home/Hero";
import { Info } from "../sections/Home/Info";
import { Objective } from "../sections/Home/Objective";
import { Testimonal } from "../sections/Home/Testimonal";

export const Home = () => {
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
