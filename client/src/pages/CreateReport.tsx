import { Button } from "@/components/general/Button";
import { useToast } from "@/contexts/ToastContext";
import { ReportContent } from "@/sections/CreateProfile/ReportContent";
import { ReportImages } from "@/sections/CreateProfile/ReportImages";
import { ReportLocation } from "@/sections/CreateProfile/ReportLocation";
import { ReportTags } from "@/sections/CreateProfile/ReportTags";
import { PostData } from "@/utils/types/postDataType";
import { IconArrowRight, IconHome2 } from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import loading from "@assets/images/loading.gif";
import { useUser } from "@/contexts/UserContext";

export const CreateReport = () => {
    const { errorToast } = useToast();
    const { userDecoded } = useUser();

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
            if (reportPage === reportSections.length) {
                const auth = "Bearer " + userDecoded?.token;

                const formData = new FormData();
                formData.append("title", reportForm.title || "");
                formData.append("desc", reportForm.desc || "");
                formData.append("address", "Sabidi");
                formData.append("location[longitude]", JSON.stringify(20));
                formData.append("location[latitude]", JSON.stringify(20));

                if(reportForm.images && reportForm.images.length > 0) {
                    reportForm.images.forEach((file) => {
                        formData.append(`images`, file);
                    });
                }
                if(reportForm.tags && reportForm.tags.length > 0) {
                    reportForm.tags.forEach((tag) => {
                        formData.append(`tags`, tag);
                    });
                }

                try {
                    console.log(reportForm.images);
                    const response = await fetch("http://localhost:4000/api/v1/posts", {
                        method: "POST",
                        headers: {
                            authorization: auth,
                        },
                        body: formData,
                    });

                    const result = await response.json();
                    if (!response.ok) {
                        console.log(result.errors)
                    } else {
                        console.log("Post registrado com sucesso!", result);
                    }
                } catch (err) {
                    console.log(err);
                }
            }
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
