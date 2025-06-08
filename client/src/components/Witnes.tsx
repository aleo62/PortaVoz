import { IconQuoteFilled } from "@tabler/icons-react";

type WitnesProps = {
    image: string;
    title: string;
    client: string;
    role: string;
};

export const Witnes = ({ image, title, client, role }: WitnesProps) => {
    return (
        <div className="hover:bg-accent group transition-[background-color, scale] relative grid w-fit gap-15 rounded-lg bg-white/70 px-9 py-15 shadow-[0px_4px_67px_-16px_rgba(0,_0,_0,_0.1)] backdrop-blur-2xl duration-300 hover:scale-102">
            {/* main */}
            <div className="grid min-h-43 gap-3 md:min-h-0">
                {/* header */}
                <div className="flex w-full items-center">
                    {/* quote */}
                    <IconQuoteFilled className="text-accent size-11 shrink-0 scale-x-[-1] transition-[color] duration-200 group-hover:text-white lg:size-14" />
                </div>

                {/* body */}
                <div className="text-subtitle transition-[color] duration-200 group-hover:text-white">
                    {/* title */}
                    <h3 className="text-accent sml:text-[1.6rem] sml:px-4 w-full max-w-80 rounded-md px-1 py-2 text-left text-[1.5rem] leading-[1.4] font-semibold tracking-tighter transition-[color] duration-200 group-hover:text-white">
                        {title}
                    </h3>
                </div>
            </div>
            <div className="flex w-full items-center">
                {/* image */}
                <figure className="h-14 w-14 shrink-0 overflow-hidden rounded-full transition-all duration-200 group-hover:ring-white">
                    <img
                        src={image}
                        alt={client}
                        className="h-full w-full rounded-full object-cover"
                    />
                </figure>

                {/* client and role name */}
                <div className="ml-5 flex w-full flex-col">
                    <h4 className="text-title md:text[18px] h-fit text-[16px] font-bold transition-[color] duration-200 group-hover:text-white">
                        {client}
                    </h4>
                    <p className="text-subtitle text-[13px] transition-[color] duration-200 group-hover:text-white">
                        {role}
                    </p>
                </div>
            </div>
        </div>
    );
};
