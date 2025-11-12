export interface PostData {
    _id: string;
    user: {
        _id: string;
        username: string;
        image: string;
    }
    title: string;
    desc: string;
    images: string[] | File[];
    hashtags: HashtagData[];
    location: LocationData;
    address: string;
    upvotesCount: number;
    commentsCount: number;
    status: "ativo" | "resolvido" | "oculto";
    isUpvoted: boolean;
    createdAt: string;
}
export interface RequestPostData {
    title: string;
    desc: string;
    images: File[];
    hashtags: string[];
    location: LocationData;
    address: string;
}


interface LocationData {
    latitude: number;
    longitude: number;
}

interface HashtagData {
    _id: string;
    content: string;
}
