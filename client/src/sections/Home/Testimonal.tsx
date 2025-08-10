import { A11y, Navigation, Pagination, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { AnimatedTitle } from "@/components/animations/AnimatedTitle";
import { AnimatedButton } from "@components/animations/AnimatedButton";
import { AnimatedCaption } from "@components/animations/AnimatedCaption";

import { Witnes } from "@/components/ui/Witnes";
import { Button } from "@/components/ui/Button";
import { TestimonalItems } from "@utils/data";

import { Circle } from "@components/deco/Circle";
import { Ret } from "@components/deco/Ret";
import { IconArrowLeft, IconArrowRight, IconWorld } from "@tabler/icons-react";
import { useState } from "react";

export const Testimonal = () => {
    const [isEnd, setIsEnd] = useState(false);
    const [isStart, setIsStart] = useState(false);

    return (
        <section className="relative pt-33 pb-33">
            {/* 
                // SHAPES
            */}
            <Circle className="bottom-20 left-[-50px] h-25 w-25 rotate-[-125deg] xl:h-45 xl:w-45" />
            <Ret className="top-30 right-[-80px] h-50 w-50 rotate-[-25deg] xl:h-80 xl:w-80" />

            <div className="relative container">
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
                        <Button text="Participar da Equipe" Icon={IconWorld} styleType="primary" />
                    </AnimatedButton>
                </div>

                <div
                    className={`custom-prev absolute bottom-[-10px] left-[50px] ${isStart ? "opacity-[0.7]" : ""}`}
                >
                    <IconArrowLeft className="size-7" />
                </div>

                <div
                    className={`custom-next absolute right-[50px] bottom-[-10px] ${isEnd ? "opacity-[0.7]" : ""}`}
                >
                    <IconArrowRight className="size-7" />
                </div>

                <Swiper
                    modules={[Navigation, Pagination, Scrollbar, A11y]}
                    slidesPerView={3}
                    spaceBetween={5}
                    direction="horizontal"
                    touchStartPreventDefault={false}
                    touchMoveStopPropagation={true}
                    navigation={{
                        nextEl: ".custom-next",
                        prevEl: ".custom-prev",
                    }}
                    onSlideChange={(swiper) => {
                        setIsEnd(swiper.isEnd);
                        setIsStart(swiper.isBeginning);
                    }}
                    pagination={{ clickable: true }}
                    breakpoints={{
                        0: {
                            slidesPerView: 1,
                        },
                        775: {
                            slidesPerView: 2,
                        },
                        1275: {
                            slidesPerView: 3,
                        },
                    }}
                    className="mt-10 flex items-center justify-center lg:mt-0 lg:!px-6"
                >
                    {TestimonalItems.map(({ image, title, client, role }, key) => (
                        <SwiperSlide
                            key={key}
                            className="mb-10 !flex !items-center !justify-center overflow-visible px-2 py-10"
                        >
                            <Witnes image={image} title={title} client={client} role={role} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};
