import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { AnimatedTitle } from "../../components/animations/AnimatedTitle";
import { TestimonalItems } from "../../utils/data";
import { Witnes } from "../../components/Witnes";
import { AnimatedButton } from "../../components/animations/AnimatedButton";
import { ButtonPrimary } from "../../components/Button";
import { Circle } from "../../components/deco/Circle";
import { Ret } from "../../components/deco/Ret";
import { AnimatedCaption } from "../../components/animations/AnimatedCaption";

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
                    spaceBetween={window.innerWidth < 1280 ? 20 : 20}
                    slidesPerView={3}
                    navigation
                    pagination={{ clickable: true }}
                    loop={true}
                    breakpoints={{
                        1280: {
                            slidesPerView: 3,
                        },
                        1024: {
                            slidesPerView: 2.5,
                        },
                        768: {
                            slidesPerView: 2,
                        },
                        640: {
                            slidesPerView: 1,
                        },
                        0: {
                            slidesPerView: 1,
                        },
                    }}
                    className="!overflow-visible"
                >
                    {TestimonalItems.map(({ image, title, body, client, role }, key) => (
                        <SwiperSlide
                            key={key}
                            className="mb-15 !flex !items-center !justify-center py-10"
                        >
                            <Witnes
                                image={image}
                                title={title}
                                body={body}
                                client={client}
                                role={role}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};
