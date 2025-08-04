import { Button } from "@/components/general/Button";
import { useToast } from "@/contexts/ToastContext";
import { useCreatePost } from "@/hooks/posts/useCreatePost";
import { ReportContent } from "@/sections/CreateReport/ReportContent";
import { ReportImages } from "@/sections/CreateReport/ReportImages";
import { ReportLocation } from "@/sections/CreateReport/ReportLocation";
import { ReportTags } from "@/sections/CreateReport/ReportTags";
import { PostData } from "@/utils/types/postDataType";
import loading from "@assets/images/loading.gif";
import { IconArrowRight, IconHome2 } from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export const CreateReport = () => {
    const { errorToast } = useToast();
    const createReport = useCreatePost();

    // Declare report form
    const [reportForm, setReportForm] = useState<Partial<PostData>>({
        title: "",
        desc: "",
        images: [],
        tags: [],
    });

    // Declare report page
    const [reportPage, setReportPage] = useState(0);

    // Declare report sections
    const reportSections = [ReportContent, ReportImages, ReportTags, ReportLocation];
    const ReportSection = reportSections[reportPage];

    // Declare sections validation
    const validatedSections = [
        false /* content */,
        false /* images */,
        false /* tags */,
        false /* location */,
    ];

    const handleReportValidate = (key: number) => {
        validatedSections[key] = true;
    };
    const handleNext = () => {
        if (validatedSections[reportPage]) {
            setReportPage((prev) => prev + 1);
        } else {
            errorToast("Preencha todos os campos");
        }
    };

    useEffect(() => {
        const registerPost = async () => {
            if (reportPage !== reportSections.length) return;
            const response = await createReport.mutate({ formData: reportForm });
            console.log(response);
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
                            small
                        />
                        <div
                            className={`before:w-${reportPage + 1}/4 before:bg-accent relative mx-auto mt-5 h-3 w-full max-w-3xl rounded-full bg-zinc-200 before:absolute before:h-full before:rounded-full before:transition-[width] before:content-[''] lg:mt-10 dark:bg-zinc-700`}
                        ></div>
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
                                        validate={() => handleReportValidate(reportPage)}
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
