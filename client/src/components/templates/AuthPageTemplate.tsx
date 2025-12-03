import { portaVozLogo } from "@/constants/system";
import { ReactNode } from "react";

export const AuthPageTemplate = ({
    children,
    title,
    subtitle,
}: {
    children: ReactNode;
    title: ReactNode;
    subtitle: ReactNode;
}) => {
    return (
        <>
            <div className="relative min-h-screen max-lg:overflow-hidden lg:py-15">
                <span className="bg-accent absolute -top-50 -left-50 h-150 w-150 rounded-full opacity-10 blur-3xl dark:mix-blend-color"></span>
                <span className="bg-accent absolute -right-50 bottom-0 h-120 w-120 rounded-full opacity-10 blur-3xl dark:mix-blend-color"></span>
                <span className="absolute inset-0 top-1/2 left-1/2 z-2 h-170 w-170 translate-x-[-50%] translate-y-[-50%] bg-[linear-gradient(to_right,white_2px,transparent_1px),linear-gradient(to_bottom,white_2px,transparent_1px)] [mask-image:radial-gradient(circle_at_center,#000_60%,transparent_100%)] bg-[size:55px_55px] bg-[position:-15px_-1px] opacity-20 dark:bg-[linear-gradient(to_right,black_2px,transparent_1px),linear-gradient(to_bottom,black_2px,transparent_1px)] dark:opacity-5"></span>
                <span className="bg-accent absolute top-1/2 left-1/2 h-200 w-200 translate-x-[-50%] translate-y-[-50%] rounded-full opacity-10 blur-3xl dark:mix-blend-color"></span>

                <div className="relative z-100 mx-auto w-full max-w-[490px] items-center space-y-1 overflow-hidden bg-white p-3 py-7 ring-[5px] ring-white max-lg:h-full max-lg:min-h-screen lg:rounded-3xl lg:p-7 dark:bg-zinc-900 dark:ring-zinc-900">
                    <span className="absolute -top-2 right-0 bottom-0 left-0 mx-auto h-65 w-[70%] bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] bg-[size:40px_44px] bg-[position:-1px_-1px] opacity-25 dark:bg-[linear-gradient(to_right,#323333_1px,transparent_1px),linear-gradient(to_bottom,#323333_1px,transparent_1px)] dark:opacity-20"></span>
                    <span className="bg-accent absolute top-10 left-1/2 h-70 w-70 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-12 blur-3xl dark:opacity-20 dark:mix-blend-color"></span>

                    <div className="mb-5 flex w-full flex-col items-center justify-center">
                        <img src={portaVozLogo(true)} alt="PortaVoz" width={120} className="z-20" />
                        <h2 className="font-title text-title mt-3 text-center text-2xl tracking-tighter">
                            {title}
                        </h2>
                        <p className="text-subtitle mx-auto mt-1 max-w-[350px] text-center text-sm">
                            {subtitle}
                        </p>
                    </div>
                    {children}
                </div>
            </div>
        </>
    );
};
