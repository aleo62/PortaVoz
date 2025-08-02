export type FiltersType = {
    vote: "asc" | "desc";
    date: "asc" | "desc";
    tags: string[];
    status: "ativo" | "oculto" | "resolvido";
}