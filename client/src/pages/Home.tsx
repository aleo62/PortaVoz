import { Mobile } from "@/sections/Home/Mobile";
import { Header } from "@/sections/Header";
import { Hero } from "@/sections/Home/Hero";
import { Info } from "@/sections/Home/Info";
import { Objective } from "@/sections/Home/Objective";

export const Home = () => {
    return (
        <>
            <Header />
            <Hero />
            <Info />
            <Objective />
            <Mobile />
        </>
    );
};
