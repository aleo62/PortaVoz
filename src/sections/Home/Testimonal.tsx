import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import { AnimatedTitle } from "@/components/animations/AnimatedTitle";
import { AnimatedButton } from "@components/animations/AnimatedButton";
import { AnimatedCaption } from "@components/animations/AnimatedCaption";

import { TestimonalItems } from "@utils/data";
import { Witnes } from "@components/Witnes";
import { ButtonPrimary } from "@components/Button";

import { Circle } from "@components/deco/Circle";
import { Ret } from "@components/deco/Ret";

export const Testimonal = () => {
    return (
        <section className="relative pt-33 pb-33">
            {/* 
                // SHAPES
            */}
            <Circle className="bottom-20 left-[-50px] rotate-[-125deg]" />
            <Ret className="top-30 right-[-80px] rotate-[-25deg]" />

            <div className="container">
                <div className="relative z-10 w-full lg:flex lg:items-center lg:justify-between">
                    <div>
                        <AnimatedCaption>
                            <p className="caption">FeedBack</p>
                        </AnimatedCaption>
                        <AnimatedTitle>
                            <h2 className="title mb-[50px]">
                                O que <b>dizem</b> sobre nós.
                            </h2>
                        </AnimatedTitle>
                    </div>

                    <AnimatedButton delay={0.8}>
                        <ButtonPrimary>Participar da equipe</ButtonPrimary>
                    </AnimatedButton>
                </div>

                <Swiper
                    modules={[Navigation, Pagination, Scrollbar, A11y]}
                    slidesPerView={3}
                    spaceBetween={5}
                    navigation
                    pagination={{ clickable: true }}
                    breakpoints={{
                        0: {
                            slidesPerView: 1,
                        },
                        640: {
                            slidesPerView: 2,
                        },
                        1024: {
                            slidesPerView: 3,
                        },
                    }}
                    className="!px-6"
                >
                    {TestimonalItems.map(({ image, title, client, role }, key) => (
                        <SwiperSlide key={key} className="overflow-visible px-2 py-20">
                            <Witnes image={image} title={title} client={client} role={role} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};
