import { Button } from "@/components/ui/Button";
import { useToast } from "@/contexts/ToastContext";
import { useCreatePost } from "@/hooks/posts/useCreatePost";
import { useValidateStage } from "@/hooks/validate/useValidateStage";
import { PostContent } from "@/sections/CreatePost/PostContent";
import { PostImages } from "@/sections/CreatePost/PostImages";
import { PostLocation } from "@/sections/CreatePost/PostLocation";
import { PostTags } from "@/sections/CreatePost/PostTags";
import { PostData } from "@/utils/types/postDataType";
import loading from "@assets/images/loading.gif";
import { IconArrowRight, IconHome2 } from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const CreatePost = () => {
    const { errorToast } = useToast();
    const createPost = useCreatePost();
    const navigate = useNavigate();
    const { data: responseStage, mutate: validateStage, isSuccess } = useValidateStage();
    const [isValidating, setIsValidating] = useState(false);

    // Declare report form
    const [reportForm, setReportForm] = useState<Partial<PostData>>({
        title: "",
        desc: "",
        images: [],
        hashtags: [],
    });

    // Declare report page
    const [reportPage, setReportPage] = useState(0);
    const barPosition = ["w-1/4", "w-2/4", "w-3/4", "w-4/4"];

    // Declare report sections
    const reportSections = [PostContent, PostImages, PostTags, PostLocation];
    const ReportSection = reportSections[reportPage];

    // Declare sections validation
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
            setIsValidating(false); // desliga aqui
            responseStage.data.valid
                ? setReportPage((prev) => prev + 1)
                : errorToast(responseStage.data.errors[0]);
        }
    }, [isSuccess, responseStage]);

    useEffect(() => {
        const registerPost = async () => {
            if (reportPage !== reportSections.length) return;

            await createPost.mutate({ formData: reportForm });
        };

        registerPost();
    }, [reportPage]);

    const pageVariants =
        reportPage !== 0
            ? {
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
              }
            : {
                  initial: {
                      x: "0%",
                      opacity: 100,
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
                            small
                            onClick={() => navigate("/feed")}
                        />
                        <div
                            className={`relative mx-auto mt-5 h-3 w-full max-w-3xl rounded-full bg-zinc-200 lg:mt-10 dark:bg-zinc-700`}
                        >
                            <div
                                className={`h-full ${barPosition[reportPage]} bg-accent rounded-full transition-[width]`}
                            ></div>
                        </div>
                        <div className="relative mx-auto mt-17 mb-10 h-50 min-h-95 w-full max-w-xl rounded-xl">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={reportPage}
                                    variants={pageVariants}
                                    initial="initial"
                                    animate="animate"
                                    exit="exit"
                                    style={{ position: "absolute", width: "100%" }}
                                >
                                    <ReportSection
                                        validate={() => {
                                            validatedSections[reportPage] = true;
                                        }}
                                        setReportForm={
                                            setReportForm as React.Dispatch<
                                                React.SetStateAction<PostData>
                                            >
                                        }
                                        reportForm={reportForm as PostData}
                                    />
                                </motion.div>
                            </AnimatePresence>
                        </div>
                        <div className="mx-auto w-full max-w-xl">
                            <Button
                                className="mb-20 ml-auto"
                                text="Proximo"
                                onClick={() => handleNext()}
                                Icon={IconArrowRight}
                                small
                                isLoading={isValidating}
                            />
                        </div>
                    </>
                ) : (
                    <div className="mx-auto mt-40 w-fit">
                        <img src={loading} alt="Carregando..." />
                        <h1 className="text-title mt-5 text-2xl font-bold">Registrando...</h1>
                    </div>
                )}
            </main>
        </>
    );
};
