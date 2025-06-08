type InfoFieldProps = {
    topic: string;
    info: string;
};

export const InfoField = ({ topic, info }: InfoFieldProps) => {
    return (
        <div className="space-y-1 text-sm">
            <dt className="text-zinc-600">{ topic }: </dt>
            <dl className="font-medium text-zinc-800">{ info }</dl>
        </div>
    );
};
