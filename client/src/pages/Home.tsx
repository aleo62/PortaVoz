import { Hero } from "@components/features/landing/home/HomeHero";
import { Info } from "@components/features/landing/home/HomeInfo";
import { Mobile } from "@components/features/landing/home/HomeMobile";
import { Objective } from "@components/features/landing/home/HomeObjective";

export const Home = () => {
    return (
        <>
            <Hero />
            <Info />
            <Objective />
            <Mobile />
        </>
    );
};
