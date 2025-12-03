import { RequestPostData } from "@/types/postDataType";
import { useEffect, useRef, useState } from "react";
import { FormInput } from "./FormInput";

export const InputLocation = ({
    reportForm,
    setReportForm,
}: {
    reportForm: RequestPostData;
    setReportForm: React.Dispatch<React.SetStateAction<Partial<RequestPostData>>>;
}) => {
    const [suggestions, setSuggestions] = useState<any[]>([]);
    const [query, setQuery] = useState("");
    const timeoutRef = useRef<NodeJS.Timeout>(null);

    useEffect(() => {
        const fetchLocation = async () => {
            const queryFormatada = encodeURIComponent(query).replace(/%20/g, "+");
            const url = `https://nominatim.openstreetmap.org/search?q=${queryFormatada}%20Piracicaba%20S%C3%A3o%20Paulo%20Brasil&format=json&addressdetails=1&limit=10`;
            try {
                const response = await fetch(url);
                if (!response.ok) throw new Error(`Response status: ${response.status}`);
                const result = await response.json();
                setSuggestions(result);
            } catch (err) {
                console.error(err);
            }
        };

        fetchLocation();
        return () => clearTimeout(timeoutRef.current!);
    }, [query]);

    const handleChange = (value: string) => {
        timeoutRef.current = setTimeout(() => {
            if (value.trim() !== "") {
                setQuery(value);
            } else {
                setSuggestions([]);
            }
        }, 500);
    };

    const handleClickLocation = (suggestion: any) => {
        setReportForm({
            ...reportForm,
            location: {
                latitude: Number(suggestion.lat),
                longitude: Number(suggestion.lon),
            },
            address: `${suggestion.address.suburb} ${suggestion.address.road ? ", " + suggestion.address.road : ""}`,
        });
    };
    return (
        <>
            <div>
                <FormInput
                    label="Endereço"
                    className="mb-4"
                    inputProps={{
                        type: "text",
                        placeholder: "Ex: Rua Alberto Breglia, Água Branca",
                        onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                            handleChange(e.target.value),
                    }}
                />

                <div
                    className={`${query.trim() == "" && "hidden"} text-title scrollbar-thin scrollbar-track-[#fafafa] dark:scrollbar-track-[#212121] scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-700 flex max-h-60 flex-col items-center divide-y-1 divide-zinc-700 overflow-auto rounded-lg bg-white p-5 text-sm dark:bg-zinc-900`}
                >
                    {suggestions.length === 0 ? (
                        <p>Carregando...</p>
                    ) : (
                        suggestions
                            .filter((sg) => sg.address.city === "Piracicaba")
                            .map((sg, key) => (
                                <div
                                    className={`w-full cursor-pointer p-2 py-4 hover:bg-zinc-800`}
                                    key={key}
                                    onClick={() => handleClickLocation(sg)}
                                >
                                    <p>
                                        {sg.address.suburb}{" "}
                                        {sg.address.road ? ", " + sg.address.road : ""}
                                    </p>

                                    <small>
                                        Lat: {sg.lat}, Lon: {sg.lon}
                                    </small>
                                </div>
                            ))
                    )}
                </div>
            </div>
        </>
    );
};
