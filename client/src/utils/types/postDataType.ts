export interface PostData {
    _id: string;
    userId: string;
    userName: string;
    userPhoto: string;
    title: string;
    desc: string;
    images: string[] | File[];
    tags: string[];
    location: LocationData;
    address: string;
    upvotesCount: number;
    commentsCount: number;
    status: "ativo" | "resolvido" | "oculto";
    severity: "pequena" | "média" | "urgente" | "super urgente";
    comments: string[];
    isUpvoted: boolean;
}

export interface LocationData {
    latitude: number;
    longitude: number;
}
