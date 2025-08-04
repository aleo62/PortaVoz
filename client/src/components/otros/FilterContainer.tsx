import { IconChevronDown, IconFilter } from "@tabler/icons-react";
import { RefObject, useRef, useState } from "react";
import { FilterOverlay } from "./FilterOverlay";

export const FilterContainer = () => {
    const [filterOverlayOpen, setFilterOverlayOpen] = useState<boolean>(false);
    const ref = useRef<HTMLDivElement>(null);

    return (
        <>
            <div className="text-title font-title sticky top-0 h-fit w-full gap-5 rounded-lg bg-white shadow-[0px_4px_55px_-19px_rgba(0,_0,_0,_0.1)] md:max-w-[300px] dark:bg-zinc-900">
                <div className="relative flex h-fit w-full items-center justify-between p-4">
                    <div className="flex items-center justify-center gap-2">
                        <IconFilter className="size-5.5" />
                        <h2>Filtros</h2>
                    </div>

                    <div ref={ref}>
                        <IconChevronDown
                            onClick={() => setFilterOverlayOpen(!filterOverlayOpen)}
                            className="size-4"
                        />
                    </div>
                    <FilterOverlay
                        isContainerOpen={filterOverlayOpen}
                        onClose={() => setFilterOverlayOpen(false)}
                        toggleRef={ref as RefObject<HTMLDivElement>}
                        orientation="top"
                    />
                </div>
            </div>
        </>
    );
};
