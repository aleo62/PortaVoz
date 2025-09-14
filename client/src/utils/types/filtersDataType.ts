export type FiltersType = {
    search: string;
    vote: "asc" | "desc";
    date: "asc" | "desc";
    tags: string[];
    status: "ativo" | "oculto" | "resolvido";
}