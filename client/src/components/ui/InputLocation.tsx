import { RequestPostData } from "@/types/postDataType";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
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
    const [isLoading, setIsLoading] = useState(false);

    const fetchLocation = async () => {
        const queryFormatada = encodeURIComponent(query).replace(/%20/g, "+");
        const url = `https://nominatim.openstreetmap.org/search?q=${queryFormatada}%20Piracicaba%20S%C3%A3o%20Paulo%20Brasil&format=json&addressdetails=1&limit=10`;
        try {
            setIsLoading(true);
            const response = await fetch(url);
            if (!response.ok) throw new Error(`Response status: ${response.status}`);
            const result = await response.json();
            setSuggestions(result);
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (query.trim() === "") {
            setSuggestions([]);
            return;
        }

        const timeout = setTimeout(() => {
            fetchLocation();
        }, 500);

        return () => clearTimeout(timeout);
    }, [query]);

    const handleClickLocation = (suggestion: any) => {
        setReportForm({
            ...reportForm,
            location: {
                latitude: Number(suggestion.lat),
                longitude: Number(suggestion.lon),
            },
            address: `${suggestion.address.suburb} ${suggestion.address.road ? ", " + suggestion.address.road : ""}`,
        });
        setQuery(
            `${suggestion.address.suburb}${suggestion.address.road ? ", " + suggestion.address.road : ""}`,
        );
        setSuggestions([]);
    };

    const filteredSuggestions = useMemo(
        () => suggestions.filter((sg) => sg.address.city === "Piracicaba"),
        [suggestions],
    );

    const shouldShowDropdown = query.trim() !== "" && (isLoading || filteredSuggestions.length > 0);

    return (
        <div className="relative h-fit">
            <FormInput
                label="Endereço"
                className="relative z-10"
                inputProps={{
                    type: "text",
                    placeholder: "Ex: Rua Alberto Breglia, Água Branca",
                    value: query,
                    onChange: (e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value),
                    autoComplete: "off",
                }}
            />

            {shouldShowDropdown && (
                <div className="absolute top-[calc(100%-10px)] right-0 left-0 z-0 overflow-hidden rounded-b-xl border border-zinc-200 bg-white py-4 shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
                    <div className="scrollbar-thin scrollbar-thumb-zinc-200 scrollbar-track-transparent dark:scrollbar-thumb-zinc-700 max-h-60 overflow-auto">
                        {isLoading && (
                            <div className="text-subtitle px-4 py-3 text-sm">
                                Buscando endereços...
                            </div>
                        )}

                        {!isLoading && filteredSuggestions.length === 0 && (
                            <div className="text-subtitle px-4 py-3 text-sm">
                                Nenhum endereço encontrado.
                            </div>
                        )}

                        {!isLoading &&
                            filteredSuggestions.map((sg, key) => (
                                <button
                                    type="button"
                                    key={key}
                                    onClick={() => handleClickLocation(sg)}
                                    className="text-title flex w-full flex-col gap-1 px-4 py-3 text-left text-sm transition hover:bg-zinc-100 dark:text-white dark:hover:bg-zinc-800/60"
                                >
                                    <span className="font-medium">
                                        {`${sg.address.suburb}${sg.address.road && `, ${sg.address.road}`}`}
                                    </span>
                                    <span className="text-subtitle text-xs">
                                        {sg.address.postcode ? `CEP: ${sg.address.postcode}` : ""}
                                    </span>
                                </button>
                            ))}
                    </div>
                </div>
            )}
        </div>
    );
};
