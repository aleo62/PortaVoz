import { Button } from "@/components/ui/Button";
import { useToast } from "@/contexts/ToastContext";
import { useCreatePost } from "@/hooks/posts/useCreatePost";
import { useValidateStage } from "@/hooks/validate/useValidateStage";
import { PostContent } from "@/components/sections/CreatePost/PostContent";
import { PostImages } from "@/components/sections/CreatePost/PostImages";
import { PostLocation } from "@/components/sections/CreatePost/PostLocation";
import { PostTags } from "@/components/sections/CreatePost/PostTags";
import { RequestPostData } from "@/utils/types/postDataType";
import { IconArrowLeft, IconArrowRight, IconHome2 } from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const CreatePost = () => {
    const { errorToast } = useToast();
    const { mutateAsync: createPost, isSuccess: created, isError } = useCreatePost();
    const navigate = useNavigate();
    const { data: responseStage, mutate: validateStage, isSuccess } = useValidateStage();
    const [isValidating, setIsValidating] = useState(false);

    const [reportForm, setReportForm] = useState<Partial<RequestPostData>>({
        title: "",
        desc: "",
        images: [],
        hashtags: [],
    });

    const [reportPage, setReportPage] = useState(0);
    const barPosition = ["w-1/4", "w-2/4", "w-3/4", "w-4/4"];

    const reportSections = [PostContent, PostImages, PostTags, PostLocation];
    const ReportSection = reportSections[reportPage];
    const validatedSections = [
        false /* content */,
        false /* images */,
        false /* tags */,
        false /* location */,
    ];
    const stageSections = ["content", "images", "hashtags"];

    const handleNext = async () => {
        if (validatedSections[reportPage]) {
            setIsValidating(true);
            await validateStage({
                formData: reportForm,
                stage: stageSections[reportPage !== 3 ? reportPage : 2],
            });
        } else {
            errorToast("Preencha todos os campos corretamente");
        }
    };

    useEffect(() => {
        if (isSuccess) {
            setIsValidating(false);
            responseStage.data.valid
                ? setReportPage((prev) => prev + 1)
                : errorToast(responseStage.data.errors[0]);
        }
    }, [isSuccess, responseStage]);

    useEffect(() => {
        const registerPost = async () => {
            if (reportPage !== reportSections.length) return;

            await createPost({ formData: reportForm });
        };

        registerPost();
    }, [reportPage]);

    const pageVariants = {
        initial: {
            x: "100%",
            opacity: 0,
        },
        animate: {
            x: "0%",
            opacity: 1,
            transition: {
                type: "tween",
                ease: "easeOut",
                duration: 0.3,
            },
        },
        exit: {
            x: "-100%",
            opacity: 0,
            transition: {
                type: "tween",
                ease: "easeIn",
                duration: 0.3,
            },
        },
    };

    return (
        <>
            <main className="bg-body-background h-full px-3 lg:h-screen">
                {reportPage < 4 ? (
                    <>
                        <Button
                            text="Voltar"
                            styleType="outlined"
                            className="top-5 left-5 max-lg:mt-5 lg:absolute"
                            iconLeft
                            Icon={IconHome2}
                            size="small"
                            onClick={() => navigate("/feed")}
                        />
                        <div
                            className={`relative mx-auto mt-5 h-3 w-full max-w-3xl rounded-full bg-zinc-200 lg:mt-10 dark:bg-zinc-700`}
                        >
                            <div
                                className={`h-full ${barPosition[reportPage]} bg-accent rounded-full transition-[width]`}
                            ></div>
                        </div>

                        <div className="relative mx-auto max-w-150 py-20">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={reportPage}
                                    variants={pageVariants}
                                    initial="initial"
                                    animate="animate"
                                    exit="exit"
                                    className="h-120 lg:h-150"
                                >
                                    <ReportSection
                                        validate={() => {
                                            validatedSections[reportPage] = true;
                                        }}
                                        setReportForm={
                                            setReportForm as React.Dispatch<
                                                React.SetStateAction<RequestPostData>
                                            >
                                        }
                                        reportForm={reportForm as RequestPostData}
                                    />
                                </motion.div>
                            </AnimatePresence>
                            <div className="flex items-center">
                                {reportPage > 0 && (
                                    <div
                                        className="transition-background lg:transform-x-[-50%] bg-body-background hover:bg-accent group ring-accent relative h-15 w-15 overflow-clip rounded-full ring-2 duration-200 lg:absolute lg:top-1/2 lg:left-[-20%]"
                                        onClick={() => setReportPage((prev) => prev - 1)}
                                    >
                                        <IconArrowLeft
                                            className="transition-color text-accent group-hover:text-body-background absolute top-[50%] left-[50%] size-8 translate-x-[-50%] translate-y-[-50%] stroke-[2] duration-200 group-hover:left-[-15px]"
                                            title="Voltar"
                                        />
                                        <IconArrowLeft
                                            className="transition-color text-accent group-hover:text-body-background absolute top-[50%] right-[-15px] size-8 translate-x-[50%] translate-y-[-50%] stroke-[2] duration-200 group-hover:right-[50%]"
                                            title="Voltar"
                                        />
                                    </div>
                                )}

                                <Button
                                    className="ml-auto"
                                    text="Proximo"
                                    onClick={() => handleNext()}
                                    Icon={IconArrowRight}
                                    size="small"
                                    isLoading={isValidating}
                                />
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="mx-auto mt-40 w-fit">
                        <h1 className="text-title mt-5 text-2xl font-bold">
                            {isError ? "Error aaaaaa" : created ? "Registrado!" : "Registrando..."}
                        </h1>
                    </div>
                )}
            </main>
        </>
    );
};
