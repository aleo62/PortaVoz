import { IconQuoteFilled } from '@tabler/icons-react';

type WitnesProps = {
    image: string;
    title: string;
    body: string;
    client: string;
    role: string;
};

export const Witnes = ({ image, title, body, client, role }: WitnesProps) => {
    return (
        <div className="hover:bg-accent group transition-[background-color, scale] grid max-w-90 gap-13 rounded-xl bg-white px-10 py-11 shadow-[0px_4px_60px_0px_rgba(0,_0,_0,_0.1)] duration-300 hover:scale-102">
            {/* main */}
            <div className="grid gap-5">
                {/* header */}
                <div className="flex w-full items-center">
                    {/* quote */}
                    <IconQuoteFilled className="text-accent size-11 shrink-0 scale-x-[-1] transition-[color] duration-200 group-hover:text-white lg:size-14" />

                    {/* title */}
                    <h3 className="text-accent w-full text-center text-lg font-semibold transition-[color] duration-200 group-hover:text-white">
                        {title}
                    </h3>
                </div>

                {/* body */}
                <div className="text-subtitle min-h-35 text-[14px] transition-[color] duration-200 group-hover:text-white">
                    {body}
                </div>
            </div>

            <div className="flex w-full items-center">
                {/* image */}
                <figure className="h-13 w-13 shrink-0 overflow-hidden rounded-full">
                    <img src={image} alt={client} className="h-full w-full object-cover" />
                </figure>

                {/* client and role name */}
                <div className="ml-2 flex w-full flex-col">
                    <h4 className="text-title h-fit text-[18px] font-bold transition-[color] duration-200 group-hover:text-white">
                        {client}
                    </h4>
                    <p className="text-subtitle text-[11px] transition-[color] duration-200 group-hover:text-white">
                        {role}
                    </p>
                </div>

                {/* quote */}
                <IconQuoteFilled className="text-accent size-11 shrink-0 transition-[color] duration-200 group-hover:text-white lg:size-14" />
            </div>
        </div>
    );
};
