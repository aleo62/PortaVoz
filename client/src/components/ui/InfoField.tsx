type InfoFieldProps = {
    topic: string;
    info: string;
};

export const InfoField = ({ topic, info }: InfoFieldProps) => {
    return (
        <div className="space-y-1 text-sm">
            <dt className="text-zinc-600 dark:text-zinc-300">{ topic }: </dt>
            <dl className="font-medium text-zinc-800 dark:text-zinc-100 whitespace-nowrap overflow-hidden overflow-ellipsis">{ info }</dl>
        </div>
    );
};
